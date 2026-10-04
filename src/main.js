import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {
  profile,
  cv,
  certificates,
  skillsCategories,
} from "./data/content.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const $ = (sel, root = document) => root.querySelector(sel);
const pdfCache = new Map();

async function loadPdf(url) {
  if (!pdfCache.has(url)) {
    pdfCache.set(url, pdfjsLib.getDocument({ url }).promise);
  }
  return pdfCache.get(url);
}

async function renderPageToCanvas(page, canvas, targetWidth) {
  const unscaled = page.getViewport({ scale: 1 });
  const scale = targetWidth / unscaled.width;
  const viewport = page.getViewport({ scale });
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({
    canvasContext: canvas.getContext("2d", { alpha: false }),
    viewport,
  }).promise;
}

async function renderFirstPage(url, canvas, targetWidth) {
  const pdf = await loadPdf(url);
  const page = await pdf.getPage(1);
  await renderPageToCanvas(page, canvas, targetWidth);
}

function fileName(path) {
  return path.split("/").pop();
}

/* ==========================================================================
   Common: Footer & Navigation
   ========================================================================== */

function renderFooter() {
  const footer = $("#footer-container");
  if (!footer) return;

  const currentYear = new Date().getFullYear();

  footer.innerHTML = `
    <div class="footer-brand">
      <a href="/index.html" class="footer-logo">ZB<span class="logo-dot">.</span></a>
      <p class="footer-copy">© ${currentYear} ${profile.fullName}. Élève Ingénieur en Informatique — EMSI Rabat.</p>
    </div>

    <nav class="footer-nav" aria-label="Navigation secondaire">
      <a href="/index.html">Accueil</a>
      <a href="/a-propos.html">À propos</a>
      <a href="/competences.html">Compétences</a>
      <a href="/cv.html">CV</a>
      <a href="/certificats.html">Certificats</a>
      <a href="/contact.html">Contact</a>
    </nav>

    <div class="footer-socials">
      <a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" aria-label="LinkedIn">
        LinkedIn
      </a>
      <a href="mailto:${profile.email}" class="btn btn-outline btn-sm" aria-label="Email">
        Email
      </a>
    </div>
  `;
}

function setupMobileNav() {
  const toggle = $("#nav-toggle");
  const mobileNav = $("#mobile-nav");
  if (!toggle || !mobileNav) return;

  toggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function setupViewer() {
  const modal = $("#viewer");
  const pages = $("#viewer-pages");
  const title = $("#viewer-title");
  const download = $("#viewer-download");
  if (!modal) return;

  const close = () => {
    modal.hidden = true;
    if (pages) pages.innerHTML = "";
    document.body.style.overflow = "";
  };

  const open = async (file, name, downloadName) => {
    if (title) title.textContent = name;
    if (download) {
      download.href = file;
      download.setAttribute("download", downloadName || fileName(file));
    }
    if (pages) pages.innerHTML = "";
    modal.hidden = false;
    document.body.style.overflow = "hidden";

    const pdf = await loadPdf(file);
    for (let i = 1; i <= pdf.numPages; i += 1) {
      const canvas = document.createElement("canvas");
      if (pages) pages.append(canvas);
      const page = await pdf.getPage(i);
      await renderPageToCanvas(page, canvas, 900);
    }
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-open]");
    if (trigger) {
      open(trigger.dataset.open, trigger.dataset.title, trigger.dataset.download);
      return;
    }
    if (event.target.closest("[data-close]")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close();
  });
}

async function renderAllThumbnails() {
  const canvases = [...document.querySelectorAll("canvas[data-pdf]")];
  for (const canvas of canvases) {
    const parent = canvas.parentElement;
    let skeleton = null;
    if (parent && !parent.querySelector(".canvas-skeleton")) {
      skeleton = document.createElement("div");
      skeleton.className = "canvas-skeleton";
      skeleton.innerHTML = `<span>Chargement du PDF...</span>`;
      canvas.style.display = "none";
      parent.prepend(skeleton);
    }

    try {
      const width = Number(canvas.dataset.pdfWidth) || 700;
      await renderFirstPage(canvas.dataset.pdf, canvas, width);
      if (skeleton) skeleton.remove();
      canvas.style.display = "";
    } catch (error) {
      if (skeleton) skeleton.remove();
      canvas.replaceWith(
        Object.assign(document.createElement("p"), {
          className: "period text-muted",
          textContent: "Aperçu du document indisponible",
        })
      );
      console.error(error);
    }
  }
}

