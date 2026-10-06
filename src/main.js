import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {
  profile,
  cv,
  certificates,
  skillsCategories,
  projects,
} from "./data/content.js";
import { getLang, ui, profileEn, projectsEn, certDomainEn } from "./data/i18n.js";

const lang = getLang();
document.documentElement.lang = lang;
const t = (key) => ui[lang]?.[key] ?? ui.fr[key] ?? key;
const locProfile = lang === "en" ? { ...profile, ...profileEn } : profile;

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
      <p class="footer-copy">© ${currentYear} ${profile.fullName}. ${t("footerCopy")}</p>
    </div>

    <nav class="footer-nav" aria-label="Navigation secondaire">
      <a href="/index.html">${t("navHome")}</a>
      <a href="/a-propos.html">${t("navAbout")}</a>
      <a href="/projets.html">${t("navProjects")}</a>
      <a href="/competences.html">${t("navSkills")}</a>
      <a href="/cv.html">${t("navCv")}</a>
      <a href="/certificats.html">${t("navCerts")}</a>
      <a href="/contact.html">${t("navContact")}</a>
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
      skeleton.innerHTML = `<span>${t("pdfLoading")}</span>`;
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
          textContent: t("cvUnavailable"),
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
          <span>${locProfile.status}</span>
        </div>

        <h1 class="home-title">${profile.fullName}</h1>
        <p class="home-subtitle"><span id="typewriter-text" class="typewriter-text">${locProfile.title}</span><span class="typewriter-cursor"></span></p>
        <p class="home-bio">${locProfile.shortBio}</p>

        <div class="home-actions">
          <a href="/competences.html" class="btn btn-primary btn-lg">
            ${t("homeSkillsBtn")}
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="/cv.html" class="btn btn-secondary btn-lg">${t("homeCvBtn")}</a>
          <a href="/certificats.html" class="btn btn-outline btn-lg">${t("homeCertsBtn")}</a>
        </div>
      </div>

      <div class="home-photo-wrap">
        <div class="home-photo-glow"></div>
        <div class="home-photo-card">
          <img class="home-photo-img" src="${profile.photo}" alt="Photo de ${profile.fullName}" />

          <div class="home-floating-badge badge-pos-1">
            <div class="badge-number">3ᵉ</div>
            <div class="badge-label">
              <strong>${t("badgeYear")}</strong>
              <span>${t("badgeSchool")}</span>
            </div>
          </div>

          <div class="home-floating-badge badge-pos-2">
            <span class="pulse-dot"></span>
            <div class="badge-label">
              <strong>${t("badgePfe")}</strong>
              <span>${t("badgeAvail")}</span>
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
        <h3>${t("homeSkillsTitle")}</h3>
        <p>${t("homeSkillsText")}</p>
        <a href="/competences.html" class="home-card-link">${t("homeSkillsLink")}</a>
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
        <h3>${t("homeCvTitle")}</h3>
        <p>${t("homeCvText")}</p>
        <a href="/cv.html" class="home-card-link">${t("homeCvLink")}</a>
      </div>

      <div class="home-card">
        <div class="home-card-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
        </div>
        <h3>${t("homeCertTitle")}</h3>
        <p>${t("homeCertText")}</p>
        <a href="/certificats.html" class="home-card-link">${t("homeCertLink")}</a>
      </div>

      <div class="home-card">
        <div class="home-card-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h3>${t("homeAboutTitle")}</h3>
        <p>${t("homeAboutText")}</p>
        <a href="/a-propos.html" class="home-card-link">${t("homeAboutLink")}</a>
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

  const educationHtml = locProfile.education
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

  const strengthsHtml = locProfile.strengths
    .map(
      (s) => `
    <div class="strength-card">
      <h4>${s.title}</h4>
      <p>${s.desc}</p>
    </div>`
    )
    .join("");

  const languagesHtml = locProfile.languages
    .map((l) => `${l.name} (${l.level})`)
    .join(" • ");

  container.innerHTML = `
    <!-- Left Column: Narrative & Identity Details -->
    <div class="about-narrative-card">
      <h3>${t("aboutHeading")}</h3>
      <p>${locProfile.shortBio}</p>
      <p>
        ${t("aboutNarrative")}
      </p>
      <p class="about-objective">
        ${t("aboutObjective")} : ${locProfile.objective}
      </p>

      <div class="about-meta-list">
        <div class="about-meta-item">
          <span class="about-meta-label">${t("aboutName")}</span>
          <span class="about-meta-val">${profile.fullName}</span>
        </div>
        <div class="about-meta-item">
          <span class="about-meta-label">${t("aboutSchool")}</span>
          <span class="about-meta-val">EMSI Rabat</span>
        </div>
        <div class="about-meta-item">
          <span class="about-meta-label">${t("aboutSpec")}</span>
          <span class="about-meta-val">IA & Data Science</span>
        </div>
        <div class="about-meta-item">
          <span class="about-meta-label">${t("aboutLocation")}</span>
          <span class="about-meta-val">${profile.city}, ${profile.country}</span>
        </div>
        <div class="about-meta-item" style="grid-column: span 2;">
          <span class="about-meta-label">${t("aboutLangs")}</span>
          <span class="about-meta-val">${languagesHtml}</span>
        </div>
        <div class="about-meta-item" style="grid-column: span 2;">
          <span class="about-meta-label">LinkedIn</span>
          <span class="about-meta-val"><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" class="about-link">${profile.linkedinLabel}</a></span>
        </div>
      </div>
    </div>

    <!-- Right Column: Timeline & Strengths -->
    <div class="about-trajectory-column">
      <div class="timeline-block">
        <h3>${t("aboutEdu")}</h3>
        <div class="timeline-items">
          ${educationHtml}
        </div>
      </div>

      <div class="timeline-block">
        <h3>${t("aboutStrengths")}</h3>
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
        showToast(`${t("skillsFiltered")} : ${label.textContent.trim()}`);
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
        <p>${t("cvMeta")}</p>
      </div>

      <div class="cv-page-actions">
        <a class="btn btn-primary" href="${cv.file}" download="${cv.downloadName}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          ${t("cvDownload")}
        </a>
        <button class="btn btn-secondary" type="button" data-open="${cv.file}" data-title="${cv.name}" data-download="${cv.downloadName}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          ${t("cvFullscreen")}
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
  const allLabel = t("certAll");
  const domains = [allLabel, ...new Set(certificates.map((c) => (lang === "en" ? certDomainEn[c.domain] || c.domain : c.domain)))];

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

  function renderCertGrid(selectedDomain = allLabel) {
    const filtered =
      selectedDomain === allLabel
        ? certificates
        : certificates.filter((c) => {
            const domainLabel = lang === "en" ? certDomainEn[c.domain] || c.domain : c.domain;
            return domainLabel === selectedDomain;
          });

    gridContainer.innerHTML = filtered
      .map(
        (cert) => `
      <article class="cert-card" data-domain="${cert.domain}">
        <div class="cert-preview">
          <canvas data-pdf="${cert.file}" data-pdf-width="640" aria-label="Aperçu — ${cert.name}"></canvas>
        </div>
        <div class="cert-body">
          <span class="cert-domain-badge">${lang === "en" ? certDomainEn[cert.domain] || cert.domain : cert.domain}</span>
          <h3>${cert.name}</h3>
          <p class="cert-org">${cert.organization}</p>
          <p class="cert-date">${cert.date}</p>
          <div class="cert-actions">
            <button class="btn btn-primary btn-sm" type="button" data-open="${cert.file}" data-title="${cert.name}" data-download="${fileName(cert.file)}">
              ${t("certView")}
            </button>
            <a class="btn btn-secondary btn-sm" href="${cert.file}" download="${fileName(cert.file)}">
              ${t("certDownload")}
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
          <span class="contact-card-label">${t("contactEmail")}</span>
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
          <span class="contact-card-label">${t("contactPhone")}</span>
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
          <span class="contact-card-label">${t("contactLoc")}</span>
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
          <span class="contact-card-label">${t("contactLinkedin")}</span>
          <a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-card-val">${profile.linkedinLabel}</a>
        </div>
      </div>
    </div>

    <!-- Right Column: Contact Form -->
    <div class="contact-form-panel">
      <h3 class="contact-form-title">${t("contactFormTitle")}</h3>
      <form id="contact-form">
        <div class="form-group">
          <label for="form-name">${t("formName")}</label>
          <input type="text" id="form-name" required placeholder="${t("formNamePh")}" />
        </div>

        <div class="form-group">
          <label for="form-email">${t("formEmail")}</label>
          <input type="email" id="form-email" required placeholder="${t("formEmailPh")}" />
        </div>

        <div class="form-group">
          <label for="form-subject">${t("formSubject")}</label>
          <input type="text" id="form-subject" required placeholder="${t("formSubjectPh")}" />
        </div>

        <div class="form-group">
          <label for="form-message">${t("formMessage")}</label>
          <textarea id="form-message" rows="5" required placeholder="${t("formMessagePh")}"></textarea>
        </div>

        <button type="submit" class="btn btn-primary btn-full">
          <span>${t("formSend")}</span>
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
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = $("#form-name").value;
      const email = $("#form-email").value;
      const subject = $("#form-subject").value;
      const message = $("#form-message").value;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = t("formSending");
      submitBtn.disabled = true;
      feedback.hidden = true;

      try {
        // Remplacez "VOTRE_ID_FORMSPREE" par votre identifiant de formulaire Formspree (ex: https://formspree.io/f/xyzababc)
        // Vous pouvez obtenir un identifiant gratuitement sur https://formspree.io/
        const response = await fetch("https://formspree.io/f/mzedbwrn", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message
          })
        });

        if (response.ok) {
          feedback.hidden = false;
          feedback.className = "form-feedback feedback-success";
          feedback.innerHTML = t("formThanks").replace("{name}", name);
          form.reset();
        } else {
          const data = await response.json();
          feedback.hidden = false;
          feedback.className = "form-feedback feedback-error";
          if (data.errors) {
            feedback.innerHTML = data.errors.map(error => error.message).join(", ");
          } else {
            feedback.innerHTML = t("formError");
          }
        }
      } catch (error) {
        feedback.hidden = false;
        feedback.className = "form-feedback feedback-error";
        feedback.innerHTML = t("formError");
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
}

