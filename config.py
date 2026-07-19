import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()


class Config:
    """Base configuration for LexAI"""

    # ==========================
    # Flask Configuration
    # ==========================
    SECRET_KEY = os.getenv("SECRET_KEY", "LexAI@2026#9f7c4b1e2d8a5f6g")
    DEBUG = os.getenv("FLASK_DEBUG", "True").lower() == "true"

    # ==========================
    # Project Directories
    # ==========================
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))

    DATA_DIR = os.path.join(BASE_DIR, "data")
    RAW_DATA_DIR = os.path.join(DATA_DIR, "raw")
    PROCESSED_DATA_DIR = os.path.join(DATA_DIR, "processed")

    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
    CHROMA_DB_DIR = os.path.join(BASE_DIR, "chroma_db")
    DATABASE_DIR = os.path.join(BASE_DIR, "database")
    LOG_DIR = os.path.join(BASE_DIR, "logs")

    # ==========================
    # Database
    # ==========================
    SQLITE_DB = os.path.join(DATABASE_DIR, "chat_history.db")

    # ==========================
    # File Upload
    # ==========================
    MAX_CONTENT_LENGTH = 20 * 1024 * 1024  # 20 MB

    ALLOWED_EXTENSIONS = {
        "pdf",
        "txt",
        "docx"
    }

    # ==========================
    # RAG Configuration
    # ==========================
    CHUNK_SIZE = 1000
    CHUNK_OVERLAP = 200

    EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

    VECTOR_DB = "chromadb"

    TOP_K_RESULTS = 5

    # ==========================
    # Groq Configuration
    # ==========================
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")

    LLM_MODEL = os.getenv(
        "LLM_MODEL",
        "llama-3.1-8b-instant"
    )

    # ==========================
    # Google Gemini (Optional)
    # ==========================
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

    # ==========================
    # Application
    # ==========================
    APP_NAME = "LexAI"

    APP_VERSION = "1.0.0"

    COMPANY = "LexAI AI Research"

    COPYRIGHT = "© 2026 LexAI. All Rights Reserved."