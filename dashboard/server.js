const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 4000;
const PROJECT_ROOT = process.env.PROJECT_ROOT ||
  (fs.existsSync(path.resolve(process.cwd(), 'src/data/portfolio-data.json'))
    ? process.cwd()
    : path.resolve(__dirname, '..'));
const JSON_PATH = process.env.JSON_PATH || path.resolve(PROJECT_ROOT, 'src/data/portfolio-data.json');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

// Embedded assets for standalone compiled binaries
let EMBEDDED_ASSETS = {};
try {
  EMBEDDED_ASSETS = require('./embedded-assets.js');
} catch (_) {}

// MIME types for static dashboard assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Helper to send JSON responses
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

// Helper to collect request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // Prevent payload flooding (> 10MB)
      if (body.length > 10 * 1024 * 1024) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON payload: ' + err.message));
      }
    });
    req.on('error', reject);
  });
}

// Helper to run shell commands in project root
function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    exec(cmd, { cwd: PROJECT_ROOT, env: process.env }, (error, stdout, stderr) => {
      const durationMs = Date.now() - startTime;
      if (error) {
        return resolve({
          success: false,
          code: error.code || 1,
          output: (stdout + '\n' + stderr).trim(),
          durationMs,
        });
      }
      resolve({
        success: true,
        code: 0,
        output: (stdout + '\n' + stderr).trim(),
        durationMs,
      });
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  // --- API ROUTES ---

  // GET /api/portfolio: Read portfolio JSON
  if (req.method === 'GET' && pathname === '/api/portfolio') {
    try {
      if (!fs.existsSync(JSON_PATH)) {
        return sendJson(res, 404, { error: 'portfolio-data.json not found' });
      }
      const raw = fs.readFileSync(JSON_PATH, 'utf-8');
      const data = JSON.parse(raw);
      const stat = fs.statSync(JSON_PATH);
      return sendJson(res, 200, {
        data,
        lastModified: stat.mtime.toISOString(),
      });
    } catch (err) {
      return sendJson(res, 500, { error: 'Failed to read JSON: ' + err.message });
    }
  }

  // POST /api/portfolio: Save portfolio JSON
  if (req.method === 'POST' && pathname === '/api/portfolio') {
    try {
      const payload = await parseBody(req);
      const dataToWrite = payload.data || payload;

      // Validate basic structure
      if (!dataToWrite || typeof dataToWrite !== 'object') {
        return sendJson(res, 400, { error: 'Payload must be a valid JSON object' });
      }

      // Format with 2 spaces for human readability
      const formattedJson = JSON.stringify(dataToWrite, null, 2) + '\n';
      fs.writeFileSync(JSON_PATH, formattedJson, 'utf-8');

      return sendJson(res, 200, {
        success: true,
        message: 'JSON file updated successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // POST /api/publish: Save JSON + Rebuild Static Site (Instant Live) + Optional Git Push
  if (req.method === 'POST' && pathname === '/api/publish') {
    try {
      const payload = await parseBody(req);
      const dataToWrite = payload.data || payload;
      const shouldGitPush = !!payload.gitPush;

      // 1. Save JSON
      if (dataToWrite && typeof dataToWrite === 'object' && Object.keys(dataToWrite).length > 0) {
        const formattedJson = JSON.stringify(dataToWrite, null, 2) + '\n';
        fs.writeFileSync(JSON_PATH, formattedJson, 'utf-8');
      }

      // 2. Trigger static site build (npm run build)
      const buildResult = await runCommand('npm run build');

      // 3. Optional Git Push
      let gitResult = null;
      if (shouldGitPush) {
        gitResult = await runCommand(
          'git add src/data/portfolio-data.json && git commit -m "Update portfolio data via dashboard" && git push'
        );
      }

      return sendJson(res, 200, {
        success: buildResult.success,
        message: buildResult.success
          ? 'Saved and rebuilt static site successfully. Site is now live with fresh data!'
          : 'Saved JSON, but static build failed. See logs.',
        buildOutput: buildResult.output,
        buildDurationMs: buildResult.durationMs,
        gitResult,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      return sendJson(res, 500, { error: 'Publish failed: ' + err.message });
    }
  }

  // POST /api/build: Only trigger static rebuild
  if (req.method === 'POST' && pathname === '/api/build') {
    const buildResult = await runCommand('npm run build');
    return sendJson(res, buildResult.success ? 200 : 500, buildResult);
  }

  // POST /api/git/push: Commit and push changes
  if (req.method === 'POST' && pathname === '/api/git/push') {
    const commitMsg = 'Update portfolio data via dashboard';
    const gitResult = await runCommand(
      `git add src/data/portfolio-data.json && git commit -m "${commitMsg}" && git push`
    );
    return sendJson(res, 200, gitResult);
  }

  // GET /api/status: Check system status
  if (req.method === 'GET' && pathname === '/api/status') {
    let lastModified = null;
    if (fs.existsSync(JSON_PATH)) {
      lastModified = fs.statSync(JSON_PATH).mtime.toISOString();
    }
    return sendJson(res, 200, {
      status: 'online',
      jsonPath: JSON_PATH,
      lastModified,
      liveUrl: 'http://localhost:3001',
    });
  }

  // --- STATIC FILE SERVING FOR DASHBOARD UI ---
  const route = pathname === '/' ? '/index.html' : pathname;
  const relPath = route.startsWith('/') ? route.slice(1) : route;
  let filePath = path.join(PUBLIC_DIR, relPath);

  // 1. If public directory files exist on disk, serve them (useful for dev)
  if (filePath.startsWith(PUBLIC_DIR)) {
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  // 2. Serve from embedded assets (works seamlessly in standalone compiled binaries!)
  if (EMBEDDED_ASSETS[route]) {
    res.writeHead(200, { 'Content-Type': EMBEDDED_ASSETS[route].contentType });
    res.end(Buffer.from(EMBEDDED_ASSETS[route].content, 'base64'));
    return;
  }

  // 3. Fallback to index.html for SPA behavior
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(indexPath).pipe(res);
  } else if (EMBEDDED_ASSETS['/index.html']) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(Buffer.from(EMBEDDED_ASSETS['/index.html'].content, 'base64'));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Portfolio Management Dashboard Server is running!`);
  console.log(`Dashboard URL:   http://localhost:${PORT}`);
  console.log(`Live Site URL:   http://localhost:3001`);
  console.log(`Target JSON:     ${JSON_PATH}`);
  console.log(`======================================================\n`);
});
