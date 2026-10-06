export function getLang() {
  try {
    return localStorage.getItem("lang") === "en" ? "en" : "fr";
  } catch {
    return "fr";
  }
}

export const ui = {
  fr: {
    skip: "Aller au contenu principal",
    navHome: "Accueil",
    navAbout: "À propos",
    navProjects: "Projets",
    navSkills: "Compétences",
    navCv: "CV",
    navCerts: "Certificats",
    navContact: "Contact",
    contactCta: "Me contacter",
    themeDark: "Activer le mode sombre",
    themeLight: "Activer le mode clair",
    langSwitch: "Switch to English",
    footerCopy: "Élève Ingénieur en Informatique — EMSI Rabat.",
    backToTop: "Remonter en haut de la page",
    homeEyebrow: "Navigation directe",
    homeExplore: "Explorez mon profil par section",
    homeLead:
      "Chaque section est accessible indépendamment pour une consultation ciblée de mes compétences, de mon parcours et de mes documents officiels.",
    homeSkillsTitle: "Compétences Techniques",
    homeSkillsText:
      "40 technologies, frameworks et architectures maîtrisés (IA, LangChain, Python, Backend, Data Pipelines) avec logos HD.",
    homeSkillsLink: "Explorer la stack →",
    homeCvTitle: "Mon Curriculum Vitae",
    homeCvText:
      "Consultez mon CV officiel directement en ligne via visionneuse haute résolution intégrée ou téléchargez le PDF.",
    homeCvLink: "Consulter le CV →",
    homeCertTitle: "Certifications Coursera",
    homeCertText:
      "10 certifications académiques et industrielles obtenues auprès d'UC San Diego, Google, Meta, IBM, Johns Hopkins.",
    homeCertLink: "Voir les 10 certificats →",
    homeAboutTitle: "À propos & Parcours",
    homeAboutText:
      "Classes préparatoires, cycle d'ingénieur à l'EMSI Rabat, vision technologique et atouts méthodologiques.",
    homeAboutLink: "Lire ma présentation →",
    homeSkillsBtn: "Voir mes compétences",
    homeCvBtn: "Consulter mon CV",
    homeCertsBtn: "10 Certificats",
    badgeYear: "Année Ingénieur",
    badgeSchool: "EMSI Rabat (IA & Data)",
    badgePfe: "Stage PFE",
    badgeAvail: "Disponibilité immédiate",
    aboutEyebrow: "Profil & Trajectoire",
    aboutTitle: "À propos de moi & Parcours",
    aboutLead:
      "Élève ingénieur en dernière année à l'EMSI Rabat. Découvrez mes fondements scientifiques, mon parcours académique et mon engagement en Intelligence Artificielle & Data Science.",
    aboutHeading: "Présentation & Ambitions",
    aboutNarrative:
      "Mon cursus m'a permis d'acquérir une double compétence : la rigueur de modélisation mathématique et algorithmique développée en classes préparatoires, complétée par une expertise pratique en ingénierie logicielle et Intelligence Artificielle à l'EMSI Rabat.",
    aboutObjective: "Objectif",
    aboutName: "Nom complet",
    aboutSchool: "Établissement",
    aboutSpec: "Spécialisation",
    aboutLocation: "Localisation",
    aboutLangs: "Langues maîtrisées",
    aboutEdu: "Parcours académique",
    aboutStrengths: "Domaines d'impact & Atouts",
    skillsEyebrow: "Expertise & Outils",
    skillsTitle: "Compétences Techniques & Stack",
    skillsLead:
      "Panorama exhaustif des 40 technologies, langages, frameworks et architectures maîtrisés. Chaque technologie est accompagnée de son logo officiel en haute définition.",
    skillsSearch: "Rechercher une compétence (ex: Python, Java, Docker, React, LangChain...)",
    skillsAll: "Toutes",
    skillsLangs: "Langages",
    skillsEmpty: "Aucune compétence trouvée pour",
    skillsFiltered: "Compétence filtrée",
    cvEyebrow: "Document Officiel",
    cvTitle: "Curriculum Vitae",
    cvLead:
      "Consultez mon CV complet ci-dessous grâce à la visionneuse haute fidélité intégrée, ou téléchargez le document au format PDF.",
    cvMeta:
      "Document officiel au format PDF haute résolution. Disponible pour stage PFE (Fin d'études).",
    cvDownload: "Télécharger le PDF",
    cvFullscreen: "Plein écran",
    cvUnavailable: "Aperçu du document indisponible",
    pdfLoading: "Chargement du PDF...",
    certsEyebrow: "Formations Certifiées",
    certsTitle: "Certifications Officielles (10)",
    certsLead:
      "Certificats vérifiés obtenus via Coursera auprès d'institutions d'excellence (UC San Diego, Google, Meta, IBM, École Polytechnique, Johns Hopkins). Cliquez sur une carte pour lire ou télécharger le document.",
    certAll: "Tous",
    certView: "Consulter",
    certDownload: "Télécharger",
    contactEyebrow: "Prise de contact",
    contactTitle: "Me Contacter",
    contactLead:
      "Vous recherchez un stagiaire PFE passionné et opérationnel en Intelligence Artificielle et Data Science ? Échangeons sur vos projets et besoins techniques.",
    contactEmail: "Adresse Email",
    contactPhone: "Numéro de Téléphone",
    contactLoc: "Localisation",
    contactLinkedin: "LinkedIn Professionnel",
    contactFormTitle: "Envoyer un message",
    formName: "Nom complet",
    formNamePh: "Votre nom",
    formEmail: "Adresse email",
    formEmailPh: "nom@entreprise.com",
    formSubject: "Sujet de l'échange",
    formSubjectPh: "Proposition de stage PFE, échange technique...",
    formMessage: "Votre message",
    formMessagePh: "Décrivez votre opportunité ou votre message...",
    formSend: "Envoyer le message",
    formSending: "Envoi en cours...",
    formThanks: "Merci {name} ! Votre message a été envoyé avec succès.",
    formError: "Oups ! Il y a eu un problème lors de l'envoi de votre message. Veuillez réessayer plus tard.",
    copied: "Copié",
    projectsEyebrow: "Portfolio",
    projectsTitle: "Mes Projets & Réalisations",
    projectsLead:
      "Découvrez une sélection de mes projets en Intelligence Artificielle, Data Science et Développement Logiciel.",
    projectsEmpty: "Aucun projet à afficher pour le moment.",
    typewriter: [
      "Élève Ingénieur en Informatique — EMSI Rabat",
      "Spécialiste en Intelligence Artificielle & Data Science",
      "Architectures RAG & Modèles LLM (LangChain, Ollama)",
      "Développeur Full-Stack (FastAPI, React, .NET Core)",
      "À la recherche d'un stage de fin d'études (PFE)",
    ],
  },
  en: {
    skip: "Skip to main content",
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navSkills: "Skills",
    navCv: "Resume",
    navCerts: "Certificates",
    navContact: "Contact",
    contactCta: "Contact me",
    themeDark: "Enable dark mode",
    themeLight: "Enable light mode",
    langSwitch: "Passer en français",
    footerCopy: "Computer Engineering student — EMSI Rabat.",
    backToTop: "Back to top",
    homeEyebrow: "Direct navigation",
    homeExplore: "Explore my profile by section",
    homeLead:
      "Each section is available on its own so you can quickly review my skills, background, and official documents.",
    homeSkillsTitle: "Technical Skills",
    homeSkillsText:
      "40 technologies, frameworks and architectures (AI, LangChain, Python, Backend, Data Pipelines) with HD logos.",
    homeSkillsLink: "Explore the stack →",
    homeCvTitle: "My Resume",
    homeCvText:
      "View my official resume online in the built-in high-resolution viewer, or download the PDF.",
    homeCvLink: "View resume →",
    homeCertTitle: "Coursera Certificates",
    homeCertText:
      "10 academic and industry certificates from UC San Diego, Google, Meta, IBM, and Johns Hopkins.",
    homeCertLink: "See the 10 certificates →",
    homeAboutTitle: "About & Background",
    homeAboutText:
      "Preparatory classes, engineering cycle at EMSI Rabat, technical vision and methodological strengths.",
    homeAboutLink: "Read my introduction →",
    homeSkillsBtn: "View my skills",
    homeCvBtn: "View my resume",
    homeCertsBtn: "10 Certificates",
    badgeYear: "Engineering Year",
    badgeSchool: "EMSI Rabat (AI & Data)",
    badgePfe: "Final-year internship",
    badgeAvail: "Available immediately",
    aboutEyebrow: "Profile & Path",
    aboutTitle: "About me & Background",
    aboutLead:
      "Final-year engineering student at EMSI Rabat. Discover my scientific foundations, academic path, and commitment to Artificial Intelligence & Data Science.",
    aboutHeading: "Introduction & Ambitions",
    aboutNarrative:
      "My background gave me a dual skill set: the mathematical and algorithmic rigor of preparatory classes, completed by practical expertise in software engineering and Artificial Intelligence at EMSI Rabat.",
    aboutObjective: "Goal",
    aboutName: "Full name",
    aboutSchool: "School",
    aboutSpec: "Specialization",
    aboutLocation: "Location",
    aboutLangs: "Languages",
    aboutEdu: "Academic path",
    aboutStrengths: "Impact areas & Strengths",
    skillsEyebrow: "Expertise & Tools",
    skillsTitle: "Technical Skills & Stack",
    skillsLead:
      "A complete overview of 40 technologies, languages, frameworks and architectures. Each one includes its official high-definition logo.",
    skillsSearch: "Search a skill (e.g. Python, Java, Docker, React, LangChain...)",
    skillsAll: "All",
    skillsLangs: "Languages",
    skillsEmpty: "No skill found for",
    skillsFiltered: "Filtered skill",
    cvEyebrow: "Official document",
    cvTitle: "Resume",
    cvLead:
      "View my full resume below with the built-in high-fidelity viewer, or download the PDF.",
    cvMeta:
      "Official high-resolution PDF. Available for a final-year internship (PFE).",
    cvDownload: "Download PDF",
    cvFullscreen: "Fullscreen",
    cvUnavailable: "Document preview unavailable",
    pdfLoading: "Loading PDF...",
    certsEyebrow: "Certified training",
    certsTitle: "Official Certificates (10)",
    certsLead:
      "Verified Coursera certificates from institutions such as UC San Diego, Google, Meta, IBM, École Polytechnique, and Johns Hopkins. Click a card to view or download.",
    certAll: "All",
    certView: "View",
    certDownload: "Download",
    contactEyebrow: "Get in touch",
    contactTitle: "Contact me",
    contactLead:
      "Looking for a motivated, operational final-year intern in Artificial Intelligence and Data Science? Let's talk about your projects and technical needs.",
    contactEmail: "Email address",
    contactPhone: "Phone number",
    contactLoc: "Location",
    contactLinkedin: "Professional LinkedIn",
    contactFormTitle: "Send a message",
    formName: "Full name",
    formNamePh: "Your name",
    formEmail: "Email address",
    formEmailPh: "name@company.com",
    formSubject: "Subject",
    formSubjectPh: "Internship proposal, technical discussion...",
    formMessage: "Your message",
    formMessagePh: "Describe your opportunity or message...",
    formSend: "Send message",
    formSending: "Sending...",
    formThanks: "Thank you {name}! Your message was sent successfully.",
    formError: "Oops! There was a problem sending your message. Please try again later.",
    copied: "Copied",
    projectsEyebrow: "Portfolio",
    projectsTitle: "Projects & Work",
    projectsLead:
      "A selection of my projects in Artificial Intelligence, Data Science, and Software Development.",
    projectsEmpty: "No projects to display yet.",
    typewriter: [
      "Computer Engineering student — EMSI Rabat",
      "Specialist in Artificial Intelligence & Data Science",
      "RAG architectures & LLM models (LangChain, Ollama)",
      "Full-stack developer (FastAPI, React, .NET Core)",
      "Looking for a final-year internship (PFE)",
    ],
  },
};

