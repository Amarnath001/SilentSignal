"""
API client for SilentSignal frontend.

Handles communication with the backend API.
"""

import requests
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)


class APIClient:
    """Client for communicating with SilentSignal API."""
    
    def __init__(self, base_url: str = "http://localhost:8000"):
        """Initialize API client."""
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.session.timeout = 30
    
    def is_connected(self) -> bool:
        """Check if API is accessible."""
        try:
            response = self.session.get(f"{self.base_url}/health")
            return response.status_code == 200
        except Exception as e:
            logger.warning(f"API connection check failed: {e}")
            return False
    
    def analyze_conversation(self, conversation_text: str) -> Dict[str, Any]:
        """Analyze conversation text."""
        try:
            payload = {"conversation": conversation_text}
            response = self.session.post(
                f"{self.base_url}/analyze",
                json=payload
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Analysis request failed: {e}")
            raise
    
    def get_metrics(self) -> Dict[str, Any]:
        """Get system metrics."""
        try:
            response = self.session.get(f"{self.base_url}/status")
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Metrics request failed: {e}")
            raise
    
    def get_resources(self) -> Dict[str, Any]:
        """Get crisis resources."""
        try:
            response = self.session.get(f"{self.base_url}/resources")
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Resources request failed: {e}")
            raise

