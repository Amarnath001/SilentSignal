"""
Analyzer - Fusion Logic Engine

Combines rule-based pattern detection with AI analysis for comprehensive
emotional abuse detection. Production-quality implementation with advanced
scoring algorithms.
"""

from typing import Dict, List, Any, Tuple
import logging
import math

from ..models.schemas import PatternInfo, RiskLevel

logger = logging.getLogger(__name__)


class Analyzer:
    """
    Fusion analyzer that combines multiple analysis methods.
    
    Integrates rule-based pattern detection with AI analysis to provide
    comprehensive emotional abuse detection with confidence scoring.
    """
    
    def __init__(self):
        """Initialize the analyzer with scoring weights."""
        # Scoring weights for different analysis components
        self.weights = {
            "pattern_score": 0.4,      # Rule-based pattern detection
            "ai_confidence": 0.3,      # AI analysis confidence
            "pattern_count": 0.2,      # Number of patterns detected
            "severity_factor": 0.1     # Severity of detected patterns
        }
        
        # Risk level thresholds
        self.thresholds = {
            "abuse": 0.75,
            "concerning": 0.45,
            "safe": 0.0
        }
        
        # Severity multipliers
        self.severity_multipliers = {
            "critical": 2.0,
            "high": 1.5,
            "medium": 1.0,
            "low": 0.5
        }
    
    def analyze_fusion(self, pattern_results: Dict[str, Any], 
                      ai_results: Dict[str, Any]) -> Dict[str, Any]:
        """
        Perform fusion analysis combining pattern and AI results.
        
        Args:
            pattern_results: Results from pattern detection
            ai_results: Results from AI analysis
            
        Returns:
            Fused analysis with confidence scores and risk assessment
        """
        try:
            # Extract key metrics
            pattern_score = pattern_results.get("score", 0.0)
            pattern_count = pattern_results.get("pattern_count", 0)
            patterns = pattern_results.get("patterns", [])
            
            ai_confidence = ai_results.get("confidence", 0.0)
            ai_risk = ai_results.get("risk_level", "unknown")
            ai_reasoning = ai_results.get("reasoning", "")
            
            # Calculate fusion metrics
            fusion_metrics = self._calculate_fusion_metrics(
                pattern_score, pattern_count, patterns, ai_confidence
            )
            
            # Determine final risk level
            final_risk_level = self._determine_final_risk_level(
                fusion_metrics, ai_risk, pattern_results.get("risk_level", "safe")
            )
            
            # Calculate confidence score
            confidence_score = self._calculate_confidence_score(
                fusion_metrics, ai_confidence, pattern_count
            )
            
            # Generate reasoning
            reasoning = self._generate_fusion_reasoning(
                pattern_results, ai_results, fusion_metrics, final_risk_level
            )
            
            return {
                "final_risk_level": final_risk_level,
                "confidence_score": confidence_score,
                "fusion_metrics": fusion_metrics,
                "reasoning": reasoning,
                "pattern_contribution": fusion_metrics["pattern_contribution"],
                "ai_contribution": fusion_metrics["ai_contribution"],
                "agreement_level": self._calculate_agreement_level(
                    pattern_results.get("risk_level", "safe"), ai_risk
                )
            }
            
        except Exception as e:
            logger.error(f"Fusion analysis error: {e}")
            return self._get_fallback_analysis(str(e))
    
    def _calculate_fusion_metrics(self, pattern_score: float, pattern_count: int,
                                 patterns: List[PatternInfo], ai_confidence: float) -> Dict[str, float]:
        """Calculate detailed fusion metrics."""
        # Normalize pattern score (assuming max score around 100)
        normalized_pattern_score = min(pattern_score / 100.0, 1.0)
        
        # Calculate severity factor
        severity_factor = self._calculate_severity_factor(patterns)
        
        # Calculate pattern contribution
        pattern_contribution = (
            normalized_pattern_score * self.weights["pattern_score"] +
            (pattern_count / 10.0) * self.weights["pattern_count"] +  # Normalize count
            severity_factor * self.weights["severity_factor"]
        )
        
        # Calculate AI contribution
        ai_contribution = ai_confidence * self.weights["ai_confidence"]
        
        # Calculate combined score
        combined_score = pattern_contribution + ai_contribution
        
        return {
            "normalized_pattern_score": normalized_pattern_score,
            "severity_factor": severity_factor,
            "pattern_contribution": pattern_contribution,
            "ai_contribution": ai_contribution,
            "combined_score": combined_score,
            "pattern_count": pattern_count,
            "ai_confidence": ai_confidence
        }
    
    def _calculate_severity_factor(self, patterns: List[PatternInfo]) -> float:
        """Calculate severity factor based on detected patterns."""
        if not patterns:
            return 0.0
        
        total_severity = 0.0
        for pattern in patterns:
            severity = getattr(pattern, 'severity', 'medium')
            multiplier = self.severity_multipliers.get(severity, 1.0)
            confidence = getattr(pattern, 'confidence', 0.5)
            total_severity += multiplier * confidence
        
        # Normalize by number of patterns
        return min(total_severity / len(patterns), 2.0)
    
    def _determine_final_risk_level(self, fusion_metrics: Dict[str, float],
                                   ai_risk: str, pattern_risk: str) -> str:
        """Determine final risk level using multiple criteria."""
        combined_score = fusion_metrics["combined_score"]
        
        # Risk level mapping for comparison
        risk_values = {"safe": 1, "concerning": 2, "abuse": 3, "unknown": 0}
        
        # Get risk levels from different sources
        ai_risk_value = risk_values.get(ai_risk, 0)
        pattern_risk_value = risk_values.get(pattern_risk, 0)
        
        # Use highest risk level as base
        max_risk_value = max(ai_risk_value, pattern_risk_value)
        
        # Adjust based on combined score
        if combined_score >= self.thresholds["abuse"]:
            return "abuse"
        elif combined_score >= self.thresholds["concerning"] or max_risk_value >= 2:
            return "concerning"
        else:
            return "safe"
    
    def _calculate_confidence_score(self, fusion_metrics: Dict[str, float],
                                   ai_confidence: float, pattern_count: int) -> float:
        """Calculate overall confidence score."""
        # Base confidence from AI
        base_confidence = ai_confidence
        
        # Boost confidence if patterns agree
        if pattern_count > 0:
            pattern_agreement_boost = min(pattern_count * 0.1, 0.3)
            base_confidence += pattern_agreement_boost
        
        # Boost confidence if fusion score is high
        fusion_boost = min(fusion_metrics["combined_score"] * 0.2, 0.2)
        base_confidence += fusion_boost
        
        # Penalize if there's disagreement
        agreement_level = self._calculate_agreement_level(
            fusion_metrics.get("pattern_risk", "safe"),
            fusion_metrics.get("ai_risk", "unknown")
        )
        if agreement_level < 0.5:
            base_confidence *= 0.8
        
        return min(max(base_confidence, 0.0), 1.0)
    
    def _calculate_agreement_level(self, pattern_risk: str, ai_risk: str) -> float:
        """Calculate agreement level between pattern and AI risk assessments."""
        if pattern_risk == ai_risk:
            return 1.0
        
        # Risk level ordering
        risk_order = ["safe", "concerning", "abuse", "unknown"]
        
        try:
            pattern_index = risk_order.index(pattern_risk)
            ai_index = risk_order.index(ai_risk)
            
            # Calculate distance
            distance = abs(pattern_index - ai_index)
            max_distance = len(risk_order) - 1
            
            # Convert distance to agreement (closer = higher agreement)
            agreement = 1.0 - (distance / max_distance)
            return max(agreement, 0.0)
            
        except ValueError:
            # If risk levels are not in our known list
            return 0.5
    
    def _generate_fusion_reasoning(self, pattern_results: Dict[str, Any],
                                  ai_results: Dict[str, Any],
                                  fusion_metrics: Dict[str, float],
                                  final_risk_level: str) -> str:
        """Generate comprehensive reasoning for the fusion analysis."""
        reasoning_parts = []
        
        # Pattern analysis summary
        pattern_count = pattern_results.get("pattern_count", 0)
        if pattern_count > 0:
            reasoning_parts.append(
                f"Rule-based analysis detected {pattern_count} concerning patterns "
                f"with a confidence score of {fusion_metrics['normalized_pattern_score']:.2f}."
            )
        else:
            reasoning_parts.append("Rule-based analysis found no concerning patterns.")
        
        # AI analysis summary
        ai_confidence = ai_results.get("confidence", 0.0)
        ai_reasoning = ai_results.get("reasoning", "")
        if ai_confidence > 0:
            reasoning_parts.append(
                f"AI analysis provided additional insights with {ai_confidence:.2f} confidence."
            )
            if ai_reasoning and len(ai_reasoning) > 50:
                reasoning_parts.append(f"AI reasoning: {ai_reasoning[:200]}...")
        
        # Fusion summary
        combined_score = fusion_metrics["combined_score"]
        agreement_level = self._calculate_agreement_level(
            pattern_results.get("risk_level", "safe"),
            ai_results.get("risk_level", "unknown")
        )
        
        reasoning_parts.append(
            f"Fusion analysis combined both approaches with a combined score of {combined_score:.2f} "
            f"and {agreement_level:.2f} agreement between methods."
        )
        
        # Final assessment
        if final_risk_level == "abuse":
            reasoning_parts.append(
                "Multiple indicators suggest potential emotional abuse requiring immediate attention."
            )
        elif final_risk_level == "concerning":
            reasoning_parts.append(
                "Some concerning patterns detected that warrant monitoring and attention."
            )
        else:
            reasoning_parts.append(
                "No significant concerning patterns detected in this conversation."
            )
        
        return " ".join(reasoning_parts)
    
    def _get_fallback_analysis(self, error_message: str) -> Dict[str, Any]:
        """Generate fallback analysis when fusion fails."""
        return {
            "final_risk_level": "unknown",
            "confidence_score": 0.0,
            "fusion_metrics": {
                "combined_score": 0.0,
                "pattern_contribution": 0.0,
                "ai_contribution": 0.0
            },
            "reasoning": f"Analysis unavailable due to error: {error_message}",
            "pattern_contribution": 0.0,
            "ai_contribution": 0.0,
            "agreement_level": 0.0
        }
    
    def get_analysis_statistics(self) -> Dict[str, Any]:
        """Get statistics about the analyzer configuration."""
        return {
            "weights": self.weights,
            "thresholds": self.thresholds,
            "severity_multipliers": self.severity_multipliers,
            "total_weights": sum(self.weights.values())
        }
    
    def update_weights(self, new_weights: Dict[str, float]) -> None:
        """Update scoring weights."""
        # Validate weights
        total_weight = sum(new_weights.values())
        if abs(total_weight - 1.0) > 0.01:
            logger.warning(f"Weights sum to {total_weight}, not 1.0")
        
        self.weights.update(new_weights)
        logger.info(f"Updated analyzer weights: {self.weights}")
    
    def update_thresholds(self, new_thresholds: Dict[str, float]) -> None:
        """Update risk level thresholds."""
        self.thresholds.update(new_thresholds)
        logger.info(f"Updated analyzer thresholds: {self.thresholds}")

