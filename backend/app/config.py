import os
from typing import Optional
from pydantic import model_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "MEDCLARE"
    SECRET_KEY: str = "change-me-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480
    DATABASE_URL: Optional[str] = None
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
    OPENROUTER_API_KEY: Optional[str] = None
    OPENROUTER_MODEL: str = "google/gemini-2.0-flash-001"
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"
    CHROMA_PERSIST_DIR: str = os.path.join(os.path.dirname(os.path.dirname(__file__)), "chroma_db")

    @model_validator(mode='after')
    def set_db_url(self):
        if not self.DATABASE_URL:
            # Default to local sqlite db in backend root
            root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            self.DATABASE_URL = f"sqlite:///{os.path.join(root, 'medclare.db')}"
        return self

    class Config:
        env_file = ".env"

settings = Settings()
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.CHROMA_PERSIST_DIR, exist_ok=True)