/* ==========================================================================
   PAGE 1: Accueil (Home)
   ========================================================================== */

function initHomePage() {
  const heroContainer = $("#home-hero-container");
  const cardsContainer = $("#home-cards-container");

  if (heroContainer) {
    heroContainer.innerHTML = `
      <div class="home-hero-content">
        <div class="hero-status-pill">
          <span class="pulse-dot"></span>
          <span>${profile.status}</span>
        </div>

        <h1 class="home-title">${profile.fullName}</h1>
        <p class="home-subtitle"><span id="typewriter-text" class="typewriter-text">${profile.title}</span><span class="typewriter-cursor"></span></p>
        <p class="home-bio">${profile.shortBio}</p>

        <div class="home-actions">
          <a href="/competences.html" class="btn btn-primary btn-lg">
            Voir mes compétences
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="/cv.html" class="btn btn-secondary btn-lg">Consulter mon CV</a>
          <a href="/certificats.html" class="btn btn-outline btn-lg">10 Certificats</a>
        </div>
      </div>

      <div class="home-photo-wrap">
        <div class="home-photo-glow"></div>
        <div class="home-photo-card">
          <img class="home-photo-img" src="${profile.photo}" alt="Photo de ${profile.fullName}" />

          <div class="home-floating-badge badge-pos-1">
            <div class="badge-number">3ᵉ</div>
            <div class="badge-label">
              <strong>Année Ingénieur</strong>
              <span>EMSI Rabat (IA & Data)</span>
            </div>
          </div>

          <div class="home-floating-badge badge-pos-2">
            <span class="pulse-dot"></span>
            <div class="badge-label">
              <strong>Stage PFE</strong>
              <span>Disponibilité immédiate</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (cardsContainer) {
    cardsContainer.innerHTML = `
      <div class="home-card">
        <div class="home-card-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <h3>Compétences Techniques</h3>
        <p>40 technologies, frameworks et architectures maîtrisés (IA, LangChain, Python, Backend, Data Pipelines) avec logos HD.</p>
        <a href="/competences.html" class="home-card-link">Explorer la stack →</a>
      </div>

      <div class="home-card">
        <div class="home-card-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
        </div>
        <h3>Mon Curriculum Vitae</h3>
        <p>Consultez mon CV officiel directement en ligne via visionneuse haute résolution intégrée ou téléchargez le PDF.</p>
        <a href="/cv.html" class="home-card-link">Consulter le CV →</a>
      </div>

      <div class="home-card">
        <div class="home-card-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
        </div>
        <h3>Certifications Coursera</h3>
        <p>10 certifications académiques et industrielles obtenues auprès d'UC San Diego, Google, Meta, IBM, Johns Hopkins.</p>
        <a href="/certificats.html" class="home-card-link">Voir les 10 certificats →</a>
      </div>

      <div class="home-card">
        <div class="home-card-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h3>À propos & Parcours</h3>
        <p>Classes préparatoires, cycle d'ingénieur à l'EMSI Rabat, vision technologique et atouts méthodologiques.</p>
        <a href="/a-propos.html" class="home-card-link">Lire ma présentation →</a>
      </div>
    `;
  }

  initTypewriter();
}

/* ==========================================================================
   PAGE 2: À propos & Parcours
   ========================================================================== */

function initAboutPage() {
  const container = $("#about-page-container");
  if (!container) return;

  const educationHtml = profile.education
    .map(
      (item, idx) => `
    <div class="timeline-item ${idx === 0 ? "is-current" : ""}">
      <span class="timeline-item-period">${item.period}</span>
      <h4 class="timeline-item-degree">${item.degree}</h4>
      <p class="timeline-item-school">${item.school}</p>
      <p class="timeline-item-detail">${item.detail}</p>
    </div>`
    )
    .join("");

  const strengthsHtml = profile.strengths
    .map(
      (s) => `
    <div class="strength-card">
      <h4>${s.title}</h4>
      <p>${s.desc}</p>
    </div>`
    )
    .join("");

  const languagesHtml = profile.languages
    .map((l) => `${l.name} (${l.level})`)
    .join(" • ");

  container.innerHTML = `
    <!-- Left Column: Narrative & Identity Details -->
    <div class="about-narrative-card">
      <h3 style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin: 0 0 1rem;">Présentation & Ambitions</h3>
      <p>${profile.shortBio}</p>
      <p>
        Mon cursus m'a permis d'acquérir une double compétence : la rigueur de modélisation mathématique et algorithmique développée en classes préparatoires, complétée par une expertise pratique en ingénierie logicielle et Intelligence Artificielle à l'EMSI Rabat.
      </p>
      <p style="color: var(--primary-light); font-weight: 600;">
        🎯 Objectif : ${profile.objective}
      </p>

      <div class="about-meta-list">
        <div class="about-meta-item">
          <span class="about-meta-label">Nom complet</span>
          <span class="about-meta-val">${profile.fullName}</span>
        </div>
        <div class="about-meta-item">
          <span class="about-meta-label">Établissement</span>
          <span class="about-meta-val">EMSI Rabat</span>
        </div>
        <div class="about-meta-item">
          <span class="about-meta-label">Spécialisation</span>
          <span class="about-meta-val">IA & Data Science</span>
        </div>
        <div class="about-meta-item">
          <span class="about-meta-label">Localisation</span>
          <span class="about-meta-val">${profile.city}, ${profile.country}</span>
        </div>
        <div class="about-meta-item" style="grid-column: span 2;">
          <span class="about-meta-label">Langues maîtrisées</span>
          <span class="about-meta-val">${languagesHtml}</span>
        </div>
        <div class="about-meta-item" style="grid-column: span 2;">
          <span class="about-meta-label">LinkedIn</span>
          <span class="about-meta-val"><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-light);">${profile.linkedinLabel}</a></span>
        </div>
      </div>
    </div>

    <!-- Right Column: Timeline & Strengths -->
    <div class="about-trajectory-column">
      <div class="timeline-block">
        <h3>Parcours académique</h3>
        <div class="timeline-items">
          ${educationHtml}
        </div>
      </div>

      <div class="timeline-block">
        <h3>Domaines d'impact & Atouts</h3>
        <div class="strengths-grid">
          ${strengthsHtml}
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   PAGE 3: Compétences (Standalone Skills Page)
   ========================================================================== */

function initSkillsPage() {
  const container = $("#skills-grid-container");
  if (!container) return;

  container.innerHTML = skillsCategories
    .map(
      (cat) => `
    <article class="skills-card" data-category="${cat.id}">
      <div class="skills-card-header">
        <div class="skills-card-badge" aria-hidden="true">${cat.icon}</div>
        <h3 class="skills-card-title">${cat.title}</h3>
      </div>
      <div class="skills-card-chips">
        ${cat.skills
          .map(
            (skill) => `
          <div class="skill-chip" data-skill="${skill.name.toLowerCase()}">
            <span class="skill-chip-icon" aria-hidden="true">${skill.svg}</span>
            <span class="skill-chip-label">${skill.name}</span>
          </div>`
          )
          .join("")}
      </div>
    </article>`
    )
    .join("");

  setupSkillsInteractions();
}

function setupSkillsInteractions() {
  const searchInput = $("#skills-search");
  const clearBtn = $("#skills-clear");
  const emptyState = $("#skills-empty");
  const emptyQuery = $("#skills-empty-query");
  const filterTabs = [...document.querySelectorAll(".filter-tab")];
  const cards = [...document.querySelectorAll(".skills-card")];

  let currentCategory = "all";
  let searchQuery = "";

  function applyFilters() {
    const q = searchQuery.trim().toLowerCase();
    let totalMatches = 0;

    cards.forEach((card) => {
      const cardCat = card.dataset.category;
      const matchesCategory =
        currentCategory === "all" || cardCat === currentCategory;

      if (!matchesCategory) {
        card.style.display = "none";
        return;
      }

      card.style.display = "";
      const chips = [...card.querySelectorAll(".skill-chip")];
      let cardMatches = 0;

      chips.forEach((chip) => {
        const skillName = chip.dataset.skill;
        if (!q) {
          chip.classList.remove("is-matched", "is-dimmed");
          cardMatches += 1;
        } else if (skillName.includes(q)) {
          chip.classList.add("is-matched");
          chip.classList.remove("is-dimmed");
          cardMatches += 1;
        } else {
          chip.classList.remove("is-matched");
          chip.classList.add("is-dimmed");
        }
      });

      if (q && cardMatches === 0) {
        card.classList.add("is-dimmed-card");
      } else {
        card.classList.remove("is-dimmed-card");
      }

      totalMatches += cardMatches;
    });

    if (emptyState) {
      if (totalMatches === 0 && q) {
        emptyState.hidden = false;
        if (emptyQuery) emptyQuery.textContent = searchQuery;
      } else {
        emptyState.hidden = true;
      }
    }

    if (clearBtn) {
      clearBtn.hidden = !q;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchQuery = "";
        searchInput.focus();
        applyFilters();
      }
    });
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      currentCategory = tab.dataset.filter;
      applyFilters();
    });
  });

  const skillsGrid = $("#skills-grid-container");
  if (skillsGrid) {
    skillsGrid.addEventListener("click", (e) => {
      const chip = e.target.closest(".skill-chip");
      if (!chip) return;
      const label = chip.querySelector(".skill-chip-label");
      if (label && searchInput) {
        searchInput.value = label.textContent.trim();
        searchQuery = searchInput.value;
        applyFilters();
        searchInput.focus();
        showToast(`Compétence filtrée : ${label.textContent.trim()}`);
      }
    });
  }
}

