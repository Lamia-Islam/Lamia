// Global CMS State
let currentData = null;

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const tabPanes = document.querySelectorAll('.tab-pane');
const btnPublish = document.getElementById('btnPublish');
const btnQuickPublish = document.getElementById('btnQuickPublish');
const jsonFileInput = document.getElementById('jsonFileInput');
const jsonFileInputTop = document.getElementById('jsonFileInputTop');
const btnPickJson = document.getElementById('btnPickJson');
const btnPickJsonTop = document.getElementById('btnPickJsonTop');
const btnDownloadJson = document.getElementById('btnDownloadJson');
const filePickerStatus = document.getElementById('filePickerStatus');
const btnSaveRaw = document.getElementById('btnSaveRaw');
const btnFormatJson = document.getElementById('btnFormatJson');
const btnValidateJson = document.getElementById('btnValidateJson');
const rawJsonTextarea = document.getElementById('rawJsonTextarea');
const jsonValidationMsg = document.getElementById('jsonValidationMsg');
const overviewLastMod = document.getElementById('overviewLastMod');
const statusText = document.getElementById('statusText');
const toastContainer = document.getElementById('toastContainer');

// Toast Notification
function showToast(message, type = 'success', duration = 3500) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button style="background:none;border:none;color:inherit;cursor:pointer;opacity:0.6">&times;</button>
  `;
  toast.querySelector('button').onclick = () => toast.remove();
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// Tab navigation
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetTab = item.getAttribute('data-tab');
    navItems.forEach(n => n.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    item.classList.add('active');
    const pane = document.getElementById(targetTab);
    if (pane) pane.classList.add('active');

    // If switching to raw JSON tab, update textarea with current state
    if (targetTab === 'tab-raw') {
      collectFormData();
      rawJsonTextarea.value = JSON.stringify(currentData, null, 2);
    }
  });
});

// Fetch current data from server
async function loadPortfolioData() {
  try {
    statusText.textContent = 'Loading portfolio-data.json...';
    const res = await fetch('/api/portfolio');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    currentData = json.data;

    if (json.lastModified) {
      overviewLastMod.textContent = new Date(json.lastModified).toLocaleString();
    }
    statusText.textContent = 'Connected to portfolio-data.json';

    populateAllForms();
  } catch (err) {
    statusText.textContent = 'Error loading JSON';
    showToast('Failed to load portfolio-data.json: ' + err.message, 'error');
  }
}

// Populate all sections from currentData
function populateAllForms() {
  if (!currentData) return;

  // 1. Profile
  const p = currentData.profile || {};
  document.getElementById('prof_name').value = p.name || '';
  document.getElementById('prof_headline').value = p.headline || '';
  document.getElementById('prof_subline').value = p.subline || '';
  document.getElementById('prof_location').value = p.location || '';
  document.getElementById('prof_email').value = p.email || '';
  document.getElementById('prof_cvPath').value = p.cvPath || '';
  document.getElementById('prof_contactNote').value = p.contactNote || '';

  const s = p.socialLinks || {};
  document.getElementById('prof_scholar').value = s.scholar || '';
  document.getElementById('prof_github').value = s.github || '';
  document.getElementById('prof_linkedin').value = s.linkedin || '';
  document.getElementById('prof_orcid').value = s.orcid || '';

  // 2. About
  renderAbout();

  // 3. News
  renderNews();

  // 4. Featured Projects
  renderFeaturedProjects();

  // 5. Publications
  renderPublications();

  // 6. Experience & Education
  renderExpEduService();

  // Raw JSON
  rawJsonTextarea.value = JSON.stringify(currentData, null, 2);
}

// --- RENDER HELPERS ---

// About
function renderAbout() {
  const ab = currentData.about || {};
  document.getElementById('about_lede').value = ab.lede || '';

  const container = document.getElementById('aboutParagraphsContainer');
  container.innerHTML = '';
  const paras = ab.paragraphs || [];

  paras.forEach((para, idx) => {
    const row = document.createElement('div');
    row.className = 'item-card flex-between gap-3';
    row.innerHTML = `
      <div style="flex:1">
        <label class="text-xs text-muted mb-1 block">Paragraph #${idx + 1}</label>
        <textarea class="textarea about-para" rows="3">${para}</textarea>
      </div>
      <button type="button" class="btn btn-danger btn-sm btn-del-para" data-idx="${idx}" style="align-self:flex-start;margin-top:20px">&times;</button>
    `;
    container.appendChild(row);
  });

  container.querySelectorAll('.btn-del-para').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      currentData.about.paragraphs.splice(idx, 1);
      renderAbout();
    };
  });
}

document.getElementById('btnAddParagraph').onclick = () => {
  if (!currentData.about) currentData.about = {};
  if (!currentData.about.paragraphs) currentData.about.paragraphs = [];
  currentData.about.paragraphs.push('New paragraph description...');
  renderAbout();
};

// News
function renderNews() {
  const container = document.getElementById('newsContainer');
  container.innerHTML = '';
  const news = currentData.news || [];

  news.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header flex-between">
        <span class="item-card-title">News #${idx + 1} — ${item.date || 'New Entry'}</span>
        <button type="button" class="btn btn-danger btn-xs btn-del-news" data-idx="${idx}">Delete</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Display Date (e.g. Sep 2026)</label>
          <input type="text" class="input news-date" value="${item.date || ''}">
        </div>
        <div class="form-group">
          <label>HTML datetime (e.g. 2026-09)</label>
          <input type="text" class="input news-datetime" value="${item.datetime || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>News Text</label>
          <textarea class="textarea news-text" rows="2">${item.text || ''}</textarea>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  container.querySelectorAll('.btn-del-news').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      currentData.news.splice(idx, 1);
      renderNews();
    };
  });
}

document.getElementById('btnAddNewsItem').onclick = () => {
  if (!currentData.news) currentData.news = [];
  currentData.news.unshift({
    date: 'Oct 2026',
    datetime: '2026-10',
    text: 'New milestone or announcement...'
  });
  renderNews();
};

// Featured Projects
function renderFeaturedProjects() {
  const container = document.getElementById('featuredProjectsContainer');
  container.innerHTML = '';
  const projects = currentData.featuredProjects || [];

  projects.forEach((proj, idx) => {
    const div = document.createElement('div');
    div.className = 'item-card';
    
    // Render links string
    const linksArr = (proj.links || []).map(l => `${l.label}: ${l.url}`).join('\n');

    div.innerHTML = `
      <div class="item-card-header flex-between">
        <span class="item-card-title">Project ${proj.num || '0' + (idx + 1)}: ${proj.title || 'Untitled'}</span>
        <button type="button" class="btn btn-danger btn-xs btn-del-proj" data-idx="${idx}">Delete</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Index Number (e.g. 01, 02)</label>
          <input type="text" class="input proj-num" value="${proj.num || ''}">
        </div>
        <div class="form-group">
          <label>Slug (URL identifier)</label>
          <input type="text" class="input proj-slug" value="${proj.slug || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Project Title</label>
          <input type="text" class="input proj-title" value="${proj.title || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Subtitle / Thesis Note</label>
          <input type="text" class="input proj-sub" value="${proj.sub || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Body Description</label>
          <textarea class="textarea proj-body" rows="3">${proj.body || ''}</textarea>
        </div>
        <div class="form-group col-span-2">
          <label>Empirical Result (optional, highlighted)</label>
          <textarea class="textarea proj-result" rows="2">${proj.result || ''}</textarea>
        </div>
        <div class="form-group col-span-2">
          <label>Vector Schematic Caption</label>
          <input type="text" class="input proj-caption" value="${proj.figureCaption || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Publication Status Note</label>
          <input type="text" class="input proj-status" value="${proj.status || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Links (Format: "Label: URL", one per line)</label>
          <textarea class="textarea proj-links font-mono" rows="2">${linksArr}</textarea>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  container.querySelectorAll('.btn-del-proj').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      currentData.featuredProjects.splice(idx, 1);
      renderFeaturedProjects();
    };
  });
}

