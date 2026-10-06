const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, 'public');
const files = {
  '/index.html': { file: 'index.html', mime: 'text/html; charset=utf-8' },
  '/style.css': { file: 'style.css', mime: 'text/css; charset=utf-8' },
  '/app.js': { file: 'app.js', mime: 'application/javascript; charset=utf-8' },
};

const assets = {};
for (const [route, info] of Object.entries(files)) {
  const fullPath = path.join(publicDir, info.file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath);
    assets[route] = {
      contentType: info.mime,
      content: content.toString('base64'),
    };
  }
}

const outContent = `// Auto-generated embedded assets
module.exports = ${JSON.stringify(assets, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'embedded-assets.js'), outContent, 'utf-8');
console.log('Embedded assets generated: index.html, style.css, app.js');
