"""
Configuration settings for SilentSignal.

Centralized configuration management using environment variables.
"""

import os
from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""
    
    # Application
    app_name: str = "SilentSignal"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # NVIDIA NIM Configuration
    nim_base_url: str = "https://integrate.api.nvidia.com/v1"
    nim_api_key: Optional[str] = None
    nim_model: str = "nvidia/nvidia-nemotron-nano-9b-v2"
    nim_use_openai_sdk: bool = True
    nim_reasoning_min: int = 1024
    nim_reasoning_max: int = 2048
    
    # Twilio Configuration
    twilio_account_sid: Optional[str] = None
    twilio_auth_token: Optional[str] = None
    
    # SilentSignal Configuration
    allow_persist: bool = False
    max_conversation_length: int = 10000
    analysis_timeout: int = 30
    
    # Email Configuration
    email_alerts: bool = False
    email_method: str = "gmail"
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_user: Optional[str] = None
    smtp_pass: Optional[str] = None
    email_from: Optional[str] = None
    email_to: Optional[str] = None
    alert_min_interval_seconds: int = 60
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_reload: bool = False
    
    # Frontend Configuration
    frontend_port: int = 8501
    
    class Config:
        env_file = ".env"
        case_sensitive = False
        extra = "ignore"  # Ignore extra environment variables


# Global settings instance
settings = Settings()
