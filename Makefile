# SilentSignal Production Makefile
# Comprehensive build and deployment automation

.PHONY: help install setup run-frontend run-backend run-both test clean lint format check-imports

# Default target
help: ## Show this help message
	@echo "SilentSignal - AI Emotional Abuse Detection System"
	@echo "=================================================="
	@echo ""
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Installation and Setup
install: ## Install dependencies
	pip install -r requirements_new.txt

setup: ## Complete setup (install + configure)
	@echo "Setting up SilentSignal..."
	@if [ ! -f .env ]; then \
		echo "Creating .env file from template..."; \
		cp env_example.txt .env; \
		echo "Please edit .env file with your configuration"; \
	fi
	pip install -r requirements_new.txt
	@echo "Setup complete!"

# Development
run-frontend: ## Run React frontend
	cd frontend-react && npm run dev

run-backend: ## Run FastAPI backend
	python3 main.py backend

run-both: ## Run both backend and React frontend
	python3 main.py backend &
	cd frontend-react && npm run dev

# React Frontend
install-react: ## Install React frontend dependencies
	cd frontend-react && npm install

build-react: ## Build React frontend for production
	cd frontend-react && npm run build

preview-react: ## Preview React frontend production build
	cd frontend-react && npm run preview

lint-react: ## Lint React frontend code
	cd frontend-react && npm run lint

# Testing
test: ## Run all tests
	python -m pytest tests/ -v --cov=silent_signal --cov-report=html

test-backend: ## Run backend tests only
	python -m pytest tests/backend/ -v

test-frontend: ## Run frontend tests only
	python -m pytest tests/frontend/ -v

# Code Quality
lint: ## Run linting
	flake8 silent_signal/ --max-line-length=100 --ignore=E203,W503
	mypy silent_signal/ --ignore-missing-imports

format: ## Format code
	black silent_signal/ --line-length=100
	isort silent_signal/ --profile=black

check-imports: ## Check import organization
	isort silent_signal/ --check-only --profile=black

# Data Management
copy-data: ## Copy data files to new structure
	@echo "Copying data files..."
	@mkdir -p silent_signal/data
	@if [ -f data/pattern_knowledge.json ]; then cp data/pattern_knowledge.json silent_signal/data/; fi
	@if [ -f data/resources.json ]; then cp data/resources.json silent_signal/data/; fi
	@if [ -f resources.json ]; then cp resources.json silent_signal/data/; fi
	@echo "Data files copied successfully!"

# Production
build: ## Build production package
	@echo "Building SilentSignal package..."
	python -m build

deploy: ## Deploy to production (requires configuration)
	@echo "Deploying SilentSignal..."
	@echo "Please configure your deployment settings"

# Docker (optional)
docker-build: ## Build Docker image
	docker build -t silent-signal:latest .

docker-run: ## Run with Docker
	docker run -p 8000:8000 -p 8501:8501 silent-signal:latest

# Cleanup
clean: ## Clean up temporary files
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +
	rm -rf build/ dist/ .coverage htmlcov/ .pytest_cache/

clean-all: clean ## Clean everything including logs and data
	rm -rf logs/ *.log
	@echo "Cleanup complete!"

# Migration from old structure
migrate: copy-data ## Migrate from old structure to new
	@echo "Migrating SilentSignal to production structure..."
	@echo "This will copy data files and prepare the new structure"
	@echo "Migration complete!"

# Health checks
health: ## Check service health
	@echo "Checking SilentSignal health..."
	@curl -s http://localhost:8000/health || echo "Backend not running"
	@curl -s http://localhost:8501 || echo "Frontend not running"

# Documentation
docs: ## Generate documentation
	@echo "Generating documentation..."
	@echo "Documentation generation not implemented yet"

# Security
security-check: ## Run security checks
	@echo "Running security checks..."
	bandit -r silent_signal/ -f json -o security-report.json || true
	@echo "Security check complete. See security-report.json"

# Monitoring
logs: ## View application logs
	tail -f logs/silent-signal.log || echo "No logs found"

monitor: ## Monitor system resources
	@echo "Monitoring SilentSignal resources..."
	@ps aux | grep -E "(python|streamlit|uvicorn)" | grep -v grep || echo "No processes found"