export const profileEn = {
  title: "Computer engineering student — AI & Data Science specialization",
  status: "Looking for a final-year internship (PFE)",
  shortBio:
    "Third-year Computer Engineering student at EMSI Rabat, specializing in Artificial Intelligence and Data Science. Passionate about machine learning, RAG systems, data processing and software engineering, I am actively looking for a final-year internship (PFE) to design and deploy high-impact intelligent solutions.",
  objective:
    "Looking for a final-year internship (PFE) to apply my skills in Artificial Intelligence, Data Science and development on concrete, innovative projects.",
  education: [
    {
      school: "Moroccan School of Engineering Sciences (EMSI) — Rabat",
      period: "2022 – Present",
      degree: "State Engineering Degree in Computer Science",
      specialty: "Artificial Intelligence & Data Science specialization",
      detail:
        "In-depth training: Machine Learning, Deep Learning, software architectures, RAG systems, distributed data processing, API design and DevOps.",
    },
    {
      school: "Preparatory classes for engineering cycles — EMSI — Rabat",
      period: "2022 – 2024",
      degree: "Integrated preparatory classes",
      specialty: "Applied mathematics, Physics & Algorithms",
      detail:
        "Intensive scientific training: differential calculus, linear algebra, probability, statistics, advanced algorithms and structured programming.",
    },
    {
      school: "Lycée Salah Eddine Ayoubi — Temara",
      period: "2021 – 2022",
      degree: "Scientific Baccalaureate",
      specialty: "Physical and Chemical Sciences",
      detail: "Secondary school diploma with distinction.",
    },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Fluent / Professional" },
    { name: "English", level: "Intermediate / Technical" },
  ],
  strengths: [
    {
      title: "Artificial Intelligence & RAG",
      desc: "Design of RAG pipelines, LLM integration, vector embeddings and autonomous agents.",
    },
    {
      title: "Data Pipelines & DevOps",
      desc: "Stream processing with Spark, orchestration with Airflow, Docker containerization and distributed storage.",
    },
    {
      title: "Backend & Web Development",
      desc: "Modular, robust REST APIs (FastAPI, Django, .NET Core) and modern React interfaces.",
    },
    {
      title: "Scientific rigor & methods",
      desc: "Strong foundations in mathematics and algorithms from preparatory classes, and Agile Scrum practice.",
    },
  ],
};

