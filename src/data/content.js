/**
 * Fichier central des données du portfolio de Zaid Bouchiar.
 *
 * Photo       → public/images/profile.jpg
 * CV          → public/documents/cv/cv-zaid-bouchiar.pdf
 * Certificats → public/documents/certificats/
 */

import { skillsCategories } from "./skillsData.js";

export { skillsCategories };

export const profile = {
  fullName: "Zaid Bouchiar",
  shortName: "ZB",
  title: "Élève ingénieur en informatique — Spécialité IA & Data Science",
  school: "École Marocaine des Sciences de l'Ingénieur (EMSI) — Rabat",
  status: "À la recherche d'un stage de fin d'études (PFE)",
  photo: "/images/profile.jpg",
  email: "zaidbouchiar1@gmail.com",
  phone: "+212 643-697752",
  phoneHref: "tel:+212643697752",
  city: "Temara",
  country: "Maroc",
  linkedin: "https://www.linkedin.com/in/zaid-bouchiar-9b8200297",
  linkedinLabel: "linkedin.com/in/zaid-bouchiar-9b8200297",
  shortBio:
    "Étudiant en 3ᵉ année du cycle d’ingénieur en Informatique à l'EMSI Rabat, spécialisé en Intelligence Artificielle et Data Science. Passionné par l'apprentissage automatique, les systèmes RAG, le traitement des données et le génie logiciel, je suis activement à la recherche d’un stage de fin d’études (PFE) pour concevoir et déployer des solutions intelligentes à fort impact.",
  objective:
    "Recherche d’un stage de fin d’études (PFE) afin de mettre mes compétences en Intelligence Artificielle, Data Science et développement au service de projets concrets et innovants.",
  specialization:
    "Ingénierie Informatique et Réseaux — Spécialité Intelligence Artificielle & Data Science",
  education: [
    {
      school: "École Marocaine des Sciences de l’Ingénieur (EMSI) — Rabat",
      period: "2022 – Aujourd’hui",
      degree: "Diplôme d'Ingénieur d'État en Informatique",
      specialty: "Spécialité Intelligence Artificielle & Data Science",
      detail:
        "Formation approfondie : Machine Learning, Deep Learning, Architectures logicielles, Systèmes RAG, Traitement distribué des données, Conception d'APIs et DevOps.",
    },
    {
      school: "Classes Préparatoires aux cycles d’ingénieurs — EMSI — Rabat",
      period: "2022 – 2024",
      degree: "Classes Préparatoires Intégrées",
      specialty: "Mathématiques appliquées, Physique & Algorithmique",
      detail:
        "Formation scientifique intensive : calcul différentiel, algèbre linéaire, probabilités, statistiques, algorithmique avancée et programmation structurée.",
    },
    {
      school: "Lycée Salah Eddine Ayoubi — Temara",
      period: "2021 – 2022",
      degree: "Baccalauréat Scientifique",
      specialty: "Série Sciences Physiques et Chimiques",
      detail: "Diplôme d'études secondaires avec mention.",
    },
  ],
  languages: [
    { name: "Arabe", level: "Langue maternelle" },
    { name: "Français", level: "Courant / Professionnel" },
    { name: "Anglais", level: "Intermédiaire / Technique" },
  ],
  strengths: [
    {
      title: "Intelligence Artificielle & RAG",
      desc: "Conception de pipelines RAG, intégration de modèles LLM, embeddings vectoriels et agents autonomes.",
    },
    {
      title: "Data Pipelines & DevOps",
      desc: "Traitement de flux avec Spark, orchestration via Airflow, conteneurisation Docker et stockage distribué.",
    },
    {
      title: "Développement Backend & Web",
      desc: "Architecture d'APIs REST modulaires et robustes (FastAPI, Django, .NET Core) et interfaces modernes en React.",
    },
    {
      title: "Rigueur Scientifique & Méthodes",
      desc: "Bases solides en mathématiques et algorithmique issues des classes préparatoires, pratique des méthodes agiles Scrum.",
    },
  ],
  skills: skillsCategories.map((cat) => ({
    group: cat.title,
    items: cat.skills.map((s) => s.name),
  })),
};

export const cv = {
  name: "CV — Zaid Bouchiar",
  file: "/documents/cv/cv-zaid-bouchiar.pdf",
  downloadName: "CV_Zaid_Bouchiar.pdf",
};

