import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure page always starts at top on reload
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Clear hash on page load to prevent auto-scroll to sections
window.addEventListener('load', () => {
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }
});

// Also clear hash immediately when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }
});

// Clear hash as soon as possible
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}

// Also set scroll restoration to manual to prevent browser from remembering scroll position
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)