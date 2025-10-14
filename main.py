"""
SilentSignal - Main Entry Point

Production-quality entry point for the SilentSignal application.
"""

import sys
import os
import argparse
import logging

# Add the project root to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from silent_signal.config.settings import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO if not settings.debug else logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)


def run_frontend():
    """Run the React frontend."""
    try:
        import subprocess
        
        logger.info("Starting React frontend...")
        logger.info("Please run 'make run-frontend' or 'cd frontend-react && npm run dev' to start the React frontend")
        logger.info("React frontend will be available at http://localhost:5173")
        
    except Exception as e:
        logger.error(f"Failed to start frontend: {e}")
        sys.exit(1)


def run_backend():
    """Run the FastAPI backend."""
    try:
        import uvicorn
        
        logger.info(f"Starting FastAPI backend on {settings.api_host}:{settings.api_port}")
        uvicorn.run(
            "silent_signal.backend.api.main:app",
            host=settings.api_host,
            port=settings.api_port,
            reload=settings.api_reload,
            log_level="info" if not settings.debug else "debug"
        )
        
    except Exception as e:
        logger.error(f"Failed to start backend: {e}")
        sys.exit(1)


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="SilentSignal - AI Emotional Abuse Detection System"
    )
    
    parser.add_argument(
        "service",
        choices=["frontend", "backend", "both"],
        help="Service to run: frontend, backend, or both"
    )
    
    parser.add_argument(
        "--version",
        action="version",
        version=f"SilentSignal {settings.app_version}"
    )
    
    args = parser.parse_args()
    
    logger.info(f"Starting SilentSignal {settings.app_version}")
    logger.info(f"Debug mode: {settings.debug}")
    
    if args.service == "frontend":
        run_frontend()
    elif args.service == "backend":
        run_backend()
    elif args.service == "both":
        logger.info("Running both frontend and backend")
        logger.info("Please run 'make run-both' to start both services")
        # For simplicity, just run backend (React frontend should be started separately)
        run_backend()


if __name__ == "__main__":
    main()