/* ==========================================================================
   Animations & Interactive Enhancements
   ========================================================================== */

function initTypewriter() {
  const el = $("#typewriter-text");
  if (!el) return;

  const phrases = t("typewriter");

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
  // Disabled in premium theme
  return;
}

function setupFancyParticles() {
  // Disabled in premium minimalist theme
  return;
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
  btn.setAttribute("aria-label", t("backToTop"));
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
              showToast(`${t("copied")} : ${textToCopy}`);
            })
            .catch(() => {
              showToast(textToCopy);
            });
        }
      }
    }
  });
}


function applyTheme(theme) {
  const isDark = theme === "dark";
  if (isDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
    /* ignore */
  }

  const btn = $("#theme-toggle");
  if (!btn) return;
  btn.setAttribute("aria-label", isDark ? t("themeLight") : t("themeDark"));
  btn.title = isDark ? t("themeLight") : t("themeDark");
}

function setupThemeToggle() {
  const saved = (() => {
    try {
      return localStorage.getItem("theme");
    } catch {
      return null;
    }
  })();
  applyTheme(saved === "dark" ? "dark" : "light");

  const btn = $("#theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    applyTheme(isDark ? "light" : "dark");
  });
}

function applyStaticI18n() {
  const skip = $(".skip-link");
  if (skip) skip.textContent = t("skip");

  const hrefMap = {
    "/index.html": "navHome",
    "/a-propos.html": "navAbout",
    "/projets.html": "navProjects",
    "/competences.html": "navSkills",
    "/cv.html": "navCv",
    "/certificats.html": "navCerts",
    "/contact.html": "navContact",
  };

  document.querySelectorAll(".nav-link, .mobile-link").forEach((link) => {
    const key = hrefMap[link.getAttribute("href")];
    if (key) link.textContent = t(key);
  });

  document.querySelectorAll(".header-cta a, .mobile-nav .btn-primary").forEach((link) => {
    if (link.getAttribute("href") === "/contact.html") {
      link.textContent = t("contactCta");
    }
  });

  const page = document.body.dataset.page;
  const intros = {
    home: ["homeEyebrow", "homeExplore", "homeLead"],
    about: ["aboutEyebrow", "aboutTitle", "aboutLead"],
    skills: ["skillsEyebrow", "skillsTitle", "skillsLead"],
    cv: ["cvEyebrow", "cvTitle", "cvLead"],
    certificates: ["certsEyebrow", "certsTitle", "certsLead"],
    contact: ["contactEyebrow", "contactTitle", "contactLead"],
    projects: ["projectsEyebrow", "projectsTitle", "projectsLead"],
  };
  const keys = intros[page];
  if (keys) {
    const eyebrow = $(".page-intro .eyebrow, .home-section-cards .eyebrow");
    const title = $(".page-intro .page-title, .home-section-cards h2");
    const lead = $(".page-intro .page-lead, .home-section-cards .page-lead");
    if (eyebrow) eyebrow.textContent = t(keys[0]);
    if (title) title.textContent = t(keys[1]);
    if (lead) lead.textContent = t(keys[2]);
  }

  const search = $("#skills-search");
  if (search) {
    search.placeholder = t("skillsSearch");
    search.setAttribute("aria-label", t("skillsSearch"));
  }
  const allTab = document.querySelector('.filter-tab[data-filter="all"]');
  if (allTab) {
    const count = allTab.querySelector(".tab-count");
    allTab.innerHTML = `${t("skillsAll")} ${count ? count.outerHTML : ""}`;
  }
  const langTab = document.querySelector('.filter-tab[data-filter="programming-languages"]');
  if (langTab) {
    const count = langTab.querySelector(".tab-count");
    langTab.innerHTML = `${t("skillsLangs")} ${count ? count.outerHTML : ""}`;
  }
  const empty = $("#skills-empty p");
  if (empty) {
    empty.innerHTML = `${t("skillsEmpty")} "<span id="skills-empty-query"></span>".`;
  }

  const langBtn = $("#lang-toggle");
  if (langBtn) {
    langBtn.textContent = lang === "en" ? "FR" : "EN";
    langBtn.setAttribute("aria-label", t("langSwitch"));
    langBtn.title = t("langSwitch");
  }
}

