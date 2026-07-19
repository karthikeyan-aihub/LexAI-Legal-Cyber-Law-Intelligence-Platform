# ⚖️ LexAI – Legal & Cyber Law Intelligence Platform

> **An AI-powered Legal & Cyber Law Intelligence Platform that leverages Retrieval-Augmented Generation (RAG) to provide accurate, explainable, and citation-based answers from trusted legal and cybersecurity documents.**

![Python](https://img.shields.io/badge/Python-3.11+-blue)
![Flask](https://img.shields.io/badge/Flask-3.x-black)
![LangChain](https://img.shields.io/badge/LangChain-RAG-green)
![ChromaDB](https://img.shields.io/badge/VectorDB-ChromaDB-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📖 Overview

LexAI is a Retrieval-Augmented Generation (RAG) platform designed to simplify legal and cyber law research. Instead of relying on general-purpose LLM knowledge, LexAI retrieves relevant information from official legal documents and generates context-aware, explainable responses with proper citations.

The platform is designed to reduce hallucinations by ensuring that responses are grounded in authoritative legal sources.

---

## 🎯 Problem Statement

Understanding legal and cybersecurity regulations is often difficult because:

- Legal documents are lengthy and complex.
- Technical legal language is hard to interpret.
- Searching across multiple Acts and guidelines is time-consuming.
- Generic AI models may generate inaccurate legal information.

---

## 💡 Solution

LexAI provides an intelligent legal assistant that:

- Retrieves relevant legal provisions using semantic search.
- Generates human-friendly explanations using an LLM.
- Cites official legal documents as references.
- Responds only from trusted knowledge sources.

---

## 🚀 Features

### Current (Milestone 1)

- Flask Web Application
- Professional Project Structure
- Responsive User Interface
- Modular Flask Blueprints

### Upcoming

- PDF Document Processing
- Semantic Search
- Embeddings Generation
- ChromaDB Vector Database
- LangChain RAG Pipeline
- Local LLM (Ollama + Llama 3)
- Source Citations
- Chat History
- Document Upload
- Explain in Simple Language
- Multi-document Retrieval
- Voice Interaction
- Multi-language Support

---

## 🏗️ System Architecture

```
User
 │
 ▼
Flask Web Application
 │
 ▼
RAG Pipeline
 │
 ├── Document Loader
 ├── Text Chunking
 ├── Embedding Model
 ├── ChromaDB
 ├── Retriever
 └── LLM
 │
 ▼
Answer with Citations
```

---

## 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- Jinja2

### Backend

- Python
- Flask

### AI & RAG

- LangChain
- Sentence Transformers
- ChromaDB
- Ollama
- Llama 3

### Database

- SQLite

### Development Tools

- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```
LexAI/
│
├── app.py
├── config.py
├── requirements.txt
├── README.md
│
├── routes/
├── templates/
├── static/
├── rag/
├── models/
├── data/
├── uploads/
├── database/
├── chroma_db/
├── logs/
└── tests/
```

---

## 📚 Knowledge Sources

LexAI retrieves information from trusted government publications including:

- Information Technology Act, 2000
- Digital Personal Data Protection Act, 2023
- CERT-In Guidelines
- RBI Cyber Security Guidelines
- Ministry of Electronics & Information Technology (MeitY)

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/LexAI.git

cd LexAI
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

**Windows**

```bash
venv\Scripts\activate
```

**Linux / macOS**

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Run Application

```bash
python app.py
```

Open:

```
http://127.0.0.1:5000
```

---

## 🗺️ Development Roadmap

- ✅ Milestone 1 – Flask Foundation
- ⏳ Milestone 2 – Document Processing
- ⏳ Milestone 3 – Embeddings & Vector Database
- ⏳ Milestone 4 – Retrieval Engine
- ⏳ Milestone 5 – LLM Integration
- ⏳ Milestone 6 – Citation-Based Responses
- ⏳ Milestone 7 – Advanced Features
- ⏳ Milestone 8 – Deployment

---

## 🎓 Learning Objectives

This project demonstrates practical knowledge of:

- Large Language Models (LLMs)
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Databases
- Embeddings
- Prompt Engineering
- Flask Web Development
- AI System Design

---

## 👨‍💻 Author

**Karthikeyan S**

B.E. Computer Science Engineering (AI & ML)

Passionate about Artificial Intelligence, Machine Learning, Generative AI, Computer Vision, and Intelligent Software Systems.

---

## 📄 License

This project is released under the **MIT License**.

---

## ⭐ Acknowledgements

- Flask
- LangChain
- ChromaDB
- Ollama
- Hugging Face
- Meta Llama