export const projectsEn = [
  {
    title: "Smart Hospital Flow AI",
    description:
      "Decision-support platform (final-year project) for a pediatric hospital: SIH CSV reports become dashboards, per-ward saturation scores, alerts, flow forecasts and what-if simulations. The full pipeline (ingestion, cleaning, patient ID anonymization, KPIs, ML) runs in the browser, with no backend.",
    highlights: [
      "7 SIH CSV files (ER admissions, hospitalizations, movements, discharges, ward indicators)",
      "Saturation score 0–100 per ward (normal / strain / saturation)",
      "21 screens: dashboard, data-science pipeline, AI forecasts, reports",
    ],
  },
  {
    title: "Facial Emotion Detection",
    description:
      "Python desktop app that detects a face from the webcam (OpenCV Haar Cascade) and classifies 7 emotions in real time with a Keras CNN: angry, disgust, fear, happy, neutral, sad, surprise. Tkinter UI to start/stop the stream, 48×48 grayscale preprocessing, and live class + confidence display.",
    highlights: [
      "3-layer Conv2D + Dense CNN, trained for 20 epochs on a train/test dataset",
      "Robust webcam capture on Windows (multiple backends and camera indexes)",
      "CLAHE and auto brightness adjustment to stabilize face detection",
    ],
  },
];

export const certDomainEn = {
  Tous: "All",
  "Data & IA": "Data & AI",
  Méthodologie: "Methodology",
  Frontend: "Frontend",
  Mobile: "Mobile",
  Recherche: "Research",
  "Génie Logiciel": "Software Engineering",
  "Systèmes / DevOps": "Systems / DevOps",
  Programmation: "Programming",
};
