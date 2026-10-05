import os

DIR = "c:/Users/Zaid/Desktop/profile"
content_path = os.path.join(DIR, "src/data/content.js")

projects_data = """
export const projects = [
  {
    title: "Pipeline RAG - Assistant IA Documentaire",
    description: "Système de Question/Réponse autonome basé sur Llama 3 et LangChain, interrogeant une base documentaire interne via une base vectorielle Pinecone.",
    tags: ["Python", "LangChain", "Pinecone", "LLMs"],
    link: "https://github.com/zaidbouchiar",
    demo: "#"
  },
  {
    title: "Plateforme de Prédiction Churn",
    description: "Application bout-en-bout permettant aux équipes marketing d'anticiper le désabonnement des clients. Modèles de Machine Learning (XGBoost) déployés via FastAPI.",
    tags: ["Machine Learning", "FastAPI", "React", "Docker"],
    link: "https://github.com/zaidbouchiar",
    demo: "#"
  },
  {
    title: "Orchestration Data avec Apache Airflow",
    description: "Création d'un pipeline automatisé d'ingestion et de nettoyage de données massives (ETL), stockées dans un Data Warehouse.",
    tags: ["Airflow", "SQL", "Spark", "Data Engineering"],
    link: "https://github.com/zaidbouchiar",
    demo: "#"
  }
];
"""

with open(content_path, "a", encoding="utf-8") as f:
    f.write("\n" + projects_data)

print("content.js updated.")
