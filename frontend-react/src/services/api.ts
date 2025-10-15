/**
 * API service for communicating with the SilentSignal backend.
 */

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Types matching the backend schemas
export interface AnalysisRequest {
  conversation: string;
  user_id?: string;
}

export interface PatternInfo {
  name: string;
  severity: string;
  description: string;
  confidence: number;
}

export interface AnalysisResponse {
  risk_level: 'safe' | 'concerning' | 'abuse';
  risk_score: number;
  patterns_detected: PatternInfo[];
  red_flags_count: number;
  suggestions: string[];
  resources: string[];
  analysis_details: Record<string, any>;
  reasoning: string;
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    // Use environment variable or default to localhost:8000
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Check if the backend is healthy and running
   */
  async healthCheck(): Promise<HealthResponse> {
    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) {
      throw new Error(`Backend health check failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Analyze a conversation for emotional abuse patterns
   */
  async analyzeConversation(conversation: string, userId?: string): Promise<AnalysisResponse> {
    const requestBody: AnalysisRequest = {
      conversation: conversation.trim(),
      ...(userId && { user_id: userId })
    };

    const response = await fetch(`${this.baseUrl}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || 
        `Analysis failed: ${response.statusText} (${response.status})`
      );
    }

    return response.json();
  }

  /**
   * Get available detection patterns
   */
  async getPatterns() {
    const response = await fetch(`${this.baseUrl}/patterns`);
    if (!response.ok) {
      throw new Error(`Failed to get patterns: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get crisis resources and support information
   */
  async getResources() {
    const response = await fetch(`${this.baseUrl}/resources`);
    if (!response.ok) {
      throw new Error(`Failed to get resources: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Check if the backend is available
   */
  async isBackendAvailable(): Promise<boolean> {
    try {
      await this.healthCheck();
      return true;
    } catch (error) {
      console.warn('Backend not available:', error);
      return false;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;

// Re-export types for convenience
export type { AnalysisResponse, AnalysisRequest, PatternInfo, HealthResponse };
