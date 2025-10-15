import { useState, useCallback } from 'react';
import { apiService } from '../services/api';

// Define the type locally to avoid import issues
interface AnalysisResponse {
  risk_level: 'safe' | 'concerning' | 'abuse';
  risk_score: number;
  patterns_detected: Array<{
    name: string;
    severity: string;
    description: string;
    confidence: number;
  }>;
  red_flags_count: number;
  suggestions: string[];
  resources: string[];
  analysis_details: Record<string, any>;
  reasoning: string;
}

export interface AnalysisState {
  isAnalyzing: boolean;
  result: AnalysisResponse | null;
  error: string | null;
  isBackendAvailable: boolean;
}

export interface AnalysisActions {
  analyzeConversation: (conversation: string, userId?: string) => Promise<void>;
  clearResult: () => void;
  checkBackendHealth: () => Promise<void>;
}

export const useAnalysis = (): AnalysisState & AnalysisActions => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);

  const analyzeConversation = useCallback(async (conversation: string, userId?: string) => {
    if (!conversation.trim()) {
      setError('Please enter a conversation to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await apiService.analyzeConversation(conversation, userId);
      setResult(analysisResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const checkBackendHealth = useCallback(async () => {
    try {
      const isAvailable = await apiService.isBackendAvailable();
      setIsBackendAvailable(isAvailable);
    } catch (err) {
      setIsBackendAvailable(false);
      console.warn('Backend health check failed:', err);
    }
  }, []);

  return {
    isAnalyzing,
    result,
    error,
    isBackendAvailable,
    analyzeConversation,
    clearResult,
    checkBackendHealth,
  };
};
