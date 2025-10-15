"""
MCP Orchestrator - Agentic Workflow Engine

Orchestrates multi-step analysis pipeline with RAG and Nemotron integration.
Production-quality implementation with proper error handling and logging.
"""

import json
import os
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, field
import logging

from ..services.nimo_client import NimoClient
from .pattern_detector import PatternDetector
from .analyzer import Analyzer
from ..utils.resource_manager import ResourceManager
from ..models.schemas import AnalysisResponse, RiskLevel, PatternInfo

logger = logging.getLogger(__name__)


@dataclass
class AnalysisStep:
    """Represents a step in the agentic workflow."""
    name: str
    status: str = "pending"  # pending, running, completed, failed
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    start_time: Optional[float] = None
    end_time: Optional[float] = None


class MCPOrchestrator:
    """
    MCP (Model Context Protocol) Orchestrator.
    
    Manages the agentic workflow for conversation analysis with
    comprehensive error handling and progress tracking.
    """
    
    def __init__(self, 
                 pattern_knowledge_path: Optional[str] = None,
                 resource_data_path: Optional[str] = None):
        """
        Initialize the MCP Orchestrator.
        
        Args:
            pattern_knowledge_path: Path to pattern knowledge JSON file
            resource_data_path: Path to resource data JSON file
        """
        self.nimo_client = NimoClient()
        self.pattern_detector = PatternDetector(pattern_knowledge_path)
        self.analyzer = Analyzer()
        self.resource_manager = ResourceManager(resource_data_path)
        
        # Initialize workflow steps
        self.steps = [
            AnalysisStep("preprocessing"),
            AnalysisStep("rag_retrieval"),
            AnalysisStep("pattern_detection"),
            AnalysisStep("nemotron_analysis"),
            AnalysisStep("fusion_analysis"),
            AnalysisStep("report_generation")
        ]
        
        # Performance metrics
        self.metrics = {
            "total_analyses": 0,
            "successful_analyses": 0,
            "failed_analyses": 0,
            "average_processing_time": 0.0
        }
    
    def analyze_conversation(self, conversation_text: str) -> AnalysisResponse:
        """
        Execute the complete agentic workflow for conversation analysis.
        
        Args:
            conversation_text: The conversation to analyze
            
        Returns:
            Complete analysis result with explainable reasoning
        """
        import time
        start_time = time.time()
        
        try:
            logger.info("Starting MCP agentic workflow")
            self.metrics["total_analyses"] += 1
            
            # Reset steps
            self._reset_workflow_steps()
            
            # Step 1: Preprocessing
            self._update_step_status("preprocessing", "running")
            preprocessed_data = self._preprocess_conversation(conversation_text)
            self._update_step_status("preprocessing", "completed", preprocessed_data)
            
            # Step 2: RAG Retrieval
            self._update_step_status("rag_retrieval", "running")
            rag_context = self._retrieve_pattern_definitions(preprocessed_data)
            self._update_step_status("rag_retrieval", "completed", rag_context)
            
            # Step 3: Pattern Detection
            self._update_step_status("pattern_detection", "running")
            pattern_results = self._detect_patterns(preprocessed_data)
            self._update_step_status("pattern_detection", "completed", pattern_results)
            
            # Step 4: Nemotron Analysis
            self._update_step_status("nemotron_analysis", "running")
            nemotron_results = self._analyze_with_nemotron(
                conversation_text, rag_context, pattern_results
            )
            self._update_step_status("nemotron_analysis", "completed", nemotron_results)
            
            # Step 5: Fusion Analysis
            self._update_step_status("fusion_analysis", "running")
            fusion_results = self._fuse_analyses(pattern_results, nemotron_results)
            self._update_step_status("fusion_analysis", "completed", fusion_results)
            
            # Step 6: Report Generation
            self._update_step_status("report_generation", "running")
            final_report = self._generate_final_report(fusion_results, rag_context)
            self._update_step_status("report_generation", "completed", final_report)
            
            # Update metrics
            processing_time = time.time() - start_time
            self._update_metrics(processing_time, success=True)
            
            logger.info(f"MCP agentic workflow completed successfully in {processing_time:.2f}s")
            return final_report
            
        except Exception as e:
            processing_time = time.time() - start_time
            self._update_metrics(processing_time, success=False)
            logger.error(f"MCP workflow error after {processing_time:.2f}s: {e}")
            return self._get_error_response(str(e))
    
    def _reset_workflow_steps(self) -> None:
        """Reset all workflow steps to pending status."""
        for step in self.steps:
            step.status = "pending"
            step.result = None
            step.error = None
            step.start_time = None
            step.end_time = None
    
    def _update_step_status(self, step_name: str, status: str, 
                           result: Optional[Dict[str, Any]] = None,
                           error: Optional[str] = None) -> None:
        """Update the status of a workflow step."""
        import time
        
        for step in self.steps:
            if step.name == step_name:
                step.status = status
                step.result = result
                step.error = error
                
                if status == "running":
                    step.start_time = time.time()
                elif status in ["completed", "failed"]:
                    step.end_time = time.time()
                
                break
    
    def _preprocess_conversation(self, conversation_text: str) -> Dict[str, Any]:
        """Preprocess the conversation text for analysis."""
        try:
            # Clean and normalize text
            cleaned_text = conversation_text.strip()
            
            # Extract basic statistics
            word_count = len(cleaned_text.split())
            char_count = len(cleaned_text)
            
            # Detect conversation structure
            lines = cleaned_text.split('\n')
            has_multiple_speakers = len(set(line.split(':')[0] for line in lines if ':' in line)) > 1
            
            return {
                "cleaned_text": cleaned_text,
                "word_count": word_count,
                "char_count": char_count,
                "line_count": len(lines),
                "has_multiple_speakers": has_multiple_speakers,
                "original_length": len(conversation_text)
            }
            
        except Exception as e:
            logger.error(f"Preprocessing error: {e}")
            return {
                "cleaned_text": conversation_text,
                "word_count": 0,
                "char_count": len(conversation_text),
                "line_count": 1,
                "has_multiple_speakers": False,
                "original_length": len(conversation_text),
                "error": str(e)
            }
    
    def _retrieve_pattern_definitions(self, preprocessed_data: Dict[str, Any]) -> Dict[str, Any]:
        """Retrieve relevant pattern definitions using RAG."""
        try:
            # Get pattern statistics for context
            pattern_stats = self.pattern_detector.get_pattern_statistics()
            
            # Get resource information
            resources = self.resource_manager.get_crisis_resources()
            
            return {
                "pattern_definitions": pattern_stats,
                "available_resources": resources,
                "rag_context": {
                    "total_patterns": pattern_stats.get("total_patterns", 0),
                    "total_indicators": pattern_stats.get("total_indicators", 0),
                    "severity_distribution": pattern_stats.get("patterns_by_severity", {})
                }
            }
            
        except Exception as e:
            logger.error(f"RAG retrieval error: {e}")
            return {"error": str(e)}
    
    def _detect_patterns(self, preprocessed_data: Dict[str, Any]) -> Dict[str, Any]:
        """Detect patterns using the pattern detector."""
        try:
            text = preprocessed_data.get("cleaned_text", "")
            patterns, score = self.pattern_detector.analyze_text(text)
            
            return {
                "patterns": patterns,
                "score": score,
                "pattern_count": len(patterns),
                "risk_level": self.pattern_detector.get_risk_level(score, len(patterns))
            }
            
        except Exception as e:
            logger.error(f"Pattern detection error: {e}")
            return {"error": str(e), "patterns": [], "score": 0.0}
    
    def _analyze_with_nemotron(self, conversation_text: str, 
                              rag_context: Dict[str, Any],
                              pattern_results: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze conversation using Nemotron AI."""
        try:
            # Prepare context for Nemotron
            context = {
                "conversation": conversation_text,
                "pattern_results": pattern_results,
                "rag_context": rag_context
            }
            
            # Get AI analysis
            ai_analysis = self.nimo_client.analyze_conversation(context)
            
            return {
                "ai_analysis": ai_analysis,
                "confidence": ai_analysis.get("confidence", 0.5),
                "reasoning": ai_analysis.get("reasoning", ""),
                "risk_assessment": ai_analysis.get("risk_level", "unknown")
            }
            
        except Exception as e:
            logger.error(f"Nemotron analysis error: {e}")
            return {
                "error": str(e),
                "ai_analysis": {},
                "confidence": 0.0,
                "reasoning": "AI analysis unavailable due to error",
                "risk_assessment": "unknown"
            }
    
    def _fuse_analyses(self, pattern_results: Dict[str, Any], 
                      nemotron_results: Dict[str, Any]) -> Dict[str, Any]:
        """Fuse rule-based and AI analyses."""
        try:
            # Combine pattern and AI results
            pattern_score = pattern_results.get("score", 0.0)
            ai_confidence = nemotron_results.get("confidence", 0.0)
            
            # Weighted fusion - AI is primary detection engine
            fusion_score = (ai_confidence * 100 * 0.7) + (pattern_score * 0.3)
            
            # Determine final risk level
            pattern_risk = pattern_results.get("risk_level", "safe")
            ai_risk = nemotron_results.get("risk_assessment", "unknown")
            
            # Use higher risk level
            risk_mapping = {"safe": 1, "concerning": 2, "abuse": 3, "unknown": 0}
            final_risk_level = max(pattern_risk, ai_risk, key=lambda x: risk_mapping.get(x, 0))
            
            return {
                "fusion_score": fusion_score,
                "final_risk_level": final_risk_level,
                "pattern_contribution": pattern_score * 0.5,
                "ai_contribution": ai_confidence * 100 * 0.5,
                "confidence": (ai_confidence + 0.5) / 2,  # Normalized confidence
                "patterns": pattern_results.get("patterns", [])  # Pass through detected patterns
            }
            
        except Exception as e:s
        logger.error(f"Fusion analysis error: {e}")
        return {
            "error": str(e),
            "fusion_score": 0.0,
            "final_risk_level": "unknown",
            "confidence": 0.0
        }
    
    def _generate_final_report(self, fusion_results: Dict[str, Any], 
                              rag_context: Dict[str, Any]) -> AnalysisResponse:
        """Generate the final analysis report."""
        try:
            # Extract results
            risk_level = fusion_results.get("final_risk_level", "safe")
            risk_score = fusion_results.get("fusion_score", 0.0)
            patterns = fusion_results.get("patterns", [])
            
            # Extract AI red flags from Nemotron analysis
            nemotron_results = {}
            for step in self.steps:
                if step.name == "nemotron_analysis" and step.result:
                    nemotron_results = step.result
                    break
            
            ai_red_flags = nemotron_results.get("ai_analysis", {}).get("red_flags", [])
            
            # Convert AI red flags to PatternInfo objects
            ai_patterns = []
            for flag in ai_red_flags:
                if isinstance(flag, dict):
                    from ..models.schemas import PatternInfo
                    ai_patterns.append(PatternInfo(
                        name=flag.get("type", "unknown"),
                        severity=flag.get("severity", "medium"),
                        description=flag.get("description", ""),
                        confidence=0.8,  # High confidence for AI-detected patterns
                        evidence=flag.get("evidence", "")
                    ))
            
            # Use AI patterns if available, otherwise fall back to rule-based patterns
            final_patterns = ai_patterns if ai_patterns else patterns
            
            # Convert risk level to enum
            try:
                risk_level_enum = RiskLevel(risk_level)
            except ValueError:
                risk_level_enum = RiskLevel.SAFE
            
            # Generate suggestions and resources
            suggestions = self._generate_suggestions(risk_level, final_patterns)
            resources = self._get_relevant_resources(risk_level, final_patterns)
            
            # Build analysis details (avoiding circular references)
            analysis_details = {
                "workflow_steps": [
                    {
                        "name": step.name,
                        "status": step.status,
                        "start_time": step.start_time,
                        "end_time": step.end_time,
                        "duration": (step.end_time - step.start_time) if step.start_time and step.end_time else None
                    } for step in self.steps
                ],
                "fusion_details": fusion_results,
                "rag_context": rag_context,
                "processing_metrics": self.metrics.copy()
            }
            
            return AnalysisResponse(
                risk_level=risk_level_enum,
                risk_score=min(risk_score / 100.0, 1.0),  # Normalize to 0-1
                patterns_detected=final_patterns,
                red_flags_count=len(final_patterns),
                suggestions=suggestions,
                resources=resources,
                analysis_details=analysis_details,
                reasoning=fusion_results.get("reasoning", "Analysis completed successfully")
            )
            
        except Exception as e:
            logger.error(f"Report generation error: {e}")
            return self._get_error_response(str(e))
    
    def _generate_suggestions(self, risk_level: str, patterns: List[PatternInfo]) -> List[str]:
        """Generate contextual suggestions based on detected patterns."""
        suggestions = []
        
        # Pattern-specific suggestions
        pattern_suggestions = {
            "gaslighting": [
                "Trust your memory and feelings - you're not imagining things",
                "Keep a record of conversations to maintain clarity",
                "Seek support from someone who validates your experiences"
            ],
            "guilt_tripping": [
                "Remember that you're not responsible for someone else's emotions",
                "Set clear boundaries about what you can and cannot do",
                "Practice saying 'no' without feeling guilty"
            ],
            "threats": [
                "Take any threats seriously and prioritize your safety",
                "Document all threatening communications",
                "Contact local authorities if you feel unsafe"
            ],
            "emotional_manipulation": [
                "Recognize that healthy relationships don't require you to prove your love",
                "Don't let someone make you doubt your feelings or intentions",
                "Consider talking to a counselor about relationship dynamics"
            ],
            "self_harm_coercion": [
                "Never harm yourself to prove anything to someone else",
                "This is a serious red flag - seek immediate support",
                "Contact a crisis hotline if you're being pressured to hurt yourself"
            ]
        }
        
        # Add pattern-specific suggestions
        for pattern in patterns:
            if pattern.name in pattern_suggestions:
                suggestions.extend(pattern_suggestions[pattern.name])
        
        # Add risk-level specific suggestions
        if risk_level == "abuse":
            if not any("safety" in s.lower() for s in suggestions):
                suggestions.insert(0, "Your safety is the most important priority right now")
            if not any("hotline" in s.lower() for s in suggestions):
                suggestions.append("Contact a domestic violence hotline for immediate support")
        elif risk_level == "concerning":
            suggestions.append("Trust your instincts - if something feels wrong, it probably is")
            suggestions.append("Consider talking to a trusted friend or counselor about this relationship")
        else:
            suggestions.append("Continue to monitor communication patterns for any changes")
            suggestions.append("Maintain healthy boundaries in your relationships")
        
        # Remove duplicates while preserving order
        seen = set()
        unique_suggestions = []
        for suggestion in suggestions:
            if suggestion not in seen:
                seen.add(suggestion)
                unique_suggestions.append(suggestion)
        
        return unique_suggestions[:6]  # Limit to 6 suggestions max
    
    def _get_relevant_resources(self, risk_level: str, patterns: List[PatternInfo]) -> List[str]:
        """Get relevant resources based on risk level and patterns."""
        if risk_level == "abuse":
            return [
                "National Domestic Violence Hotline: 1-800-799-7233",
                "Crisis Text Line: Text HOME to 741741",
                "Safety Planning Resources Available"
            ]
        elif risk_level == "concerning":
            return [
                "Consider professional counseling",
                "Support groups available in your area",
                "Relationship counseling resources"
            ]
        else:
            return [
                "Healthy relationship resources",
                "Communication skills workshops"
            ]
    
    def _get_error_response(self, error_message: str) -> AnalysisResponse:
        """Generate error response."""
        return AnalysisResponse(
            risk_level=RiskLevel.SAFE,
            risk_score=0.0,
            patterns_detected=[],
            red_flags_count=0,
            suggestions=["Analysis temporarily unavailable. Please try again."],
            resources=["Contact support if issues persist"],
            analysis_details={"error": error_message},
            reasoning=f"Analysis failed: {error_message}"
        )
    
    def _update_metrics(self, processing_time: float, success: bool) -> None:
        """Update performance metrics."""
        if success:
            self.metrics["successful_analyses"] += 1
        else:
            self.metrics["failed_analyses"] += 1
        
        # Update average processing time
        total = self.metrics["successful_analyses"] + self.metrics["failed_analyses"]
        if total > 0:
            current_avg = self.metrics["average_processing_time"]
            self.metrics["average_processing_time"] = (
                (current_avg * (total - 1) + processing_time) / total
            )
    
    def get_workflow_status(self) -> Dict[str, Any]:
        """Get current workflow status and metrics."""
        return {
            "current_step": next((step.name for step in self.steps if step.status == "running"), None),
            "completed_steps": [step.name for step in self.steps if step.status == "completed"],
            "failed_steps": [step.name for step in self.steps if step.status == "failed"],
            "metrics": self.metrics,
            "steps": [step.__dict__ for step in self.steps]
        }

