"""
Pydantic models for SilentSignal API.

Contains all request/response models for API validation.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum


class RiskLevel(str, Enum):
    """Risk level enumeration."""
    SAFE = "safe"
    CONCERNING = "concerning"
    ABUSE = "abuse"


class AnalysisRequest(BaseModel):
    """Request model for conversation analysis."""
    conversation: str = Field(..., description="The conversation text to analyze")
    user_id: Optional[str] = Field(None, description="Optional user identifier")


class PatternInfo(BaseModel):
    """Information about a detected pattern."""
    name: str = Field(..., description="Pattern name")
    severity: str = Field(..., description="Pattern severity level")
    description: str = Field(..., description="Pattern description")
    confidence: float = Field(..., description="Confidence score (0-1)")


class AnalysisResponse(BaseModel):
    """Response model for conversation analysis."""
    risk_level: RiskLevel = Field(..., description="Overall risk level")
    risk_score: float = Field(..., description="Risk score (0-1)")
    patterns_detected: List[PatternInfo] = Field(..., description="List of detected patterns")
    red_flags_count: int = Field(..., description="Number of red flags detected")
    suggestions: List[str] = Field(..., description="Safety suggestions")
    resources: List[str] = Field(..., description="Available resources")
    analysis_details: Dict[str, Any] = Field(..., description="Detailed analysis information")
    reasoning: str = Field(..., description="AI reasoning for the analysis")


class HealthResponse(BaseModel):
    """Health check response model."""
    status: str = Field(..., description="Service status")
    service: str = Field(..., description="Service name")
    version: str = Field(..., description="Service version")


class WhatsAppWebhookRequest(BaseModel):
    """WhatsApp webhook request model."""
    Body: str = Field(..., description="Message body")
    From: str = Field(..., description="Sender phone number")
    To: str = Field(..., description="Recipient phone number")
    MessageSid: str = Field(..., description="Message SID")


class EmailAlertRequest(BaseModel):
    """Email alert request model."""
    risk_level: RiskLevel = Field(..., description="Risk level")
    conversation_snippet: str = Field(..., description="Conversation snippet")
    user_phone: str = Field(..., description="User phone number")
    timestamp: str = Field(..., description="Alert timestamp")