/* ==========================================================================
   PAGE 4: CV (Standalone CV Page)
   ========================================================================== */

function initCvPage() {
  const container = $("#cv-page-container");
  if (!container) return;

  container.innerHTML = `
    <div class="cv-toolbar">
      <div class="cv-meta-details">
        <h3>${cv.name}</h3>
        <p>Document officiel au format PDF haute résolution. Disponible pour stage PFE (Fin d'études).</p>
      </div>

      <div class="cv-page-actions">
        <a class="btn btn-primary" href="${cv.file}" download="${cv.downloadName}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Télécharger le PDF
        </a>
        <button class="btn btn-secondary" type="button" data-open="${cv.file}" data-title="${cv.name}" data-download="${cv.downloadName}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Plein écran
        </button>
      </div>
    </div>

    <div class="cv-viewer-frame">
      <canvas data-pdf="${cv.file}" data-pdf-width="840" aria-label="Aperçu du CV de ${profile.fullName}"></canvas>
    </div>
  `;

  renderAllThumbnails();
}

/* ==========================================================================
   PAGE 5: Certificats (Standalone Certifications Page)
   ========================================================================== */

function initCertificatesPage() {
  const filterContainer = $("#cert-filter-container");
  const gridContainer = $("#cert-grid-container");
  if (!gridContainer) return;

  // Extract unique domains
  const domains = ["Tous", ...new Set(certificates.map((c) => c.domain))];

  if (filterContainer) {
    filterContainer.innerHTML = domains
      .map(
        (domain, idx) => `
      <button type="button" class="filter-tab ${idx === 0 ? "is-active" : ""}" data-cert-domain="${domain}">
        ${domain}
      </button>`
      )
      .join("");
  }

  function renderCertGrid(selectedDomain = "Tous") {
    const filtered =
      selectedDomain === "Tous"
        ? certificates
        : certificates.filter((c) => c.domain === selectedDomain);

    gridContainer.innerHTML = filtered
      .map(
        (cert) => `
      <article class="cert-card" data-domain="${cert.domain}">
        <div class="cert-preview">
          <canvas data-pdf="${cert.file}" data-pdf-width="640" aria-label="Aperçu — ${cert.name}"></canvas>
        </div>
        <div class="cert-body">
          <span class="cert-domain-badge">${cert.domain}</span>
          <h3>${cert.name}</h3>
          <p class="cert-org">${cert.organization}</p>
          <p class="cert-date">${cert.date}</p>
          <div class="cert-actions">
            <button class="btn btn-primary btn-sm" type="button" data-open="${cert.file}" data-title="${cert.name}" data-download="${fileName(cert.file)}">
              Consulter
            </button>
            <a class="btn btn-secondary btn-sm" href="${cert.file}" download="${fileName(cert.file)}">
              Télécharger
            </a>
          </div>
        </div>
      </article>`
      )
      .join("");

    renderAllThumbnails();
  }

  renderCertGrid();

  if (filterContainer) {
    filterContainer.addEventListener("click", (e) => {
      const tab = e.target.closest("[data-cert-domain]");
      if (!tab) return;
      filterContainer.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderCertGrid(tab.dataset.certDomain);
    });
  }
}

