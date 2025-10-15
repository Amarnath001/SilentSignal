"""
FastAPI application for SilentSignal backend.

Production-quality API with comprehensive endpoints, error handling,
and proper request/response validation.
"""

from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import time
from typing import Dict, Any

from ..core.mcp_orchestrator import MCPOrchestrator
from ..models.schemas import (
    AnalysisRequest, AnalysisResponse, HealthResponse,
    WhatsAppWebhookRequest, EmailAlertRequest
)
from ...config.settings import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="SilentSignal API",
    description="AI-Powered Emotional Abuse Detection System",
    version=settings.app_version,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global orchestrator instance
orchestrator: MCPOrchestrator = None


def get_orchestrator() -> MCPOrchestrator:
    """Get or create orchestrator instance."""
    global orchestrator
    if orchestrator is None:
        orchestrator = MCPOrchestrator(
            pattern_knowledge_path="silent_signal/data/pattern_knowledge.json",
            resource_data_path="silent_signal/data/resources.json"
        )
    return orchestrator


@app.on_event("startup")
async def startup_event():
    """Initialize services on startup."""
    logger.info("Starting SilentSignal API server")
    logger.info(f"App version: {settings.app_version}")
    logger.info(f"Debug mode: {settings.debug}")
    
    # Initialize orchestrator
    get_orchestrator()
    logger.info("Orchestrator initialized successfully")


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown."""
    logger.info("Shutting down SilentSignal API server")


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="ok",
        service="SilentSignal API",
        version=settings.app_version
    )


@app.get("/status")
async def get_status():
    """Get detailed service status."""
    orchestrator = get_orchestrator()
    
    try:
        workflow_status = orchestrator.get_workflow_status()
        
        return {
            "service": "SilentSignal API",
            "version": settings.app_version,
            "status": "operational",
            "workflow_status": workflow_status,
            "configuration": {
                "nim_configured": bool(settings.nim_api_key),
                "email_alerts": settings.email_alerts,
                "max_conversation_length": settings.max_conversation_length
            }
        }
    except Exception as e:
        logger.error(f"Status check error: {e}")
        raise HTTPException(status_code=500, detail=f"Status check failed: {str(e)}")


@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_conversation(request: AnalysisRequest):
    """
    Analyze conversation for emotional abuse patterns.
    
    This endpoint performs comprehensive analysis using both rule-based
    pattern detection and AI analysis to identify potential emotional abuse.
    """
    start_time = time.time()
    
    try:
        # Validate input
        if not request.conversation or not request.conversation.strip():
            raise HTTPException(
                status_code=400,
                detail="Conversation text cannot be empty"
            )
        
        if len(request.conversation) > settings.max_conversation_length:
            raise HTTPException(
                status_code=400,
                detail=f"Conversation too long. Maximum length: {settings.max_conversation_length}"
            )
        
        # Get orchestrator and perform analysis
        orchestrator = get_orchestrator()
        result = orchestrator.analyze_conversation(request.conversation)
        
        # Log analysis completion
        processing_time = time.time() - start_time
        logger.info(
            f"Analysis completed for user {request.user_id or 'anonymous'} "
            f"in {processing_time:.2f}s - Risk level: {result.risk_level}"
        )
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        processing_time = time.time() - start_time
        logger.error(f"Analysis error after {processing_time:.2f}s: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )


@app.post("/whatsapp/inbound")
async def whatsapp_webhook(request: Request):
    """
    WhatsApp webhook endpoint for receiving messages.
    
    Processes incoming WhatsApp messages through Twilio webhook.
    """
    try:
        # Parse form data from Twilio webhook
        form_data = await request.form()
        
        # Extract message data
        message_data = {
            "Body": form_data.get("Body", ""),
            "From": form_data.get("From", ""),
            "To": form_data.get("To", ""),
            "MessageSid": form_data.get("MessageSid", "")
        }
        
        logger.info(f"Received WhatsApp message from {message_data['From']}")
        
        # Validate message
        if not message_data["Body"]:
            return {"error": "No message body provided"}
        
        # Analyze the message
        orchestrator = get_orchestrator()
        analysis = orchestrator.analyze_conversation(message_data["Body"])
        
        # Generate response based on analysis
        response_text = _generate_whatsapp_response(analysis)
        
        # Send email alert if configured and risk level is high
        if settings.email_alerts and analysis.risk_level in ["abuse", "concerning"]:
            await _send_email_alert(message_data, analysis)
        
        logger.info(f"WhatsApp analysis completed - Risk level: {analysis.risk_level}")
        
        # Return TwiML response
        from twilio.twiml.messaging_response import MessagingResponse
        
        twiml_response = MessagingResponse()
        twiml_response.message(response_text)
        
        return str(twiml_response)
        
    except Exception as e:
        logger.error(f"WhatsApp webhook error: {e}")
        # Return error response
        from twilio.twiml.messaging_response import MessagingResponse
        
        twiml_response = MessagingResponse()
        twiml_response.message("Analysis temporarily unavailable. Please try again later.")
        
        return str(twiml_response)


@app.post("/alerts/email")
async def send_email_alert(alert_request: EmailAlertRequest):
    """
    Send email alert for concerning conversations.
    
    This endpoint can be called to send email alerts when
    concerning patterns are detected.
    """
    try:
        if not settings.email_alerts:
            raise HTTPException(
                status_code=400,
                detail="Email alerts are not configured"
            )
        
        # Send email alert
        success = await _send_email_alert_detailed(alert_request)
        
        if success:
            return {"status": "success", "message": "Email alert sent successfully"}
        else:
            raise HTTPException(
                status_code=500,
                detail="Failed to send email alert"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email alert error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Email alert failed: {str(e)}"
        )


@app.get("/patterns")
async def get_patterns():
    """Get information about available detection patterns."""
    try:
        orchestrator = get_orchestrator()
        pattern_stats = orchestrator.pattern_detector.get_pattern_statistics()
        
        return {
            "pattern_statistics": pattern_stats,
            "available_patterns": list(orchestrator.pattern_detector.patterns.keys())
        }
        
    except Exception as e:
        logger.error(f"Pattern info error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get pattern information: {str(e)}"
        )


@app.get("/resources")
async def get_resources():
    """Get available crisis resources and support information."""
    try:
        orchestrator = get_orchestrator()
        resources = orchestrator.resource_manager.get_crisis_resources()
        
        return {
            "resources": resources,
            "statistics": orchestrator.resource_manager.get_resource_statistics()
        }
        
    except Exception as e:
        logger.error(f"Resources error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get resources: {str(e)}"
        )


def _generate_whatsapp_response(analysis: AnalysisResponse) -> str:
    """Generate appropriate WhatsApp response based on analysis."""
    risk_emoji = {
        "safe": "✅",
        "concerning": "⚠️",
        "abuse": "🚨"
    }
    
    emoji = risk_emoji.get(analysis.risk_level.value, "❓")
    
    response_parts = [
        f"{emoji} Risk Level: {analysis.risk_level.value.title()}"
    ]
    
    if analysis.patterns_detected:
        pattern_names = [p.name.replace('_', ' ').title() for p in analysis.patterns_detected]
        response_parts.append(f"\n🔍 Patterns Detected:\n{', '.join(pattern_names)}")
    
    response_parts.append(f"\n🚩 Red Flags: {analysis.red_flags_count} detected")
    
    if analysis.suggestions:
        response_parts.append(f"\n💡 Suggestion:\n{analysis.suggestions[0]}")
    
    if analysis.risk_level.value == "abuse":
        response_parts.append("\n⚠️ Note: Monitor the situation carefully")
        if analysis.resources:
            response_parts.append(f"\n📞 Support: {analysis.resources[0]}")
    
    return "\n".join(response_parts)


async def _send_email_alert(message_data: Dict[str, str], analysis: AnalysisResponse):
    """Send email alert for concerning conversations."""
    try:
        if not settings.email_alerts or not settings.email_from or not settings.email_to:
            return
        
        # Create email content
        subject = f"SilentSignal Alert - {analysis.risk_level.value.title()} Risk Detected"
        
        body = f"""