export const certificates = [
  {
    id: "java-25",
    name: "Oracle Certified Professional: Java SE 25 Developer",
    organization: "Oracle",
    date: "16 juillet 2026",
    domain: "Programmation",
    file: "/documents/certificats/java-se-25-developer.pdf",
  },
  {
    id: "big-data",
    name: "Introduction to Big Data",
    organization: "University of California San Diego — Coursera",
    date: "8 mai 2026",
    domain: "Data & IA",
    file: "/documents/certificats/introduction-to-big-data.pdf",
  },
  {
    id: "agile",
    name: "Agile Project Management",
    organization: "Google — Coursera",
    date: "5 mai 2026",
    domain: "Méthodologie",
    file: "/documents/certificats/agile-project-management.pdf",
  },
  {
    id: "react-basics",
    name: "React Basics",
    organization: "Meta — Coursera",
    date: "20 décembre 2025",
    domain: "Frontend",
    file: "/documents/certificats/react-basics.pdf",
  },
  {
    id: "react-native",
    name: "React Native",
    organization: "Meta — Coursera",
    date: "20 décembre 2025",
    domain: "Mobile",
    file: "/documents/certificats/react-native.pdf",
  },
  {
    id: "python-ds",
    name: "Python for Data Science, AI & Development",
    organization: "IBM — Coursera",
    date: "25 avril 2025",
    domain: "Data & IA",
    file: "/documents/certificats/python-for-data-science-ai-development.pdf",
  },
  {
    id: "recherche",
    name: "La recherche documentaire",
    organization: "École Polytechnique — Coursera",
    date: "25 avril 2025",
    domain: "Recherche",
    file: "/documents/certificats/la-recherche-documentaire.pdf",
  },
  {
    id: "software-eng",
    name: "Software Engineering: Software Design and Project Management",
    organization: "The Hong Kong University of Science and Technology — Coursera",
    date: "23 avril 2025",
    domain: "Génie Logiciel",
    file: "/documents/certificats/software-engineering-design-project-management.pdf",
  },
  {
    id: "unix",
    name: "The Unix Workbench",
    organization: "Johns Hopkins University — Coursera",
    date: "14 décembre 2024",
    domain: "Systèmes / DevOps",
    file: "/documents/certificats/the-unix-workbench.pdf",
  },
  {
    id: "poo-cpp",
    name: "Introduction à la programmation orientée objet (en C++)",
    organization: "École Polytechnique Fédérale de Lausanne — Coursera",
    date: "9 décembre 2024",
    domain: "Programmation",
    file: "/documents/certificats/introduction-poo-cpp.pdf",
  },
  {
    id: "javascript",
    name: "Interactivity with JavaScript",
    organization: "University of Michigan — Coursera",
    date: "22 novembre 2024",
    domain: "Frontend",
    file: "/documents/certificats/interactivity-with-javascript.pdf",
  },
];


export const projects = [
  {
    id: "smart-hospital-flow-ai",
    title: "Smart Hospital Flow AI",
    description:
      "Plateforme d’aide à la décision (PFE) pour l’Hôpital des Enfants : les rapports CSV du SIH sont transformés en tableaux de bord, score de saturation par service, alertes, prédictions de flux et simulations what-if. Toute la chaîne (ingestion, nettoyage, anonymisation IPP, KPI, ML) s’exécute côté navigateur, sans backend.",
    highlights: [
      "7 fichiers CSV du SIH (urgences, hospitalisations, mouvements, sortants, indicateurs)",
      "Score de saturation 0–100 par service (normal / tension / saturation)",
      "21 interfaces : dashboard, pipeline Data Science, prédictions IA, rapports",
    ],
    techs: ["React", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "PapaParse"],
    githubUrl: "",
    demoUrl: "",
    image: "/images/projects/hospital-dashboard.png",
    gallery: [
      { src: "/images/projects/hospital-dashboard.png", alt: "Tableau de bord — indicateurs hospitaliers" },
      { src: "/images/projects/hospital-login.png", alt: "Écran de connexion" },
      { src: "/images/projects/hospital-saturation.png", alt: "Score de saturation par service" },
      { src: "/images/projects/hospital-predictions.png", alt: "Prédictions IA des flux" },
    ],
  },
  {
    id: "emotion-detection",
    title: "Détection d’émotions faciales",
    description:
      "Application desktop Python qui détecte un visage en webcam (OpenCV Haar Cascade) et classifie 7 émotions en temps réel avec un CNN Keras : angry, disgust, fear, happy, neutral, sad, surprise. Interface Tkinter pour lancer / arrêter le flux, prétraitement 48×48 en niveaux de gris et affichage de la classe avec le score de confiance.",
    highlights: [
      "CNN 3 couches Conv2D + Dense, entraîné 20 époques sur un dataset train/test",
      "Détection webcam robuste sous Windows (plusieurs backends / index caméra)",
      "CLAHE et ajustement auto de luminosité pour stabiliser la détection",
    ],
    techs: ["Python", "TensorFlow / Keras", "OpenCV", "Tkinter", "NumPy"],
    githubUrl: "",
    demoUrl: "",
    image: "/images/projects/emotion-webcam-ui.jpg",
    gallery: [
      { src: "/images/projects/emotion-webcam-ui.jpg", alt: "Interface webcam — émotion angry détectée" },
      { src: "/images/projects/emotion-sample.png", alt: "Exemple de visage classifié (dataset)" },
    ],
  },
];