/* ==========================================================================
   PAGE 6: Contact (Standalone Contact Page)
   ========================================================================== */

function initContactPage() {
  const container = $("#contact-page-container");
  if (!container) return;

  container.innerHTML = `
    <!-- Left Column: Contact Info Cards -->
    <div class="contact-cards-stack">
      <div class="contact-card">
        <div class="contact-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <div>
          <span class="contact-card-label">Adresse Email</span>
          <a href="mailto:${profile.email}" class="contact-card-val">${profile.email}</a>
        </div>
      </div>

      <div class="contact-card">
        <div class="contact-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <div>
          <span class="contact-card-label">Numéro de Téléphone</span>
          <a href="${profile.phoneHref}" class="contact-card-val">${profile.phone}</a>
        </div>
      </div>

      <div class="contact-card">
        <div class="contact-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div>
          <span class="contact-card-label">Localisation</span>
          <span class="contact-card-val">${profile.city}, ${profile.country}</span>
        </div>
      </div>

      <div class="contact-card">
        <div class="contact-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
          </svg>
        </div>
        <div>
          <span class="contact-card-label">LinkedIn Professionnel</span>
          <a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-card-val">${profile.linkedinLabel}</a>
        </div>
      </div>
    </div>

    <!-- Right Column: Contact Form -->
    <div class="contact-form-panel">
      <h3 style="font-size: 1.4rem; font-weight: 700; color: #ffffff; margin: 0 0 1.2rem;">Envoyer un message</h3>
      <form id="contact-form">
        <div class="form-group">
          <label for="form-name">Nom complet</label>
          <input type="text" id="form-name" required placeholder="Votre nom" />
        </div>

        <div class="form-group">
          <label for="form-email">Adresse email</label>
          <input type="email" id="form-email" required placeholder="nom@entreprise.com" />
        </div>

        <div class="form-group">
          <label for="form-subject">Sujet de l'échange</label>
          <input type="text" id="form-subject" required placeholder="Proposition de stage PFE, échange technique..." />
        </div>

        <div class="form-group">
          <label for="form-message">Votre message</label>
          <textarea id="form-message" rows="5" required placeholder="Décrivez votre opportunité ou votre message..."></textarea>
        </div>

        <button type="submit" class="btn btn-primary btn-full">
          <span>Envoyer le message</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>

        <div id="form-feedback" class="form-feedback" hidden></div>
      </form>
    </div>
  `;

  const form = $("#contact-form");
  const feedback = $("#form-feedback");
  if (form && feedback) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#form-name").value;
      const email = $("#form-email").value;
      const subject = $("#form-subject").value;
      const message = $("#form-message").value;

      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        subject + " — de " + name
      )}&body=${encodeURIComponent(
        "Nom: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
      )}`;

      window.location.href = mailtoUrl;

      feedback.hidden = false;
      feedback.className = "form-feedback feedback-success";
      feedback.innerHTML = `Merci ${name} ! Votre logiciel de messagerie s'ouvre avec le message adressé à <strong>${profile.email}</strong>.`;
    });
  }
}

