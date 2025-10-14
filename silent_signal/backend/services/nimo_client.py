"""
NVIDIA NIM Client for Nemotron-3 Integration

Handles communication with NVIDIA NIM API for AI-powered conversation analysis.
Production-quality implementation with comprehensive error handling.
"""

import requests
import json
import os
from typing import Dict, List, Any, Optional
import logging
from openai import OpenAI

from ...config.settings import settings

logger = logging.getLogger(__name__)


class NimoClient:
    """
    Client for NVIDIA NIM API with Nemotron-3 integration.
    
    Provides robust AI analysis capabilities with fallback mechanisms
    and comprehensive error handling.
    """
    
    def __init__(self):
        """Initialize the NIM client with configuration from settings."""
        self.base_url = settings.nim_base_url
        self.api_key = settings.nim_api_key
        self.model = settings.nim_model
        self.timeout = settings.analysis_timeout
        self.use_openai_sdk = settings.nim_use_openai_sdk
        self.reasoning_min = settings.nim_reasoning_min
        self.reasoning_max = settings.nim_reasoning_max
        
        # Initialize OpenAI client if using SDK
        self.openai_client = None
        if self.use_openai_sdk and self.api_key:
            try:
                self.openai_client = OpenAI(
                    api_key=self.api_key,
                    base_url=self.base_url
                )
                logger.info("NIM client initialized with OpenAI SDK")
            except Exception as e:
                logger.warning(f"Failed to initialize OpenAI SDK: {e}")
                self.use_openai_sdk = False
        
        # Validate configuration
        self._validate_configuration()
    
    def _validate_configuration(self) -> None:
        """Validate NIM client configuration."""
        if not self.api_key:
            logger.warning("NIM API key not provided - AI analysis will use fallback mode")
        
        if not self.base_url:
            logger.error("NIM base URL not configured")
            raise ValueError("NIM base URL is required")
        
        logger.info(f"NIM configured: base_url={self.base_url}, model={self.model}, "
                   f"api_key_present={bool(self.api_key)}, use_openai_sdk={self.use_openai_sdk}")
    
    def analyze_conversation(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze conversation using Nemotron-3 with enriched context.
        
        Args:
            context: Analysis context containing conversation, patterns, and RAG data
            
        Returns:
            Structured analysis result with confidence scores and reasoning
        """
        try:
            conversation_text = context.get("conversation", "")
            if not conversation_text.strip():
                return self._get_fallback_response("Empty conversation text")
            
            # Create enriched prompt with RAG context
            prompt = self._create_enriched_prompt(context)
            
            # Call Nemotron-3 via NIM
            if self.use_openai_sdk and self.openai_client:
                response = self._call_nim_api_openai(prompt)
            else:
                response = self._call_nim_api(prompt)
            
            # Parse and validate response
            parsed_response = self._parse_response(response)
            
            # Enhance with confidence scoring
            enhanced_response = self._enhance_with_confidence(parsed_response, context)
            
            logger.info("NIM analysis completed successfully")
            return enhanced_response
            
        except Exception as e:
            logger.error(f"NIM analysis error: {e}")
            return self._get_fallback_response(str(e))
    
    def _create_enriched_prompt(self, context: Dict[str, Any]) -> str:
        """Create enriched prompt with RAG context and pattern information."""
        conversation = context.get("conversation", "")
        pattern_results = context.get("pattern_results", {})
        rag_context = context.get("rag_context", {})
        
        # Extract pattern information
        patterns = pattern_results.get("patterns", [])
        pattern_names = [p.name if hasattr(p, 'name') else str(p) for p in patterns]
        
        # Build context information
        context_info = []
        if pattern_names:
            context_info.append(f"Detected patterns: {', '.join(pattern_names)}")
        
        rag_data = rag_context.get("pattern_definitions", {})
        if rag_data:
            context_info.append(f"Available pattern categories: {rag_data.get('total_patterns', 0)}")
        
        context_str = "\n".join(context_info) if context_info else "No additional context available"
        
        prompt = f"""
You are an expert psychologist specializing in emotional abuse detection. Analyze the following conversation for signs of manipulation, coercion, gaslighting, or other emotional abuse patterns.

CONTEXT INFORMATION:
{context_str}

CONVERSATION TO ANALYZE:
{conversation}

Please provide a detailed analysis in the following JSON format:
{{
    "risk_level": "safe|concerning|abuse",
    "confidence": 0.0-1.0,
    "reasoning": "Detailed explanation of your analysis",
    "key_indicators": ["list", "of", "specific", "indicators"],
    "emotional_impact": "Assessment of potential emotional harm",
    "recommendations": ["list", "of", "safety", "recommendations"]
}}

Focus on:
1. Manipulation tactics (gaslighting, guilt-tripping, threats)
2. Power dynamics and control attempts
3. Emotional manipulation and coercion
4. Isolation attempts
5. Intimidation or threats
6. Overall emotional safety of the conversation

Be objective, evidence-based, and prioritize the safety and well-being of potential victims.
"""
        
        return prompt.strip()
    
    def _call_nim_api_openai(self, prompt: str) -> Dict[str, Any]:
        """Call NIM API using OpenAI SDK."""
        try:
            # Prepare request parameters
            request_params = {
                "model": self.model,
                "messages": [
                    {"role": "system", "content": "You are an expert in emotional abuse detection and psychological safety."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.1,
                "max_tokens": 1000,
                "timeout": self.timeout
            }
            
            # Add reasoning parameters if configured
            if self.reasoning_min > 0 or self.reasoning_max > 0:
                request_params["reasoning_min_tokens"] = self.reasoning_min
                request_params["reasoning_max_tokens"] = self.reasoning_max
            
            # Make API call
            response = self.openai_client.chat.completions.create(**request_params)
            
            # Extract content
            content = response.choices[0].message.content
            reasoning = getattr(response.choices[0].message, 'reasoning', None)
            
            return {
                "content": content,
                "reasoning": reasoning,
                "usage": response.usage.__dict__ if response.usage else {},
                "model": response.model
            }
            
        except Exception as e:
            logger.error(f"OpenAI SDK NIM call failed: {e}")
            raise
    
    def _call_nim_api(self, prompt: str) -> Dict[str, Any]:
        """Call NIM API using direct HTTP requests."""
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": self.model,
                "messages": [
                    {"role": "system", "content": "You are an expert in emotional abuse detection."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.1,
                "max_tokens": 1000
            }
            
            # Add reasoning parameters if configured
            if self.reasoning_min > 0 or self.reasoning_max > 0:
                payload["reasoning_min_tokens"] = self.reasoning_min
                payload["reasoning_max_tokens"] = self.reasoning_max
            
            response = requests.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=payload,
                timeout=self.timeout
            )
            
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"HTTP NIM call failed: {e}")
            raise
        except Exception as e:
            logger.error(f"Unexpected NIM call error: {e}")
            raise
    
    def _parse_response(self, response: Dict[str, Any]) -> Dict[str, Any]:
        """Parse and extract analysis from NIM response."""
        try:
            # Extract content from response
            if "content" in response:
                content = response["content"]
            elif "choices" in response and len(response["choices"]) > 0:
                content = response["choices"][0]["message"]["content"]
            else:
                raise ValueError("Invalid response format")
            
            # Try to parse JSON from content
            try:
                # Look for JSON in the content
                json_start = content.find('{')
                json_end = content.rfind('}') + 1
                
                if json_start >= 0 and json_end > json_start:
                    json_content = content[json_start:json_end]
                    parsed = json.loads(json_content)
                    
                    # Validate required fields
                    required_fields = ["risk_level", "confidence", "reasoning"]
                    for field in required_fields:
                        if field not in parsed:
                            parsed[field] = self._get_default_value(field)
                    
                    return parsed
                else:
                    raise ValueError("No JSON found in response")
                    
            except (json.JSONDecodeError, ValueError) as e:
                logger.warning(f"Failed to parse JSON from response: {e}")
                return self._extract_from_text(content)
                
        except Exception as e:
            logger.error(f"Response parsing error: {e}")
            return self._get_fallback_response(f"Response parsing failed: {e}")
    
    def _extract_from_text(self, content: str) -> Dict[str, Any]:
        """Extract analysis information from text when JSON parsing fails."""
        try:
            # Simple text extraction for fallback
            risk_level = "unknown"
            confidence = 0.5
            reasoning = content[:500]  # First 500 chars as reasoning
            
            # Try to extract risk level from text
            content_lower = content.lower()
            if any(word in content_lower for word in ["abuse", "dangerous", "threat", "harm"]):
                risk_level = "abuse"
            elif any(word in content_lower for word in ["concerning", "worry", "manipulation"]):
                risk_level = "concerning"
            elif any(word in content_lower for word in ["safe", "healthy", "normal"]):
                risk_level = "safe"
            
            return {
                "risk_level": risk_level,
                "confidence": confidence,
                "reasoning": reasoning,
                "key_indicators": [],
                "emotional_impact": "Unable to determine from text response",
                "recommendations": ["Manual review recommended"]
            }
            
        except Exception as e:
            logger.error(f"Text extraction error: {e}")
            return self._get_fallback_response(f"Text extraction failed: {e}")
    
    def _get_default_value(self, field: str) -> Any:
        """Get default value for missing fields."""
        defaults = {
            "risk_level": "unknown",
            "confidence": 0.5,
            "reasoning": "Analysis unavailable",
            "key_indicators": [],
            "emotional_impact": "Unable to assess",
            "recommendations": ["Manual review recommended"]
        }
        return defaults.get(field, "Unknown")
    
    def _enhance_with_confidence(self, parsed_response: Dict[str, Any], 
                                context: Dict[str, Any]) -> Dict[str, Any]:
        """Enhance response with additional confidence scoring."""
        try:
            # Get pattern confidence from context
            pattern_results = context.get("pattern_results", {})
            pattern_count = pattern_results.get("pattern_count", 0)
            
            # Adjust confidence based on pattern agreement
            base_confidence = parsed_response.get("confidence", 0.5)
            if pattern_count > 0:
                # Higher confidence if patterns agree with AI assessment
                confidence_boost = min(pattern_count * 0.1, 0.3)
                parsed_response["confidence"] = min(base_confidence + confidence_boost, 1.0)
            
            # Add metadata
            parsed_response["analysis_metadata"] = {
                "model_used": self.model,
                "pattern_agreement": pattern_count > 0,
                "analysis_timestamp": self._get_timestamp()
            }
            
            return parsed_response
            
        except Exception as e:
            logger.error(f"Confidence enhancement error: {e}")
            return parsed_response
    
    def _get_fallback_response(self, error_message: str) -> Dict[str, Any]:
        """Generate fallback response when NIM analysis fails."""
        return {
            "risk_level": "unknown",
            "confidence": 0.0,
            "reasoning": f"AI analysis unavailable: {error_message}",
            "key_indicators": [],
            "emotional_impact": "Unable to assess due to technical issues",
            "recommendations": [
                "Manual review recommended",
                "Contact support if issues persist"
            ],
            "analysis_metadata": {
                "model_used": "fallback",
                "error": error_message,
                "analysis_timestamp": self._get_timestamp()
            }
        }
    
    def _get_timestamp(self) -> str:
        """Get current timestamp."""
        from datetime import datetime
        return datetime.now().isoformat()
    
    def is_available(self) -> bool:
        """Check if NIM service is available."""
        return bool(self.api_key and self.base_url)
    
    def get_service_info(self) -> Dict[str, Any]:
        """Get service information and status."""
        return {
            "service_name": "NVIDIA NIM",
            "base_url": self.base_url,
            "model": self.model,
            "api_key_configured": bool(self.api_key),
            "openai_sdk_enabled": self.use_openai_sdk,
            "reasoning_enabled": self.reasoning_min > 0 or self.reasoning_max > 0,
            "timeout": self.timeout
        }