function setupLangToggle() {
  const btn = $("#lang-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    try {
      localStorage.setItem("lang", lang === "en" ? "fr" : "en");
    } catch {
      /* ignore */
    }
    window.location.reload();
  });
}

function setupScrollReveal() {
  const items = document.querySelectorAll(
    ".home-card, .skills-card, .cert-card, .strength-card, .timeline-item, .contact-card, .project-card"
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


function initProjectsPage() {
  const container = $("#projects-page-container");
  if (!container) return;

  if (!projects || projects.length === 0) {
    container.innerHTML = `<p class="page-lead">${t("projectsEmpty")}</p>`;
    return;
  }

  let html = '<div class="projects-grid">';
  projects.forEach((p, index) => {
    const copy = lang === "en" ? projectsEn[index] || p : p;
    const highlights = copy.highlights || p.highlights || [];
    const gallery = p.gallery && p.gallery.length ? p.gallery : p.image ? [{ src: p.image, alt: copy.title }] : [];
    const cover = gallery[0];
    const thumbs = gallery
      .map(
        (item, i) => `
        <button type="button" class="project-thumb ${i === 0 ? "is-active" : ""}" data-src="${item.src}" data-alt="${item.alt || copy.title}" aria-label="${item.alt || copy.title}">
          <img src="${item.src}" alt="${item.alt || copy.title}" loading="lazy" />
        </button>`
      )
      .join("");

    html += `
      <article class="project-card reveal-item">
        ${
          cover
            ? `<button type="button" class="project-cover" data-src="${cover.src}" data-alt="${cover.alt || copy.title}">
          <img src="${cover.src}" alt="${cover.alt || copy.title}" />
        </button>`
            : ""
        }
        <div class="project-body">
          <h3 class="project-title">${copy.title}</h3>
          <p class="project-desc">${copy.description}</p>
          ${
            highlights.length
              ? `<ul class="project-highlights">${highlights.map((h) => `<li>${h}</li>`).join("")}</ul>`
              : ""
          }
          ${gallery.length > 1 ? `<div class="project-gallery">${thumbs}</div>` : ""}
          <div class="project-techs">
            ${p.techs.map((tech) => `<span class="project-tech">${tech}</span>`).join("")}
          </div>
          ${
            p.githubUrl || p.demoUrl
              ? `<div class="project-links">
            ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub ↗</a>` : ""}
            ${p.demoUrl ? `<a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link">Demo ↗</a>` : ""}
          </div>`
              : ""
          }
        </div>
      </article>
    `;
  });
  html += "</div>";
  container.innerHTML = html;
  setupProjectGallery(container);
}

function setupProjectGallery(container) {
  const lightbox = document.createElement("div");
  lightbox.className = "project-lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <button type="button" class="project-lightbox-close" aria-label="${lang === "en" ? "Close" : "Fermer"}">×</button>
    <img alt="" />
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".project-lightbox-close");

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImg.removeAttribute("src");
  };

  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
  };

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  container.querySelectorAll(".project-card").forEach((card) => {
    const coverBtn = card.querySelector(".project-cover");
    const coverImg = coverBtn?.querySelector("img");

    card.querySelectorAll(".project-thumb").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const src = thumb.dataset.src;
        const alt = thumb.dataset.alt;
        card.querySelectorAll(".project-thumb").forEach((el) => el.classList.remove("is-active"));
        thumb.classList.add("is-active");
        if (coverImg && coverBtn) {
          coverImg.src = src;
          coverImg.alt = alt;
          coverBtn.dataset.src = src;
          coverBtn.dataset.alt = alt;
        }
      });
    });

    coverBtn?.addEventListener("click", () => openLightbox(coverBtn.dataset.src, coverBtn.dataset.alt));
  });
}

/* ==========================================================================
   Page Router Initialization
   ========================================================================== */

const page = document.body.dataset.page;
applyStaticI18n();

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
} else if (page === "projects") {
  initProjectsPage();
}

renderFooter();
setupMobileNav();
setupThemeToggle();
setupLangToggle();
setupViewer();
setupAmbientGlow();
setupFancyParticles();
setupCardSpotlight();
setupBackToTop();
setupClipboardToast();
setupScrollReveal();