/* ==========================================================================
   Animations & Interactive Enhancements
   ========================================================================== */

function initTypewriter() {
  const el = $("#typewriter-text");
  if (!el) return;

  const phrases = [
    "Élève Ingénieur en Informatique — EMSI Rabat",
    "Spécialiste en Intelligence Artificielle & Data Science",
    "Architectures RAG & Modèles LLM (LangChain, Ollama)",
    "Développeur Full-Stack (FastAPI, React, .NET Core)",
    "À la recherche d'un stage de fin d'études (PFE)",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 90;

  function tick() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      delay = 38;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      delay = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      delay = 2400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 450;
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 1200);
}

function setupAmbientGlow() {
  if ($(".bg-ambient-layer")) return;
  const layer = document.createElement("div");
  layer.className = "bg-ambient-layer";
  layer.setAttribute("aria-hidden", "true");
  layer.innerHTML = `
    <div class="ambient-orb ambient-orb-1"></div>
    <div class="ambient-orb ambient-orb-2"></div>
    <div class="ambient-grid"></div>
  `;
  document.body.prepend(layer);
}

function setupFancyParticles() {
  if ($("#fancy-bg-canvas")) return;
  const canvas = document.createElement("canvas");
  canvas.id = "fancy-bg-canvas";
  canvas.className = "fancy-bg-canvas";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let width, height;
  let animationId;
  let mouse = { x: -1000, y: -1000, active: false };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener("mouseleave", () => {
    mouse.active = false;
  }, { passive: true });

  const count = Math.min(Math.floor(window.innerWidth / 22), 70);
  const particles = [];
  const colors = [
    "rgba(56, 189, 248, ",
    "rgba(168, 85, 247, ",
    "rgba(52, 211, 153, ",
  ];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      baseAlpha: Math.random() * 0.5 + 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      else if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      else if (p.y > height) p.y = 0;

      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          p.x -= (dx / dist) * force * 0.7;
          p.y -= (dy / dist) * force * 0.7;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${force * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.baseAlpha + ")";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 105) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 105) * 0.15})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(animationId);
    else animationId = requestAnimationFrame(draw);
  });

  animationId = requestAnimationFrame(draw);
}