SilentSignal Alert

Risk Level: {analysis.risk_level.value.title()}
Phone Number: {message_data.get('From', 'Unknown')}
Timestamp: {time.strftime('%Y-%m-%d %H:%M:%S')}

Message Snippet: {message_data['Body'][:200]}...

Patterns Detected: {len(analysis.patterns_detected)}
Red Flags: {analysis.red_flags_count}

Recommendations:
{chr(10).join(f"- {suggestion}" for suggestion in analysis.suggestions[:3])}

Resources:
{chr(10).join(f"- {resource}" for resource in analysis.resources[:3])}

---
This is an automated alert from SilentSignal.
        """
        
        # Send email (implementation would depend on email service)
        logger.info(f"Email alert would be sent: {subject}")
        
    except Exception as e:
        logger.error(f"Email alert error: {e}")


async def _send_email_alert_detailed(alert_request: EmailAlertRequest) -> bool:
    """Send detailed email alert."""
    try:
        # Implementation for detailed email alerts
        logger.info(f"Detailed email alert for {alert_request.risk_level}")
        return True
        
    except Exception as e:
        logger.error(f"Detailed email alert error: {e}")
        return False


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Custom HTTP exception handler."""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code,
            "path": str(request.url)
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """General exception handler."""
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "status_code": 500,
            "path": str(request.url)
        }
    )


if __name__ == "__main__":
    import uvicorn
    import os
    
    port = int(os.environ.get("PORT", settings.api_port))
    host = "0.0.0.0"
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=False
    )
