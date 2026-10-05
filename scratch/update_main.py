import re

main_file = 'src/main.js'
with open(main_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Import projects
if 'export const projects' in open('src/data/content.js', 'r', encoding='utf-8').read():
    content = re.sub(r'import\s+\{\s*profile,\s*cv,\s*certificates\s*\}\s*from\s*"./data/content\.js";', 
                     'import { profile, cv, certificates, projects } from "./data/content.js";', content)

# 2. Add initProjectsPage
projects_func = '''
function initProjectsPage() {
  const container = $("#projects-page-container");
  if (!container) return;
  
  if (!projects || projects.length === 0) {
    container.innerHTML = '<p class="page-lead">Aucun projet à afficher pour le moment.</p>';
    return;
  }
  
  let html = '<div class="projects-grid">';
  projects.forEach(p => {
    html += `
      <div class="project-card reveal-item">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-techs">
          ${p.techs.map(t => `<span class="project-tech">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub ↗</a>` : ''}
          ${p.demoUrl ? `<a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link">Demo ↗</a>` : ''}
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}
'''

if 'function initProjectsPage()' not in content:
    content = content.replace('/* ==========================================================================\n   Page Router Initialization', projects_func + '\n/* ==========================================================================\n   Page Router Initialization')

# 3. Add setupThemeToggle & setupLangToggle
theme_func = '''
function setupThemeToggle() {
  const btn = $("#theme-toggle");
  if (!btn) return;
  
  const moon = btn.querySelector(".moon-icon");
  const sun = btn.querySelector(".sun-icon");
  
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (moon) moon.style.display = "none";
    if (sun) sun.style.display = "inline";
  }
  
  btn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      if (moon) moon.style.display = "inline";
      if (sun) sun.style.display = "none";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      if (moon) moon.style.display = "none";
      if (sun) sun.style.display = "inline";
    }
  });
}

function setupLangToggle() {
  const btn = $("#lang-toggle");
  if (!btn) return;
  
  btn.addEventListener("click", () => {
    const isEn = btn.textContent === "EN";
    if (isEn) {
      btn.textContent = "FR";
      alert("Language switched to French");
    } else {
      btn.textContent = "EN";
      alert("Multilingual support (EN) is a placeholder in this demo.");
    }
  });
}
'''

if 'function setupThemeToggle()' not in content:
    content = content.replace('function setupScrollReveal()', theme_func + '\nfunction setupScrollReveal()')

# 4. Route Projects Page
if 'else if (page === "projects")' not in content:
    content = content.replace('else if (page === "contact") {\n  initContactPage();\n}', 'else if (page === "contact") {\n  initContactPage();\n} else if (page === "projects") {\n  initProjectsPage();\n}')

# 5. Call setupThemeToggle & setupLangToggle
if 'setupThemeToggle();' not in content:
    content = content.replace('setupMobileNav();', 'setupMobileNav();\nsetupThemeToggle();\nsetupLangToggle();')

with open(main_file, 'w', encoding='utf-8') as f:
    f.write(content)
print("main.js updated")