document.getElementById('btnAddProject').onclick = () => {
  if (!currentData.featuredProjects) currentData.featuredProjects = [];
  const nextNum = '0' + (currentData.featuredProjects.length + 1);
  currentData.featuredProjects.push({
    num: nextNum,
    slug: 'new-research-project',
    title: 'New Research Project',
    sub: '2026',
    body: 'Description of the research methodology and findings...',
    result: '',
    figureCaption: 'Schematic, not data.',
    status: '',
    links: [{ label: 'Code', url: 'https://github.com/Lamia-Islam' }]
  });
  renderFeaturedProjects();
};

// Publications
function renderPublications() {
  const pubs = currentData.publications || { underReview: [], published: [] };

  // Under Review
  const urContainer = document.getElementById('pubsUnderReviewContainer');
  urContainer.innerHTML = '';
  (pubs.underReview || []).forEach((pub, idx) => {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.dataset.id = pub.id || '';
    div.innerHTML = `
      <div class="item-card-header flex-between">
        <span class="item-card-title">Under Review #${idx + 1}</span>
        <button type="button" class="btn btn-danger btn-xs btn-del-ur" data-idx="${idx}">Delete</button>
      </div>
      <div class="form-grid">
        <div class="form-group col-span-2">
          <label>Authors</label>
          <input type="text" class="input ur-authors" value="${pub.authors || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Paper Title</label>
          <input type="text" class="input ur-title" value="${pub.title || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Target Journal / Venue</label>
          <input type="text" class="input ur-venue" value="${pub.venue || ''}">
        </div>
      </div>
    `;
    urContainer.appendChild(div);
  });

  urContainer.querySelectorAll('.btn-del-ur').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      currentData.publications.underReview.splice(idx, 1);
      renderPublications();
    };
  });

  // Published
  const pubContainer = document.getElementById('pubsPublishedContainer');
  pubContainer.innerHTML = '';
  (pubs.published || []).forEach((pub, idx) => {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.dataset.id = pub.id || '';
    div.innerHTML = `
      <div class="item-card-header flex-between">
        <span class="item-card-title">Published #${idx + 1}</span>
        <button type="button" class="btn btn-danger btn-xs btn-del-pub" data-idx="${idx}">Delete</button>
      </div>
      <div class="form-grid">
        <div class="form-group col-span-2">
          <label>Authors</label>
          <input type="text" class="input pub-authors" value="${pub.authors || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Paper Title</label>
          <input type="text" class="input pub-title" value="${pub.title || ''}">
        </div>
        <div class="form-group">
          <label>Conference / Venue</label>
          <input type="text" class="input pub-venue" value="${pub.venue || ''}">
        </div>
        <div class="form-group">
          <label>DOI URL</label>
          <input type="url" class="input pub-doi" value="${pub.doiUrl || ''}">
        </div>
      </div>
    `;
    pubContainer.appendChild(div);
  });

  pubContainer.querySelectorAll('.btn-del-pub').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      currentData.publications.published.splice(idx, 1);
      renderPublications();
    };
  });
}

