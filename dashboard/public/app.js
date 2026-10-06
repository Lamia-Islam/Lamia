// Global state
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
const buildOutput = document.getElementById('buildOutput');
const buildTimeTag = document.getElementById('buildTimeTag');
const overviewLastMod = document.getElementById('overviewLastMod');
const statusText = document.getElementById('statusText');
const toastContainer = document.getElementById('toastContainer');

// Show toast notification
function showToast(message, type = 'success', duration = 4000) {
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

// Separate Add Form View Helpers
const ALL_SECTIONS = ['about', 'research', 'featured', 'smaller', 'pubs', 'exp', 'edu', 'skills', 'service', 'honors'];

function showAddForm(section) {
  const listView = document.getElementById(`${section}ListView`);
  const addView = document.getElementById(`${section}AddView`);
  if (listView) listView.style.display = 'none';
  if (addView) {
    addView.style.display = 'block';
    // Clear inputs inside add view
    addView.querySelectorAll('input:not([type=button]), textarea').forEach(i => i.value = '');
    // Focus first input
    const firstInput = addView.querySelector('input, textarea, select');
    if (firstInput) setTimeout(() => firstInput.focus(), 50);
  }
}

function hideAddForm(section) {
  const listView = document.getElementById(`${section}ListView`);
  const addView = document.getElementById(`${section}AddView`);
  if (addView) addView.style.display = 'none';
  if (listView) listView.style.display = 'block';
}

function closeAllAddForms() {
  ALL_SECTIONS.forEach(sec => hideAddForm(sec));
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

    // Return to list view whenever switching tabs
    closeAllAddForms();

    // If switching to raw JSON tab, update textarea with current form state
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

  // 1. Hero & Profile
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
  document.getElementById('prof_researchgate').value = s.researchgate || '';
  document.getElementById('prof_orcid').value = s.orcid || '';

  // 2. Stats
  renderStats();

  // 3. About
  renderAbout();

  // 4. Research Interests
  renderResearchInterests();

  // 5. Featured Projects
  renderFeaturedProjects();

  // 6. Smaller Projects
  renderSmallerProjects();

  // 7. Publications
  renderPublications();

  // 8. Experience
  renderExperience();

  // 9. Education
  renderEducation();

  // 10. Skills
  renderSkills();

  // 11. Academic Service
  renderService();

  // 12. Honors
  renderHonors();

  // Raw JSON
  rawJsonTextarea.value = JSON.stringify(currentData, null, 2);
}

// RENDER HELPERS

function renderStats() {
  const container = document.getElementById('statsContainer');
  container.innerHTML = '';
  const stats = currentData.stats || [];

  stats.forEach((st, idx) => {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">Stat #${idx + 1}</span>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Big Metric Value (e.g. 4, 0.966)</label>
          <input type="text" class="input stat-val" value="${st.value || ''}">
        </div>
        <div class="form-group">
          <label>Label</label>
          <input type="text" class="input stat-lbl" value="${st.label || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Highlight Sub-label</label>
          <input type="text" class="input stat-hl" value="${st.highlight || ''}">
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function renderAbout() {
  const ab = currentData.about || {};
  document.getElementById('about_openingQuestion').value = ab.openingQuestion || '';

  const container = document.getElementById('aboutParagraphsContainer');
  container.innerHTML = '';
  (ab.paragraphs || []).forEach((p, idx) => {
    const wrap = document.createElement('div');
    wrap.className = 'flex gap-2';
    wrap.innerHTML = `
      <textarea class="textarea about-para flex-1" rows="3">${p}</textarea>
      <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">Delete</button>
    `;
    container.appendChild(wrap);
  });
}

function renderResearchInterests() {
  const container = document.getElementById('researchInterestsContainer');
  container.innerHTML = '';
  const list = currentData.researchInterests || [];

  list.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card research-item';
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">Research Focus #${idx + 1}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.research-item').remove()">Remove</button>
      </div>
      <div class="space-y-3">
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="input res-title" value="${item.title || ''}">
        </div>
        <div class="form-group">
          <label>Summary</label>
          <textarea class="textarea res-sum" rows="2">${item.summary || ''}</textarea>
        </div>
        <div class="form-group">
          <label>Tags (comma-separated)</label>
          <input type="text" class="input res-tags" value="${(item.tags || []).join(', ')}">
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderFeaturedProjects() {
  const container = document.getElementById('featuredProjectsContainer');
  container.innerHTML = '';
  const list = currentData.featuredProjects || [];

  list.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card featured-proj-item';
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">Project #${idx + 1}: ${item.title}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.featured-proj-item').remove()">Remove</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Slug (URL identifier)</label>
          <input type="text" class="input fp-slug" value="${item.slug || ''}">
        </div>
        <div class="form-group">
          <label>Year</label>
          <input type="text" class="input fp-year" value="${item.year || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Full Title</label>
          <input type="text" class="input fp-title" value="${item.title || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>One-Line Summary</label>
          <textarea class="textarea fp-summary" rows="2">${item.summary || ''}</textarea>
        </div>
        <div class="form-group col-span-2">
          <label>Problem Statement</label>
          <textarea class="textarea fp-problem" rows="3">${item.problem || ''}</textarea>
        </div>
        <div class="form-group col-span-2">
          <label>What I Built (One item per line)</label>
          <textarea class="textarea fp-whatBuilt" rows="4">${(item.whatBuilt || []).join('\n')}</textarea>
        </div>
        <div class="form-group col-span-2">
          <label>Key Results (One item per line)</label>
          <textarea class="textarea fp-keyResults" rows="3">${(item.keyResults || []).join('\n')}</textarea>
        </div>
        <div class="form-group col-span-2">
          <label>Tech Tags (comma-separated)</label>
          <input type="text" class="input fp-techTags" value="${(item.techTags || []).join(', ')}">
        </div>
        <div class="form-group col-span-2">
          <label>Figure Caption</label>
          <input type="text" class="input fp-caption" value="${item.figureCaption || ''}">
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderSmallerProjects() {
  const container = document.getElementById('smallerProjectsContainer');
  container.innerHTML = '';
  const list = currentData.smallerProjects || [];

  list.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card smaller-proj-item';
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">${item.title || 'Project'}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.smaller-proj-item').remove()">Remove</button>
      </div>
      <div class="space-y-3">
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="input sp-title" value="${item.title || ''}">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="textarea sp-desc" rows="2">${item.description || ''}</textarea>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label>Publication Venue (Optional)</label>
            <input type="text" class="input sp-pub" value="${item.publication || ''}">
          </div>
          <div class="form-group">
            <label>DOI Link (Optional)</label>
            <input type="url" class="input sp-doi" value="${item.doi || ''}">
          </div>
        </div>
        <div class="form-group">
          <label>Tags (comma-separated)</label>
          <input type="text" class="input sp-tags" value="${(item.tags || []).join(', ')}">
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderPublications() {
  const container = document.getElementById('publicationsContainer');
  container.innerHTML = '';
  const list = currentData.publications || [];

  list.forEach((pub, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card pub-item';
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">#${idx + 1} &bull; ${pub.category}: ${pub.title.substring(0, 50)}...</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.pub-item').remove()">Remove</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Category</label>
          <select class="select pub-cat">
            <option value="Journal" ${pub.category === 'Journal' ? 'selected' : ''}>Journal (Under Review)</option>
            <option value="Conference" ${pub.category === 'Conference' ? 'selected' : ''}>Conference Paper</option>
            <option value="Submitted" ${pub.category === 'Submitted' ? 'selected' : ''}>Submitted</option>
            <option value="Preprint" ${pub.category === 'Preprint' ? 'selected' : ''}>Preprint</option>
            <option value="Presentation" ${pub.category === 'Presentation' ? 'selected' : ''}>Presentation</option>
          </select>
        </div>
        <div class="form-group">
          <label>Date or Year</label>
          <input type="text" class="input pub-date" value="${pub.dateOrYear || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Paper Title</label>
          <input type="text" class="input pub-title" value="${pub.title || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Authors (Lamia Islam / Islam, L. will be bolded)</label>
          <input type="text" class="input pub-authors" value="${pub.authors || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Venue (Journal name / Conference)</label>
          <input type="text" class="input pub-venue" value="${pub.venue || ''}">
        </div>
        <div class="form-group">
          <label>DOI (e.g. 10.1109/...) Optional</label>
          <input type="text" class="input pub-doi" value="${pub.doi || ''}">
        </div>
        <div class="form-group">
          <label>Article URL (Optional)</label>
          <input type="url" class="input pub-url" value="${pub.url || ''}">
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderExperience() {
  const container = document.getElementById('experienceContainer');
  container.innerHTML = '';
  const list = currentData.experience || [];

  list.forEach((exp, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card exp-item';
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">${exp.title} &bull; ${exp.organization}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.exp-item').remove()">Remove</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Role Title</label>
          <input type="text" class="input exp-title" value="${exp.title || ''}">
        </div>
        <div class="form-group">
          <label>Period</label>
          <input type="text" class="input exp-period" value="${exp.period || ''}">
        </div>
        <div class="form-group">
          <label>Organization</label>
          <input type="text" class="input exp-org" value="${exp.organization || ''}">
        </div>
        <div class="form-group">
          <label>Location</label>
          <input type="text" class="input exp-loc" value="${exp.location || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Supervisor / Mentor (Optional)</label>
          <input type="text" class="input exp-sup" value="${exp.supervisorOrMentor || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Bullets (One bullet per line)</label>
          <textarea class="textarea exp-bullets" rows="3">${(exp.bullets || []).join('\n')}</textarea>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderEducation() {
  const container = document.getElementById('educationContainer');
  container.innerHTML = '';
  const list = currentData.education || [];

  list.forEach((edu, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card edu-item';
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">${edu.degree}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.edu-item').remove()">Remove</button>
      </div>
      <div class="form-grid">
        <div class="form-group col-span-2">
          <label>Degree</label>
          <input type="text" class="input edu-deg" value="${edu.degree || ''}">
        </div>
        <div class="form-group">
          <label>Institution</label>
          <input type="text" class="input edu-inst" value="${edu.institution || ''}">
        </div>
        <div class="form-group">
          <label>Period / Session</label>
          <input type="text" class="input edu-per" value="${edu.period || ''}">
        </div>
        <div class="form-group">
          <label>Grade / CGPA</label>
          <input type="text" class="input edu-grd" value="${edu.grade || ''}">
        </div>
        <div class="form-group">
          <label>Details</label>
          <input type="text" class="input edu-det" value="${edu.details || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Thesis Note (Optional)</label>
          <textarea class="textarea edu-the" rows="2">${edu.thesis || ''}</textarea>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderSkills() {
  const container = document.getElementById('skillsContainer');
  container.innerHTML = '';
  const list = currentData.skills || [];

  list.forEach((sk, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card skill-item';
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">Group: ${sk.category}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.skill-item').remove()">Remove</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Category Name</label>
          <input type="text" class="input sk-cat" value="${sk.category || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Skills (comma-separated chips)</label>
          <input type="text" class="input sk-list" value="${(sk.skills || []).join(', ')}">
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderService() {
  const container = document.getElementById('serviceContainer');
  container.innerHTML = '';
  const list = currentData.academicService || [];

  list.forEach((srv, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card srv-item';
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">${srv.role} &bull; ${srv.organization}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.srv-item').remove()">Remove</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Role</label>
          <input type="text" class="input srv-role" value="${srv.role || ''}">
        </div>
        <div class="form-group">
          <label>Organization</label>
          <input type="text" class="input srv-org" value="${srv.organization || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Description</label>
          <textarea class="textarea srv-desc" rows="2">${srv.description || ''}</textarea>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderHonors() {
  const container = document.getElementById('honorsContainer');
  container.innerHTML = '';
  const list = currentData.honorsAndCertifications || [];

  list.forEach((hon, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card hon-item';
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">${hon.title}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.hon-item').remove()">Remove</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="input hon-title" value="${hon.title || ''}">
        </div>
        <div class="form-group">
          <label>Issuer</label>
          <input type="text" class="input hon-iss" value="${hon.issuer || ''}">
        </div>
        <div class="form-group col-span-2">
          <label>Description</label>
          <textarea class="textarea hon-desc" rows="2">${hon.description || ''}</textarea>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// COLLECT FORM DATA INTO currentData
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
      researchgate: document.getElementById('prof_researchgate').value.trim(),
      orcid: document.getElementById('prof_orcid').value.trim(),
    }
  };

  // 2. Stats
  const statCards = document.querySelectorAll('#statsContainer .item-card');
  currentData.stats = Array.from(statCards).map(card => ({
    value: card.querySelector('.stat-val').value.trim(),
    label: card.querySelector('.stat-lbl').value.trim(),
    highlight: card.querySelector('.stat-hl').value.trim(),
  }));

  // 3. About
  const paraEls = document.querySelectorAll('.about-para');
  currentData.about = {
    openingQuestion: document.getElementById('about_openingQuestion').value.trim(),
    paragraphs: Array.from(paraEls).map(el => el.value.trim()).filter(Boolean)
  };

  // 4. Research Interests
  const resCards = document.querySelectorAll('.research-item');
  currentData.researchInterests = Array.from(resCards).map(card => ({
    title: card.querySelector('.res-title').value.trim(),
    summary: card.querySelector('.res-sum').value.trim(),
    tags: card.querySelector('.res-tags').value.split(',').map(s => s.trim()).filter(Boolean)
  }));

  // 5. Featured Projects
  const fpCards = document.querySelectorAll('.featured-proj-item');
  currentData.featuredProjects = Array.from(fpCards).map((card, idx) => {
    const existing = (currentData.featuredProjects && currentData.featuredProjects[idx]) || {};
    return {
      ...existing,
      slug: card.querySelector('.fp-slug').value.trim(),
      year: card.querySelector('.fp-year').value.trim(),
      title: card.querySelector('.fp-title').value.trim(),
      shortTitle: existing.shortTitle || card.querySelector('.fp-title').value.trim(),
      summary: card.querySelector('.fp-summary').value.trim(),
      problem: card.querySelector('.fp-problem').value.trim(),
      whatBuilt: card.querySelector('.fp-whatBuilt').value.split('\n').map(s => s.trim()).filter(Boolean),
      keyResults: card.querySelector('.fp-keyResults').value.split('\n').map(s => s.trim()).filter(Boolean),
      techTags: card.querySelector('.fp-techTags').value.split(',').map(s => s.trim()).filter(Boolean),
      figureCaption: card.querySelector('.fp-caption').value.trim(),
      links: existing.links || [],
      thesisDetails: existing.thesisDetails,
      papers: existing.papers,
    };
  });

  // 6. Smaller Projects
  const spCards = document.querySelectorAll('.smaller-proj-item');
  currentData.smallerProjects = Array.from(spCards).map(card => {
    const pub = card.querySelector('.sp-pub').value.trim();
    const doi = card.querySelector('.sp-doi').value.trim();
    const item = {
      title: card.querySelector('.sp-title').value.trim(),
      description: card.querySelector('.sp-desc').value.trim(),
      tags: card.querySelector('.sp-tags').value.split(',').map(s => s.trim()).filter(Boolean),
    };
    if (pub) item.publication = pub;
    if (doi) item.doi = doi;
    return item;
  });

  // 7. Publications
  const pubCards = document.querySelectorAll('.pub-item');
  currentData.publications = Array.from(pubCards).map((card, idx) => {
    const doi = card.querySelector('.pub-doi').value.trim();
    const url = card.querySelector('.pub-url').value.trim();
    const item = {
      id: `pub-${idx + 1}`,
      category: card.querySelector('.pub-cat').value,
      dateOrYear: card.querySelector('.pub-date').value.trim(),
      title: card.querySelector('.pub-title').value.trim(),
      authors: card.querySelector('.pub-authors').value.trim(),
      venue: card.querySelector('.pub-venue').value.trim(),
    };
    if (doi) item.doi = doi;
    if (url) item.url = url;
    return item;
  });

  // 8. Experience
  const expCards = document.querySelectorAll('.exp-item');
  currentData.experience = Array.from(expCards).map(card => {
    const sup = card.querySelector('.exp-sup').value.trim();
    const item = {
      title: card.querySelector('.exp-title').value.trim(),
      period: card.querySelector('.exp-period').value.trim(),
      organization: card.querySelector('.exp-org').value.trim(),
      location: card.querySelector('.exp-loc').value.trim(),
      bullets: card.querySelector('.exp-bullets').value.split('\n').map(s => s.trim()).filter(Boolean),
    };
    if (sup) item.supervisorOrMentor = sup;
    return item;
  });

  // 9. Education
  const eduCards = document.querySelectorAll('.edu-item');
  currentData.education = Array.from(eduCards).map(card => {
    const the = card.querySelector('.edu-the') ? card.querySelector('.edu-the').value.trim() : '';
    const det = card.querySelector('.edu-det').value.trim();
    const item = {
      degree: card.querySelector('.edu-deg').value.trim(),
      institution: card.querySelector('.edu-inst').value.trim(),
      period: card.querySelector('.edu-per').value.trim(),
      grade: card.querySelector('.edu-grd').value.trim(),
    };
    if (det) item.details = det;
    if (the) item.thesis = the;
    return item;
  });

  // 10. Skills
  const skCards = document.querySelectorAll('.skill-item');
  currentData.skills = Array.from(skCards).map(card => ({
    category: card.querySelector('.sk-cat').value.trim(),
    skills: card.querySelector('.sk-list').value.split(',').map(s => s.trim()).filter(Boolean),
  }));

  // 11. Academic Service
  const srvCards = document.querySelectorAll('.srv-item');
  currentData.academicService = Array.from(srvCards).map(card => ({
    role: card.querySelector('.srv-role').value.trim(),
    organization: card.querySelector('.srv-org').value.trim(),
    description: card.querySelector('.srv-desc').value.trim(),
  }));

  // 12. Honors
  const honCards = document.querySelectorAll('.hon-item');
  currentData.honorsAndCertifications = Array.from(honCards).map(card => ({
    title: card.querySelector('.hon-title').value.trim(),
    issuer: card.querySelector('.hon-iss').value.trim(),
    description: card.querySelector('.hon-desc').value.trim(),
  }));
}

// WIRE UP ALL SEPARATE ADD BUTTONS & SAVE ACTIONS

// 1. About Me Paragraph
if (document.getElementById('btnAddParagraph')) {
  document.getElementById('btnAddParagraph').onclick = () => showAddForm('about');
}
if (document.getElementById('btnSaveNewParagraph')) {
  document.getElementById('btnSaveNewParagraph').onclick = () => {
    const text = document.getElementById('new_about_text').value.trim();
    if (!text) {
      showToast('Paragraph text cannot be blank', 'error');
      return;
    }
    if (!currentData.about) currentData.about = { paragraphs: [] };
    if (!currentData.about.paragraphs) currentData.about.paragraphs = [];
    currentData.about.paragraphs.push(text);
    renderAbout();
    hideAddForm('about');
    savePortfolioData('✓ Added new bio paragraph and saved to portfolio-data.json!');
  };
}

// 2. Research Interests
if (document.getElementById('btnAddInterest')) {
  document.getElementById('btnAddInterest').onclick = () => showAddForm('research');
}
if (document.getElementById('btnSaveNewResearch')) {
  document.getElementById('btnSaveNewResearch').onclick = () => {
    const title = document.getElementById('new_res_title').value.trim();
    const summary = document.getElementById('new_res_summary').value.trim();
    const tags = document.getElementById('new_res_tags').value.split(',').map(s => s.trim()).filter(Boolean);
    if (!title) {
      showToast('Focus area title is required', 'error');
      return;
    }
    if (!summary) {
      showToast('Summary description is required', 'error');
      return;
    }
    if (!currentData.researchInterests) currentData.researchInterests = [];
    currentData.researchInterests.push({ title, summary, tags });
    renderResearchInterests();
    hideAddForm('research');
    savePortfolioData('✓ Added new research focus area and saved to portfolio-data.json!');
  };
}

// 3. Featured Projects
if (document.getElementById('btnAddFeaturedProject')) {
  document.getElementById('btnAddFeaturedProject').onclick = () => showAddForm('featured');
}
if (document.getElementById('btnSaveNewFeaturedProject')) {
  document.getElementById('btnSaveNewFeaturedProject').onclick = () => {
    const slug = document.getElementById('new_fp_slug').value.trim();
    const title = document.getElementById('new_fp_title').value.trim();
    const summary = document.getElementById('new_fp_summary').value.trim();
    if (!title) {
      showToast('Project title is required', 'error');
      return;
    }
    if (!slug) {
      showToast('Project slug is required for URL navigation', 'error');
      return;
    }
    if (!summary) {
      showToast('One-line summary is required', 'error');
      return;
    }
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const newProject = {
      slug: cleanSlug,
      year: document.getElementById('new_fp_year').value.trim() || '2026',
      title,
      shortTitle: document.getElementById('new_fp_shortTitle').value.trim() || title,
      summary,
      problem: document.getElementById('new_fp_problem').value.trim(),
      whatBuilt: document.getElementById('new_fp_whatBuilt').value.split('\n').map(s => s.trim()).filter(Boolean),
      keyResults: document.getElementById('new_fp_keyResults').value.split('\n').map(s => s.trim()).filter(Boolean),
      techTags: document.getElementById('new_fp_techTags').value.split(',').map(s => s.trim()).filter(Boolean),
      figureCaption: document.getElementById('new_fp_caption').value.trim(),
      links: [],
    };
    if (!currentData.featuredProjects) currentData.featuredProjects = [];
    currentData.featuredProjects.push(newProject);
    renderFeaturedProjects();
    hideAddForm('featured');
    savePortfolioData('✓ Added new featured project and saved to portfolio-data.json!');
  };
}

// 4. More Projects & Prototypes
if (document.getElementById('btnAddSmallerProject')) {
  document.getElementById('btnAddSmallerProject').onclick = () => showAddForm('smaller');
}
if (document.getElementById('btnSaveNewSmallerProject')) {
  document.getElementById('btnSaveNewSmallerProject').onclick = () => {
    const title = document.getElementById('new_sp_title').value.trim();
    const description = document.getElementById('new_sp_desc').value.trim();
    if (!title) {
      showToast('Project title is required', 'error');
      return;
    }
    if (!description) {
      showToast('Description is required', 'error');
      return;
    }
    const pub = document.getElementById('new_sp_pub').value.trim();
    const doi = document.getElementById('new_sp_doi').value.trim();
    const tags = document.getElementById('new_sp_tags').value.split(',').map(s => s.trim()).filter(Boolean);
    const item = { title, description, tags };
    if (pub) item.publication = pub;
    if (doi) item.doi = doi;

    if (!currentData.smallerProjects) currentData.smallerProjects = [];
    currentData.smallerProjects.push(item);
    renderSmallerProjects();
    hideAddForm('smaller');
    savePortfolioData('✓ Added new prototype project and saved to portfolio-data.json!');
  };
}

// 5. Publications
if (document.getElementById('btnAddPublication')) {
  document.getElementById('btnAddPublication').onclick = () => showAddForm('pubs');
}
if (document.getElementById('btnSaveNewPublication')) {
  document.getElementById('btnSaveNewPublication').onclick = () => {
    const title = document.getElementById('new_pub_title').value.trim();
    if (!title) {
      showToast('Paper title is required', 'error');
      return;
    }
    const pub = {
      category: document.getElementById('new_pub_category').value,
      dateOrYear: document.getElementById('new_pub_dateOrYear').value.trim(),
      title,
      authors: document.getElementById('new_pub_authors').value.trim(),
      venue: document.getElementById('new_pub_venue').value.trim(),
    };
    const doi = document.getElementById('new_pub_doi').value.trim();
    const url = document.getElementById('new_pub_url').value.trim();
    if (doi) pub.doi = doi;
    if (url) pub.url = url;

    if (!currentData.publications) currentData.publications = [];
    currentData.publications.unshift(pub); // Newest publication at top
    renderPublications();
    hideAddForm('pubs');
    savePortfolioData('✓ Added new publication and saved to portfolio-data.json!');
  };
}

// 6. Experience
if (document.getElementById('btnAddExperience')) {
  document.getElementById('btnAddExperience').onclick = () => showAddForm('exp');
}
if (document.getElementById('btnSaveNewExperience')) {
  document.getElementById('btnSaveNewExperience').onclick = () => {
    const title = document.getElementById('new_exp_title').value.trim();
    const organization = document.getElementById('new_exp_org').value.trim();
    if (!title) {
      showToast('Role title is required', 'error');
      return;
    }
    if (!organization) {
      showToast('Organization is required', 'error');
      return;
    }
    const sup = document.getElementById('new_exp_sup').value.trim();
    const item = {
      title,
      organization,
      period: document.getElementById('new_exp_period').value.trim(),
      location: document.getElementById('new_exp_loc').value.trim(),
      bullets: document.getElementById('new_exp_bullets').value.split('\n').map(s => s.trim()).filter(Boolean),
    };
    if (sup) item.supervisorOrMentor = sup;

    if (!currentData.experience) currentData.experience = [];
    currentData.experience.unshift(item); // Most recent role at top
    renderExperience();
    hideAddForm('exp');
    savePortfolioData('✓ Added new experience role and saved to portfolio-data.json!');
  };
}

// 7. Education
if (document.getElementById('btnAddEducation')) {
  document.getElementById('btnAddEducation').onclick = () => showAddForm('edu');
}
if (document.getElementById('btnSaveNewEducation')) {
  document.getElementById('btnSaveNewEducation').onclick = () => {
    const degree = document.getElementById('new_edu_deg').value.trim();
    const institution = document.getElementById('new_edu_inst').value.trim();
    if (!degree) {
      showToast('Degree title is required', 'error');
      return;
    }
    if (!institution) {
      showToast('Institution is required', 'error');
      return;
    }
    const det = document.getElementById('new_edu_det').value.trim();
    const the = document.getElementById('new_edu_the').value.trim();
    const item = {
      degree,
      institution,
      period: document.getElementById('new_edu_per').value.trim(),
      grade: document.getElementById('new_edu_grd').value.trim(),
    };
    if (det) item.details = det;
    if (the) item.thesis = the;

    if (!currentData.education) currentData.education = [];
    currentData.education.push(item);
    renderEducation();
    hideAddForm('edu');
    savePortfolioData('✓ Added new degree and saved to portfolio-data.json!');
  };
}

// 8. Skills
if (document.getElementById('btnAddSkillGroup')) {
  document.getElementById('btnAddSkillGroup').onclick = () => showAddForm('skills');
}
if (document.getElementById('btnSaveNewSkillGroup')) {
  document.getElementById('btnSaveNewSkillGroup').onclick = () => {
    const category = document.getElementById('new_sk_cat').value.trim();
    const skills = document.getElementById('new_sk_list').value.split(',').map(s => s.trim()).filter(Boolean);
    if (!category) {
      showToast('Skill category name is required', 'error');
      return;
    }
    if (skills.length === 0) {
      showToast('At least one skill is required', 'error');
      return;
    }

    if (!currentData.skills) currentData.skills = [];
    currentData.skills.push({ category, skills });
    renderSkills();
    hideAddForm('skills');
    savePortfolioData('✓ Added new skill category and saved to portfolio-data.json!');
  };
}

// 9. Academic Service
if (document.getElementById('btnAddService')) {
  document.getElementById('btnAddService').onclick = () => showAddForm('service');
}
if (document.getElementById('btnSaveNewService')) {
  document.getElementById('btnSaveNewService').onclick = () => {
    const role = document.getElementById('new_srv_role').value.trim();
    const organization = document.getElementById('new_srv_org').value.trim();
    if (!role) {
      showToast('Service role is required', 'error');
      return;
    }
    if (!organization) {
      showToast('Organization is required', 'error');
      return;
    }
    const item = {
      role,
      organization,
      description: document.getElementById('new_srv_desc').value.trim(),
    };

    if (!currentData.academicService) currentData.academicService = [];
    currentData.academicService.unshift(item);
    renderService();
    hideAddForm('service');
    savePortfolioData('✓ Added new academic service item and saved to portfolio-data.json!');
  };
}

// 10. Honors & Certifications
if (document.getElementById('btnAddHonor')) {
  document.getElementById('btnAddHonor').onclick = () => showAddForm('honors');
}
if (document.getElementById('btnSaveNewHonor')) {
  document.getElementById('btnSaveNewHonor').onclick = () => {
    const title = document.getElementById('new_hon_title').value.trim();
    const issuer = document.getElementById('new_hon_iss').value.trim();
    if (!title) {
      showToast('Honor or award title is required', 'error');
      return;
    }
    if (!issuer) {
      showToast('Issuer is required', 'error');
      return;
    }
    const item = {
      title,
      issuer,
      description: document.getElementById('new_hon_desc').value.trim(),
    };

    if (!currentData.honorsAndCertifications) currentData.honorsAndCertifications = [];
    currentData.honorsAndCertifications.unshift(item);
    renderHonors();
    hideAddForm('honors');
    savePortfolioData('✓ Added new honor/certification and saved to portfolio-data.json!');
  };
}

// Back and Cancel Buttons for all Add Views
document.querySelectorAll('.btn-back-to-list, .btn-cancel-add').forEach(btn => {
  btn.onclick = () => {
    const sec = btn.getAttribute('data-section');
    if (sec) hideAddForm(sec);
  };
});

// SAVE TO JSON ACTION (Direct save to src/data/portfolio-data.json without rebuilding)
async function savePortfolioData(successMessage = '✓ Changes saved to portfolio-data.json!') {
  // If active tab is raw JSON, parse from textarea first
  const activeTab = document.querySelector('.tab-pane.active');
  if (activeTab && activeTab.id === 'tab-raw') {
    try {
      currentData = JSON.parse(rawJsonTextarea.value);
    } catch (e) {
      showToast('Cannot save: JSON syntax is invalid: ' + e.message, 'error');
      return false;
    }
  } else {
    collectFormData();
  }

  if (btnPublish) {
    btnPublish.disabled = true;
    btnPublish.innerHTML = `<span>Saving changes...</span>`;
  }

  try {
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: currentData }),
    });

    const result = await res.json();
    if (btnPublish) {
      btnPublish.disabled = false;
      btnPublish.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>Save Changes</span>
        <kbd class="shortcut-key">Ctrl+S</kbd>
      `;
    }

    if (result.success) {
      showToast(successMessage, 'success');
      if (overviewLastMod) {
        overviewLastMod.textContent = new Date(result.timestamp || Date.now()).toLocaleString();
      }
      return true;
    } else {
      showToast('Failed to save JSON: ' + (result.error || 'Unknown error'), 'error');
      return false;
    }
  } catch (err) {
    if (btnPublish) {
      btnPublish.disabled = false;
      btnPublish.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>Save Changes</span>
        <kbd class="shortcut-key">Ctrl+S</kbd>
      `;
    }
    showToast('Network error while saving: ' + err.message, 'error');
    return false;
  }
}

// Quick save from overview & topbar
if (btnQuickPublish) btnQuickPublish.onclick = () => savePortfolioData();
if (btnPublish) btnPublish.onclick = () => savePortfolioData();

// File Picker Logic
function handleFileSelection(file) {
  if (!file) return;
  if (!file.name.endsWith('.json')) {
    showToast('Please select a valid .json file', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('JSON file must contain an object');
      }
      currentData = parsed;
      populateAllForms();
      if (filePickerStatus) {
        filePickerStatus.textContent = `✓ Loaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        filePickerStatus.style.color = '#3fb950';
      }
      showToast(`✓ Loaded "${file.name}" into dashboard! Review and click Save Changes when ready.`, 'success', 5000);
    } catch (err) {
      showToast('Error parsing JSON file: ' + err.message, 'error');
      if (filePickerStatus) {
        filePickerStatus.textContent = `Error: ${err.message}`;
        filePickerStatus.style.color = '#f85149';
      }
    }
  };
  reader.readAsText(file);
}

if (btnPickJson && jsonFileInput) {
  btnPickJson.onclick = () => jsonFileInput.click();
  jsonFileInput.onchange = (e) => handleFileSelection(e.target.files[0]);
}

if (btnPickJsonTop && jsonFileInputTop) {
  btnPickJsonTop.onclick = () => jsonFileInputTop.click();
  jsonFileInputTop.onchange = (e) => handleFileSelection(e.target.files[0]);
}

if (btnDownloadJson) {
  btnDownloadJson.onclick = () => {
    collectFormData();
    const blob = new Blob([JSON.stringify(currentData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('✓ Downloaded portfolio-data.json backup', 'success');
  };
}

// Raw JSON actions
btnFormatJson.onclick = () => {
  try {
    const parsed = JSON.parse(rawJsonTextarea.value);
    rawJsonTextarea.value = JSON.stringify(parsed, null, 2);
    jsonValidationMsg.textContent = 'Valid JSON formatted';
    jsonValidationMsg.style.color = '#3fb950';
  } catch (e) {
    jsonValidationMsg.textContent = 'Syntax Error: ' + e.message;
    jsonValidationMsg.style.color = '#f85149';
  }
};

btnValidateJson.onclick = () => {
  try {
    JSON.parse(rawJsonTextarea.value);
    jsonValidationMsg.textContent = '✓ Valid JSON syntax';
    jsonValidationMsg.style.color = '#3fb950';
    showToast('✓ JSON is completely valid', 'success');
  } catch (e) {
    jsonValidationMsg.textContent = 'Syntax Error: ' + e.message;
    jsonValidationMsg.style.color = '#f85149';
    showToast('Invalid JSON: ' + e.message, 'error');
  }
};

btnSaveRaw.onclick = () => savePortfolioData('✓ Saved raw JSON to portfolio-data.json!');

// Keyboard Shortcut: Ctrl+S / Cmd+S to Save Changes
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    savePortfolioData();
  }
});

// Auto-refresh data when returning to tab or when updated elsewhere
window.addEventListener('storage', (e) => {
  if (e.key === 'portfolio_last_updated') {
    loadPortfolioData();
    showToast('Portfolio data synchronized', 'success', 3000);
  }
});

window.addEventListener('focus', () => {
  // Silent refresh if data updated elsewhere
  fetch('/api/portfolio')
    .then(r => r.json())
    .then(json => {
      if (json.data && JSON.stringify(json.data) !== JSON.stringify(currentData)) {
        currentData = json.data;
        populateAllForms();
        if (json.lastModified && overviewLastMod) {
          overviewLastMod.textContent = new Date(json.lastModified).toLocaleString();
        }
      }
    })
    .catch(() => {});
});

// Initialize on page load
loadPortfolioData();