function setupCardSpotlight() {
  const cards = document.querySelectorAll(
    ".home-card, .skills-card, .cert-card, .strength-card, .contact-card, .about-narrative-card, .contact-form-panel"
  );
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

function setupBackToTop() {
  if ($("#back-to-top")) return;
  const btn = document.createElement("button");
  btn.id = "back-to-top";
  btn.className = "back-to-top";
  btn.type = "button";
  btn.setAttribute("aria-label", "Remonter en haut de la page");
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.body.appendChild(btn);

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 280) {
        btn.classList.add("is-visible");
      } else {
        btn.classList.remove("is-visible");
      }
    },
    { passive: true }
  );
}

let toastTimer;
function showToast(message, icon = "✓") {
  let toast = $("#toast-pill");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-pill";
    toast.className = "toast-pill";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  toast.classList.remove("is-leaving");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    if (toast) {
      toast.classList.add("is-leaving");
      setTimeout(() => {
        if (toast && toast.parentNode) toast.remove();
      }, 280);
    }
  }, 2600);
}

function setupClipboardToast() {
  document.addEventListener("click", (e) => {
    const contactCard = e.target.closest(".contact-card");
    if (contactCard) {
      const valEl = contactCard.querySelector(".contact-card-val");
      if (valEl) {
        const textToCopy = valEl.textContent.trim();
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              showToast(`Copié : ${textToCopy}`);
            })
            .catch(() => {
              showToast(textToCopy);
            });
        }
      }
    }
  });
}

function setupScrollReveal() {
  const items = document.querySelectorAll(
    ".home-card, .skills-card, .cert-card, .strength-card, .timeline-item, .contact-card"
  );
  if (!items.length) return;

  items.forEach((item) => item.classList.add("reveal-item"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    items.forEach((item) => observer.observe(item));
  } else {
    items.forEach((item) => item.classList.add("is-revealed"));
  }
}

/* ==========================================================================
   Page Router Initialization
   ========================================================================== */

const page = document.body.dataset.page;

if (page === "home") {
  initHomePage();
} else if (page === "about") {
  initAboutPage();
} else if (page === "skills") {
  initSkillsPage();
} else if (page === "cv") {
  initCvPage();
} else if (page === "certificates") {
  initCertificatesPage();
} else if (page === "contact") {
  initContactPage();
}

renderFooter();
setupMobileNav();
setupViewer();
setupAmbientGlow();
setupFancyParticles();
setupCardSpotlight();
setupBackToTop();
setupClipboardToast();
setupScrollReveal();
