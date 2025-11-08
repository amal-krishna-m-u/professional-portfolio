from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str
    
    # JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:5173"
    
    # SendGrid
    SENDGRID_API_KEY: str = ""
    FROM_EMAIL: str = ""
    TO_EMAIL: str = ""
    
    # Azure
    AZURE_STORAGE_CONNECTION_STRING: str = ""
    AZURE_STORAGE_CONTAINER_IMAGES: str = "images"
    AZURE_STORAGE_CONTAINER_RESUME: str = "resume"
    
    # Application
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()