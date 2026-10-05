import re
import sys

content_file = 'src/data/content.js'

with open(content_file, 'r', encoding='utf-8') as f:
    content = f.read()

projects_data = '''

export const projects = [
  {
    id: "rag-pipeline",
    title: "Pipeline RAG Avancé (LLM)",
    description: "Conception d'un système de Question/Réponse sur documents internes utilisant LangChain, Ollama et ChromaDB.",
    techs: ["Python", "LangChain", "Ollama", "ChromaDB", "FastAPI"],
    githubUrl: "https://github.com/zaidbch/rag-pipeline",
    demoUrl: "",
    image: ""
  },
  {
    id: "data-pipeline",
    title: "Pipeline de Données & Analytics",
    description: "Mise en place d'un pipeline ETL distribué pour le traitement de gros volumes de données. Orchestration avec Airflow.",
    techs: ["Apache Spark", "Airflow", "Docker", "PostgreSQL"],
    githubUrl: "https://github.com/zaidbch/data-pipeline",
    demoUrl: "",
    image: ""
  },
  {
    id: "smart-api",
    title: "API de Prédiction Machine Learning",
    description: "Développement d'une API REST robuste permettant d'exécuter des prédictions en temps réel basées sur un modèle de ML.",
    techs: ["FastAPI", "Scikit-Learn", "Pandas", "Docker"],
    githubUrl: "https://github.com/zaidbch/ml-prediction-api",
    demoUrl: "",
    image: ""
  }
];
'''

if "export const projects" not in content:
    with open(content_file, 'a', encoding='utf-8') as f:
        f.write(projects_data)
        print("Projects added to content.js")
else:
    print("Projects already exist in content.js")
