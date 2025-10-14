# SilentSignal React Frontend

Modern, responsive React frontend for the SilentSignal AI Emotional Abuse Detection System.

## 🚀 Features

- **Modern UI/UX**: Clean, professional interface with Tailwind CSS
- **Real-time Analysis**: Instant conversation analysis with progress indicators
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Safety Features**: Disguise mode and emergency resources
- **Interactive Examples**: Explore different conversation types
- **System Metrics**: Real-time monitoring and status information
- **Crisis Resources**: Comprehensive support and hotline information

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern styling
- **TanStack Query** for data fetching and caching
- **Axios** for API communication
- **Lucide React** for beautiful icons

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ and npm
- SilentSignal backend running on http://localhost:8000

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

Create a `.env` file in the frontend-react directory:

```env
VITE_API_URL=http://localhost:8000
```

## 📱 Usage

1. **Analyze Conversations**: Enter conversation text and get instant analysis
2. **View Examples**: Explore different types of conversations and their analysis
3. **Monitor System**: Check real-time metrics and system status
4. **Access Resources**: Find crisis hotlines and support resources
5. **Safety Features**: Use disguise mode for privacy protection

## 🎨 UI Components

- **Header**: Navigation and safety features
- **AnalysisPage**: Main conversation analysis interface
- **AnalysisResults**: Detailed results with patterns and recommendations
- **ExamplesPage**: Interactive conversation examples
- **MetricsPage**: System monitoring and statistics
- **ResourcesPage**: Crisis resources and support information

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Project Structure

```
src/
├── components/          # React components
│   ├── AnalysisPage.tsx
│   ├── AnalysisResults.tsx
│   ├── ExamplesPage.tsx
│   ├── Header.tsx
│   ├── MetricsPage.tsx
│   └── ResourcesPage.tsx
├── services/           # API services
│   └── api.ts
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles with Tailwind
```

## 🌐 API Integration

The frontend communicates with the SilentSignal backend API:

- **Analysis**: POST `/analyze` - Analyze conversation text
- **Health**: GET `/health` - Service health check
- **Status**: GET `/status` - Detailed service status
- **Resources**: GET `/resources` - Crisis resources
- **Patterns**: GET `/patterns` - Available detection patterns

## 🎯 Key Features

### Analysis Interface
- Real-time text analysis
- Progress indicators
- Detailed pattern detection
- Risk level assessment
- Recommendations and resources

### Safety Features
- Disguise mode for privacy
- Emergency resources always visible
- No data storage or transmission
- Quick access to crisis hotlines

### Responsive Design
- Mobile-first approach
- Touch-friendly interfaces
- Adaptive layouts
- Accessible components

## 🔒 Privacy & Security

- **No Data Storage**: All analysis happens in real-time
- **Local Processing**: Backend processes data locally
- **Disguise Mode**: Quick privacy protection
- **Secure Communication**: HTTPS API communication
- **No Tracking**: No analytics or user tracking

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

### Deploy

The built files in the `dist/` directory can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist/` folder
- **AWS S3**: Upload `dist/` contents to S3 bucket
- **Nginx**: Serve `dist/` directory

### Environment Variables

Set production environment variables:

```env
VITE_API_URL=https://your-api-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the main project LICENSE file for details.

---

**SilentSignal React Frontend** - Modern, accessible, and privacy-focused emotional abuse detection interface. 🛡️