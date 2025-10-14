# SilentSignal Frontend Architecture

This document outlines the production-ready architecture of the SilentSignal React frontend.

## 📁 Project Structure

```
src/
├── assets/                    # Static assets (icons, images)
│   ├── icons/                 # SVG icons and graphics
│   └── images/                # Image files
│
├── components/                # Reusable UI components
│   ├── layout/                # Layout components (Header, Footer, etc.)
│   │   ├── Header.tsx         # Navigation and branding
│   │   ├── Footer.tsx         # Site footer with links
│   │   └── index.ts           # Layout exports
│   └── ui/                    # Design system components
│       ├── Button.tsx         # Reusable button component
│       ├── Card.tsx           # Card layout components
│       └── index.ts           # UI exports
│
├── features/                  # App logic grouped by feature
│   ├── auth/                  # Authentication components
│   ├── messages/              # Chat analysis & input components
│   │   ├── MessageAnalyzer.tsx # Main analysis interface
│   │   └── index.ts           # Message feature exports
│   └── reports/               # Report display, export, risk UI
│
├── hooks/                     # Custom React hooks
│   ├── useTheme.ts            # Theme management hook
│   ├── useDebounce.ts         # Debounce utility hook
│   ├── useAnalysis.ts         # Analysis state management
│   └── index.ts               # Hook exports
│
├── lib/                       # Shared logic / helpers
│   ├── api.ts                 # Axios instance and API utilities
│   ├── formatter.ts           # Text, score, date formatting
│   └── utils.ts               # General utility functions
│
├── services/                  # API service functions
│   └── analysisService.ts     # Analysis API calls
│
├── state/                     # Global state management
│   └── reportStore.ts         # Analysis results state (future)
│
├── styles/                    # Tailwind & global styles
│   ├── globals.css            # Global CSS and Tailwind imports
│   └── theme.ts               # Theme configuration (future)
│
├── types/                     # Global TypeScript types
│   └── index.ts               # All type definitions
│
├── i18n/                      # Internationalization (optional)
│   └── en.json                # English translations
│
├── App.tsx                    # Main app component
├── main.tsx                   # Entry point
└── index.html                 # Base HTML template
```

## 🏗️ Architecture Principles

### 1. **Feature-Based Organization**
- Components are grouped by business features rather than technical concerns
- Each feature contains all related components, hooks, and logic
- Easy to locate and modify feature-specific code

### 2. **Separation of Concerns**
- **UI Components**: Pure presentation components in `components/ui/`
- **Layout Components**: Structural components in `components/layout/`
- **Business Logic**: Feature-specific logic in `features/`
- **Shared Logic**: Reusable utilities in `lib/`
- **API Logic**: Service calls in `services/`

### 3. **Type Safety**
- Comprehensive TypeScript types in `types/`
- All components and functions are fully typed
- API responses and data structures are typed

### 4. **Reusability**
- Design system components in `components/ui/`
- Custom hooks for common patterns
- Utility functions for shared logic

## 🎨 Design System

### UI Components
- **Button**: Configurable button with variants (primary, secondary, outline, ghost, danger)
- **Card**: Flexible card layout with header, content, and footer sections
- **Theme Support**: All components support light/dark themes

### Styling Approach
- **Tailwind CSS**: Utility-first CSS framework
- **CSS Modules**: Component-scoped styles when needed
- **Dark Mode**: Automatic theme switching with persistence

## 🔧 Custom Hooks

### `useTheme`
- Manages light/dark theme state
- Persists theme preference in localStorage
- Detects system theme preference

### `useDebounce`
- Debounces values for performance optimization
- Useful for search inputs and API calls

### `useAnalysis`
- Manages analysis state and API calls
- Handles loading, error, and success states
- Provides clean interface for message analysis

## 🌐 API Integration

### Service Layer
- **analysisService**: Handles all analysis-related API calls
- **Error Handling**: Comprehensive error handling and user feedback
- **Type Safety**: Fully typed API responses

### HTTP Client
- **Axios**: Configured HTTP client with interceptors
- **Authentication**: Automatic token handling
- **Error Handling**: Centralized error management

## 🎯 Key Features

### Message Analysis
- Real-time conversation analysis
- Pattern detection (gaslighting, guilt manipulation, etc.)
- Risk assessment and scoring
- Actionable insights and recommendations

### Privacy & Security
- Client-side processing when possible
- No data storage without explicit consent
- Secure API communication

### User Experience
- Responsive design for all devices
- Dark/light theme support
- Smooth animations and transitions
- Accessible interface

## 🚀 Development Workflow

### Adding New Features
1. Create feature folder in `features/`
2. Add components, hooks, and types as needed
3. Export from feature's `index.ts`
4. Import and use in `App.tsx`

### Adding UI Components
1. Create component in `components/ui/`
2. Add to `components/ui/index.ts`
3. Use throughout the application

### API Integration
1. Add service function in `services/`
2. Create/update types in `types/`
3. Use custom hooks for state management

## 📦 Dependencies

### Core
- **React 18**: Latest React with hooks
- **TypeScript**: Type safety and developer experience
- **Vite**: Fast build tool and dev server

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library

### Utilities
- **clsx**: Conditional class names
- **tailwind-merge**: Tailwind class merging

## 🔮 Future Enhancements

### Planned Features
- **State Management**: Zustand for global state
- **Authentication**: User accounts and preferences
- **Reports**: Export analysis results
- **Internationalization**: Multi-language support
- **PWA**: Progressive Web App capabilities

### Performance Optimizations
- **Code Splitting**: Lazy loading of features
- **Caching**: API response caching
- **Optimization**: Bundle size optimization

This architecture provides a solid foundation for scaling the SilentSignal frontend while maintaining code quality, developer experience, and user experience.