document.getElementById('btnAddPub').onclick = () => {
  if (!currentData.publications) currentData.publications = { underReview: [], published: [] };
  if (!currentData.publications.published) currentData.publications.published = [];
  currentData.publications.published.push({
    authors: 'L. Islam, et al.',
    boldAuthor: 'L. Islam',
    title: 'New Publication Title',
    venue: 'IEEE Conference 2026',
    doiUrl: 'https://doi.org/'
  });
  renderPublications();
};

// Experience, Education & Service
function renderExpEduService() {
  // Experience
  const expContainer = document.getElementById('expContainer');
  expContainer.innerHTML = '';
  (currentData.experience || []).forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header flex-between">
        <span class="item-card-title">${item.role || 'Role'} @ ${item.org || 'Organization'}</span>
        <button type="button" class="btn btn-danger btn-xs btn-del-exp" data-idx="${idx}">Delete</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Role</label>
          <input type="text" class="input exp-role" value="${item.role || ''}">
        </div>
        <div class="form-group">
          <label>Organization</label>
          <input type="text" class="input exp-org" value="${item.org || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Period</label>
          <input type="text" class="input exp-period" value="${item.period || ''}">
        </div>
      </div>
    `;
    expContainer.appendChild(div);
  });

  expContainer.querySelectorAll('.btn-del-exp').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      currentData.experience.splice(idx, 1);
      renderExpEduService();
    };
  });

  // Education
  const eduContainer = document.getElementById('eduContainer');
  eduContainer.innerHTML = '';
  (currentData.education || []).forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header flex-between">
        <span class="item-card-title">${item.degree || 'Degree'}</span>
        <button type="button" class="btn btn-danger btn-xs btn-del-edu" data-idx="${idx}">Delete</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Degree</label>
          <input type="text" class="input edu-degree" value="${item.degree || ''}">
        </div>
        <div class="form-group">
          <label>Institution</label>
          <input type="text" class="input edu-inst" value="${item.institution || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Period</label>
          <input type="text" class="input edu-period" value="${item.period || ''}">
        </div>
      </div>
    `;
    eduContainer.appendChild(div);
  });

  eduContainer.querySelectorAll('.btn-del-edu').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      currentData.education.splice(idx, 1);
      renderExpEduService();
    };
  });

  // Service
  const srvContainer = document.getElementById('serviceContainer');
  srvContainer.innerHTML = '';
  (currentData.service || []).forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header flex-between">
        <span class="item-card-title">${item.role || 'Service'}</span>
        <button type="button" class="btn btn-danger btn-xs btn-del-srv" data-idx="${idx}">Delete</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Role</label>
          <input type="text" class="input srv-role" value="${item.role || ''}">
        </div>
        <div class="form-group">
          <label>Conferences / Venues</label>
          <input type="text" class="input srv-venue" value="${item.venue || ''}">
        </div>
      </div>
    `;
    srvContainer.appendChild(div);
  });

  srvContainer.querySelectorAll('.btn-del-srv').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      currentData.service.splice(idx, 1);
      renderExpEduService();
    };
  });
}

document.getElementById('btnAddExp').onclick = () => {
  if (!currentData.experience) currentData.experience = [];
  currentData.experience.push({ role: 'Research Role', org: 'Institution', period: '2026 - Present' });
  renderExpEduService();
};

document.getElementById('btnAddEdu').onclick = () => {
  if (!currentData.education) currentData.education = [];
  currentData.education.push({ degree: 'Degree Name', institution: 'University', period: '2026' });
  renderExpEduService();
};

document.getElementById('btnAddService').onclick = () => {
  if (!currentData.service) currentData.service = [];
  currentData.service.push({ role: 'Reviewer', venue: 'IEEE Conference' });
  renderExpEduService();
};

// --- DATA COLLECTION & SAVE ---

function collectFormData() {
  if (!currentData) currentData = {};

  // 1. Profile
  currentData.profile = {
    name: document.getElementById('prof_name').value.trim(),
    headline: document.getElementById('prof_headline').value.trim(),
    subline: document.getElementById('prof_subline').value.trim(),
    location: document.getElementById('prof_location').value.trim(),
    email: document.getElementById('prof_email').value.trim(),
    cvPath: document.getElementById('prof_cvPath').value.trim(),
    contactNote: document.getElementById('prof_contactNote').value.trim(),
    socialLinks: {
      email: `mailto:${document.getElementById('prof_email').value.trim()}`,
      scholar: document.getElementById('prof_scholar').value.trim(),
      github: document.getElementById('prof_github').value.trim(),
      linkedin: document.getElementById('prof_linkedin').value.trim(),
      orcid: document.getElementById('prof_orcid').value.trim(),
    }
  };

  // 2. About
  const paraEls = document.querySelectorAll('.about-para');
  currentData.about = {
    lede: document.getElementById('about_lede').value.trim(),
    paragraphs: Array.from(paraEls).map(el => el.value.trim()).filter(Boolean)
  };

  // 3. News
  const newsCards = document.querySelectorAll('#newsContainer .item-card');
  currentData.news = Array.from(newsCards).map(card => ({
    date: card.querySelector('.news-date').value.trim(),
    datetime: card.querySelector('.news-datetime').value.trim(),
    text: card.querySelector('.news-text').value.trim(),
  }));

  // 4. Featured Projects
  const fpCards = document.querySelectorAll('#featuredProjectsContainer .item-card');
  currentData.featuredProjects = Array.from(fpCards).map((card, idx) => {
    const orig = (currentData.featuredProjects && currentData.featuredProjects[idx]) || {};
    const linksRaw = card.querySelector('.proj-links').value.trim();
    const links = linksRaw.split('\n').filter(Boolean).map(line => {
      const parts = line.split(':');
      const label = parts[0].trim();
      const url = parts.slice(1).join(':').trim();
      return { label, url };
    });

    return {
      ...orig,
      num: card.querySelector('.proj-num').value.trim(),
      slug: card.querySelector('.proj-slug').value.trim(),
      title: card.querySelector('.proj-title').value.trim(),
      sub: card.querySelector('.proj-sub').value.trim(),
      body: card.querySelector('.proj-body').value.trim(),
      result: card.querySelector('.proj-result').value.trim(),
      figureCaption: card.querySelector('.proj-caption').value.trim(),
      status: card.querySelector('.proj-status').value.trim(),
      links
    };
  });

  // 5. Publications
  const urCards = document.querySelectorAll('#pubsUnderReviewContainer .item-card');
  const pubCards = document.querySelectorAll('#pubsPublishedContainer .item-card');

  currentData.publications = {
    underReview: Array.from(urCards).map((card, idx) => ({
      id: card.dataset.id || `pub-ur-${idx + 1}`,
      authors: card.querySelector('.ur-authors').value.trim(),
      boldAuthor: 'L. Islam',
      title: card.querySelector('.ur-title').value.trim(),
      venue: card.querySelector('.ur-venue').value.trim()
    })),
    published: Array.from(pubCards).map((card, idx) => {
      const doi = card.querySelector('.pub-doi').value.trim();
      return {
        id: card.dataset.id || `pub-${idx + 1}`,
        authors: card.querySelector('.pub-authors').value.trim(),
        boldAuthor: 'L. Islam',
        title: card.querySelector('.pub-title').value.trim(),
        venue: card.querySelector('.pub-venue').value.trim(),
        doiUrl: doi,
        doiDisplay: doi.replace(/^https?:\/\//, '')
      };
    })
  };

  // 6. Experience, Education & Service
  const expCards = document.querySelectorAll('#expContainer .item-card');
  currentData.experience = Array.from(expCards).map(card => ({
    role: card.querySelector('.exp-role').value.trim(),
    org: card.querySelector('.exp-org').value.trim(),
    period: card.querySelector('.exp-period').value.trim(),
  }));

  const eduCards = document.querySelectorAll('#eduContainer .item-card');
  currentData.education = Array.from(eduCards).map(card => ({
    degree: card.querySelector('.edu-degree').value.trim(),
    institution: card.querySelector('.edu-inst').value.trim(),
    period: card.querySelector('.edu-period').value.trim(),
  }));

  const srvCards = document.querySelectorAll('#serviceContainer .item-card');
  currentData.service = Array.from(srvCards).map(card => ({
    role: card.querySelector('.srv-role').value.trim(),
    venue: card.querySelector('.srv-venue').value.trim(),
  }));
}

// Save portfolio data to server
async function savePortfolioData() {
  try {
    collectFormData();
    statusText.textContent = 'Saving changes to portfolio-data.json...';

    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    const json = await res.json();
    if (json.lastModified) {
      overviewLastMod.textContent = new Date(json.lastModified).toLocaleString();
    }

    statusText.textContent = 'Changes saved successfully';
    showToast('Saved to portfolio-data.json successfully!');
  } catch (err) {
    statusText.textContent = 'Save failed';
    showToast('Error saving: ' + err.message, 'error');
  }
}

// Bind save buttons
btnPublish.onclick = savePortfolioData;
btnQuickPublish.onclick = savePortfolioData;

// Ctrl+S / Cmd+S shortcut
window.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    savePortfolioData();
  }
});

// JSON Import / Export
function handleJsonFile(file) {
  if (!file) return;
  filePickerStatus.textContent = `Reading ${file.name}...`;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const parsed = JSON.parse(e.target.result);
      currentData = parsed;
      populateAllForms();
      filePickerStatus.textContent = `Loaded ${file.name}`;
      showToast(`Loaded ${file.name}. Review and click Save Changes.`);
    } catch (err) {
      filePickerStatus.textContent = 'Error parsing JSON file';
      showToast('Invalid JSON file: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
}

btnPickJson.onclick = () => jsonFileInput.click();
btnPickJsonTop.onclick = () => jsonFileInputTop.click();
jsonFileInput.onchange = e => handleJsonFile(e.target.files[0]);
jsonFileInputTop.onchange = e => handleJsonFile(e.target.files[0]);

btnDownloadJson.onclick = () => {
  collectFormData();
  const blob = new Blob([JSON.stringify(currentData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Raw JSON Tab Actions
btnFormatJson.onclick = () => {
  try {
    const obj = JSON.parse(rawJsonTextarea.value);
    rawJsonTextarea.value = JSON.stringify(obj, null, 2);
    jsonValidationMsg.textContent = 'Valid JSON formatted';
    jsonValidationMsg.style.color = '#3fb950';
  } catch (err) {
    jsonValidationMsg.textContent = 'JSON Syntax Error: ' + err.message;
    jsonValidationMsg.style.color = '#f85149';
  }
};

btnValidateJson.onclick = () => {
  try {
    JSON.parse(rawJsonTextarea.value);
    jsonValidationMsg.textContent = 'JSON is valid!';
    jsonValidationMsg.style.color = '#3fb950';
  } catch (err) {
    jsonValidationMsg.textContent = 'JSON Syntax Error: ' + err.message;
    jsonValidationMsg.style.color = '#f85149';
  }
};

btnSaveRaw.onclick = async () => {
  try {
    const parsed = JSON.parse(rawJsonTextarea.value);
    currentData = parsed;
    await savePortfolioData();
    populateAllForms();
  } catch (err) {
    showToast('Cannot save invalid JSON: ' + err.message, 'error');
  }
};

// Initial load
loadPortfolioData();
