# 🛡️ SilentSignal - Production Quality Refactor

## 🏗️ New Architecture Overview

SilentSignal has been completely refactored into a production-quality, modular architecture with clean separation of concerns:

```
SilentSignal/
├── 📁 silent_signal/              # Backend services
│   ├── 📁 backend/                # Core backend logic
│   │   ├── 📁 api/               # FastAPI endpoints
│   │   ├── 📁 core/              # Business logic
│   │   ├── 📁 services/          # External integrations
│   │   ├── 📁 models/            # Data models
│   │   └── 📁 utils/             # Utilities
│   ├── 📁 config/                # Configuration
│   └── 📁 data/                  # Data files
├── 📁 frontend-react/             # React Frontend
│   ├── 📁 src/                   # Source code
│   │   ├── 📁 components/        # UI components
│   │   ├── 📁 features/          # Feature modules
│   │   ├── 📁 hooks/             # Custom hooks
│   │   ├── 📁 lib/               # Utilities
│   │   ├── 📁 services/          # API services
│   │   ├── 📁 types/             # TypeScript types
│   │   └── 📁 styles/            # Styling
│   └── 📄 package.json           # Dependencies
├── 📄 main.py                    # Entry point
├── 📄 Makefile                   # Build automation
└── 📄 requirements.txt           # Python dependencies
```

## ✨ Key Improvements

### 🔧 **Production Quality**
- **Modular Architecture**: Clean separation of frontend, backend, and business logic
- **Type Safety**: Comprehensive Pydantic models and type hints
- **Error Handling**: Robust error handling and logging throughout
- **Configuration Management**: Centralized settings with environment variables
- **API Documentation**: Auto-generated OpenAPI/Swagger docs

### 🏛️ **Clean Architecture**
- **Business Logic Separation**: Core logic isolated from API and UI
- **Service Layer**: External integrations properly abstracted
- **Data Models**: Consistent request/response validation
- **Utility Functions**: Reusable components and helpers

### 🚀 **Enhanced Features**
- **Comprehensive API**: RESTful endpoints with proper status codes
- **Modern UI**: Improved Streamlit interface with better UX
- **Metrics Dashboard**: System monitoring and analytics
- **Resource Management**: Better crisis resource handling
- **Health Checks**: Service monitoring and status endpoints

## 🚀 Quick Start

### 1. **Setup Environment**
```bash
# Clone and navigate to project
cd SilentSignal

# Install dependencies
make install

# Setup configuration
make setup
# Edit .env file with your settings
```

### 2. **Run Services**

#### Option A: Using Makefile (Recommended)
```bash
# Run backend only
make run-backend

# Run frontend only  
make run-frontend

# Run both (in separate terminals)
make run-both
```

#### Option B: Using Python
```bash
# Run backend
python main.py backend

# Run frontend
python main.py frontend
```

#### Option C: Direct execution
```bash
# Backend
python -m uvicorn silent_signal.backend.api.main:app --reload --port 8000

# Frontend
streamlit run silent_signal/frontend/app.py --server.port 8501
```

### 3. **Access Applications**
- **Frontend**: http://localhost:8501
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 📊 API Endpoints

### Core Analysis
- `POST /analyze` - Analyze conversation text
- `GET /health` - Service health check
- `GET /status` - Detailed service status

### Resources & Support
- `GET /resources` - Crisis resources and hotlines
- `GET /patterns` - Available detection patterns

### WhatsApp Integration
- `POST /whatsapp/inbound` - WhatsApp webhook endpoint
- `POST /alerts/email` - Email alert system

## 🔧 Configuration

All configuration is centralized in `silent_signal/config/settings.py`:

```python
# Key settings
NIM_BASE_URL=https://integrate.api.nvidia.com/v1
NIM_API_KEY=your_api_key_here
NIM_MODEL=nvidia/nvidia-nemotron-nano-9b-v2

# Email alerts
EMAIL_ALERTS=1
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com

# API settings
API_HOST=0.0.0.0
API_PORT=8000
```

## 🧪 Testing

```bash
# Run all tests
make test

# Run specific test suites
make test-backend
make test-frontend

# With coverage
pytest --cov=silent_signal --cov-report=html
```

## 🔍 Code Quality

```bash
# Linting
make lint

# Code formatting
make format

# Import checking
make check-imports

# Security checks
make security-check
```

## 📈 Monitoring & Health

```bash
# Check service health
make health

# View logs
make logs

# Monitor resources
make monitor
```

## 🏗️ Development Workflow

### 1. **Adding New Features**
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes following the architecture:
# - Backend logic → silent_signal/backend/core/
# - API endpoints → silent_signal/backend/api/
# - Frontend components → silent_signal/frontend/components/
# - Data models → silent_signal/backend/models/

# Test your changes
make test

# Format and lint
make format && make lint
```

### 2. **Adding New API Endpoints**
```python
# In silent_signal/backend/api/main.py
@app.post("/new-endpoint")
async def new_endpoint(request: YourRequestModel):
    # Implementation
    return YourResponseModel(...)
```

### 3. **Adding New UI Components**
```python
# Create silent_signal/frontend/components/new_component.py
def render_new_component():
    # Component implementation
    pass

# Import in silent_signal/frontend/components/__init__.py
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build image
make docker-build

# Run container
make docker-run
```

### Production Deployment
```bash
# Build package
make build

# Deploy (configure your deployment)
make deploy
```

## 📚 Key Components

### 🧠 **MCP Orchestrator**
- Manages the complete analysis workflow
- Coordinates pattern detection and AI analysis
- Provides comprehensive error handling and metrics

### 🔍 **Pattern Detector**
- Rule-based emotional abuse pattern detection
- 240+ indicators across 10+ categories
- Configurable severity levels and confidence scoring

### 🤖 **NVIDIA NIM Client**
- Production-ready AI integration
- Robust error handling and fallback mechanisms
- Comprehensive prompt engineering and response parsing

### 🎨 **Modern Frontend**
- Clean, responsive Streamlit interface
- Real-time analysis with progress indicators
- Safety features including disguise mode
- Comprehensive example library

## 🔒 Security & Privacy

- **Zero Data Storage**: All processing in-memory only
- **Local Processing**: No external data transmission
- **Panic Button**: Quick disguise mode for privacy
- **Secure Configuration**: Environment-based secrets management

## 📞 Support & Resources

### Crisis Resources
- National Domestic Violence Hotline: 1-800-799-7233
- Crisis Text Line: Text HOME to 741741
- National Suicide Prevention Lifeline: 988

### Technical Support
- Check logs: `make logs`
- Health check: `make health`
- Monitor resources: `make monitor`

## 🎯 Migration from Old Structure

If migrating from the old structure:

```bash
# Copy data files
make copy-data

# Run migration
make migrate

# Start new services
make run-backend
make run-frontend
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**SilentSignal** - Empowering individuals with AI-powered emotional abuse detection technology. 🛡️
