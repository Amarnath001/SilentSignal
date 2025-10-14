"""
Pattern Detector - Rule-based Pattern Detection Engine

Detects emotional abuse patterns using regex and keyword matching.
Production-quality implementation with clean separation of concerns.
"""

import re
import json
from typing import Dict, List, Any, Tuple, Optional
from collections import defaultdict
import logging

from ..models.schemas import PatternInfo

logger = logging.getLogger(__name__)


class PatternDetector:
    """
    Advanced pattern detector for emotional abuse patterns.
    
    Uses regex patterns and keyword matching for detection with
    configurable severity levels and confidence scoring.
    """
    
    def __init__(self, pattern_knowledge_path: Optional[str] = None):
        """
        Initialize the pattern detector.
        
        Args:
            pattern_knowledge_path: Path to pattern knowledge JSON file
        """
        self.patterns = self._initialize_patterns()
        self.severity_weights = {
            "critical": 10,
            "high": 7,
            "medium": 4,
            "low": 2
        }
        
        if pattern_knowledge_path:
            self._load_pattern_knowledge(pattern_knowledge_path)
    
    def _initialize_patterns(self) -> Dict[str, Dict]:
        """Initialize comprehensive patterns for detection."""
        return {
            "gaslighting": {
                "patterns": [
                    r"that never happened",
                    r"you're imagining things",
                    r"you're making that up",
                    r"that's not what i said",
                    r"you're remembering it wrong",
                    r"you're crazy",
                    r"you're delusional",
                    r"that's all in your head",
                    r"you're confused",
                    r"you're misremembering",
                    r"that's not how it went",
                    r"you're twisting my words",
                    r"i never said that",
                    r"you're hearing things",
                    r"that's not what happened"
                ],
                "severity": "high",
                "description": "Reality denial and manipulation tactics"
            },
            "guilt_tripping": {
                "patterns": [
                    r"if you really cared",
                    r"if you loved me",
                    r"you don't care about",
                    r"you never think about",
                    r"you're being selfish",
                    r"after all i've done",
                    r"you owe me",
                    r"i've given up so much",
                    r"you don't appreciate",
                    r"you take me for granted",
                    r"you don't understand how hard",
                    r"you're breaking my heart",
                    r"you're killing me",
                    r"you don't love me anymore",
                    r"you're abandoning me"
                ],
                "severity": "medium",
                "description": "Emotional manipulation through guilt"
            },
            "threats": {
                "patterns": [
                    r"i'll hurt myself",
                    r"i'll kill myself",
                    r"you'll regret this",
                    r"i'll make you pay",
                    r"you'll be sorry",
                    r"i'll destroy you",
                    r"i'll ruin your life",
                    r"you'll never see",
                    r"i'll take everything",
                    r"you'll lose everything",
                    r"i'll hurt someone",
                    r"i'll get you fired",
                    r"i'll tell everyone",
                    r"you'll be alone",
                    r"no one else will want you"
                ],
                "severity": "critical",
                "description": "Direct threats and intimidation"
            },
            "control": {
                "patterns": [
                    r"you can't do that",
                    r"you're not allowed to",
                    r"i won't let you",
                    r"you need my permission",
                    r"you belong to me",
                    r"you're mine",
                    r"i control you",
                    r"you do as i say",
                    r"you have no choice",
                    r"you can't leave",
                    r"you're trapped",
                    r"you're stuck with me",
                    r"i own you",
                    r"you're my property",
                    r"you have no rights"
                ],
                "severity": "critical",
                "description": "Controlling behavior and ownership claims"
            },
            "isolation": {
                "patterns": [
                    r"your friends are toxic",
                    r"your family doesn't care",
                    r"they're trying to break us up",
                    r"they don't understand us",
                    r"you should cut them off",
                    r"they're jealous of us",
                    r"they're bad influences",
                    r"you don't need them",
                    r"i'm all you have",
                    r"only i understand you",
                    r"they're using you",
                    r"they don't really love you",
                    r"they're against us",
                    r"you can't trust them",
                    r"they're manipulating you"
                ],
                "severity": "high",
                "description": "Attempts to isolate from support network"
            },
            "intimidation": {
                "patterns": [
                    r"you better watch out",
                    r"you don't know who you're dealing with",
                    r"i have connections",
                    r"you'll see what happens",
                    r"i'm not someone to mess with",
                    r"you're playing with fire",
                    r"you don't want to make me angry",
                    r"i can make things difficult",
                    r"you'll learn your lesson",
                    r"i'll show you",
                    r"you're making a mistake",
                    r"you'll pay for this",
                    r"i won't forget this",
                    r"you've crossed the line",
                    r"you're pushing me too far"
                ],
                "severity": "high",
                "description": "Intimidation and implied threats"
            },
            "sexual_coercion": {
                "patterns": [
                    r"if you love me you would",
                    r"you're not attracted to me",
                    r"you don't want me",
                    r"you're frigid",
                    r"you're broken",
                    r"other women would",
                    r"you're not normal",
                    r"you owe me",
                    r"i have needs",
                    r"you're my wife/husband",
                    r"it's your duty",
                    r"you're being selfish",
                    r"you're rejecting me",
                    r"you don't love me",
                    r"you're cheating on me"
                ],
                "severity": "critical",
                "description": "Sexual coercion and manipulation"
            },
            "financial_abuse": {
                "patterns": [
                    r"you don't need money",
                    r"i'll handle the finances",
                    r"you're bad with money",
                    r"you can't be trusted",
                    r"you'll just waste it",
                    r"i earn the money",
                    r"you don't contribute",
                    r"you're dependent on me",
                    r"you have no choice",
                    r"you need my permission",
                    r"you can't afford to leave",
                    r"you're stuck here",
                    r"you have nothing without me",
                    r"you'll be homeless",
                    r"you'll lose everything"
                ],
                "severity": "high",
                "description": "Financial control and manipulation"
            },
            "passive_aggressive": {
                "patterns": [
                    r"fine, whatever",
                    r"i don't care",
                    r"do whatever you want",
                    r"i'm not mad",
                    r"nothing's wrong",
                    r"i'm fine",
                    r"you wouldn't understand",
                    r"it doesn't matter",
                    r"forget it",
                    r"never mind",
                    r"i give up",
                    r"you always do this",
                    r"typical",
                    r"of course",
                    r"surprise, surprise"
                ],
                "severity": "low",
                "description": "Passive-aggressive communication"
            },
            "sarcasm": {
                "patterns": [
                    r"oh, great",
                    r"wonderful",
                    r"perfect",
                    r"brilliant",
                    r"excellent",
                    r"fantastic",
                    r"amazing",
                    r"outstanding",
                    r"superb",
                    r"marvelous",
                    r"incredible",
                    r"unbelievable",
                    r"spectacular",
                    r"remarkable",
                    r"extraordinary"
                ],
                "severity": "low",
                "description": "Sarcastic and mocking language"
            }
        }
    
    def _load_pattern_knowledge(self, knowledge_path: str) -> None:
        """Load additional pattern knowledge from JSON file."""
        try:
            with open(knowledge_path, 'r', encoding='utf-8') as f:
                knowledge_data = json.load(f)
                
            # Merge with existing patterns
            for pattern_name, pattern_data in knowledge_data.items():
                if pattern_name in self.patterns:
                    # Update existing pattern
                    if 'patterns' in pattern_data:
                        self.patterns[pattern_name]['patterns'].extend(pattern_data['patterns'])
                    if 'severity' in pattern_data:
                        self.patterns[pattern_name]['severity'] = pattern_data['severity']
                    if 'description' in pattern_data:
                        self.patterns[pattern_name]['description'] = pattern_data['description']
                else:
                    # Add new pattern
                    self.patterns[pattern_name] = pattern_data
                    
        except Exception as e:
            logger.warning(f"Failed to load pattern knowledge from {knowledge_path}: {e}")
    
    def analyze_text(self, text: str) -> Tuple[List[PatternInfo], float]:
        """
        Analyze text for emotional abuse patterns.
        
        Args:
            text: Input text to analyze
            
        Returns:
            Tuple of (detected_patterns, total_score)
        """
        if not text or not text.strip():
            return [], 0.0
            
        text_lower = text.lower()
        detected_patterns = []
        total_score = 0.0
        
        for pattern_name, pattern_config in self.patterns.items():
            patterns = pattern_config.get("patterns", [])
            severity = pattern_config.get("severity", "medium")
            description = pattern_config.get("description", "")
            
            matches = []
            for pattern in patterns:
                if re.search(pattern, text_lower, re.IGNORECASE):
                    matches.append(pattern)
            
            if matches:
                # Calculate confidence based on number of matches
                confidence = min(len(matches) / len(patterns), 1.0)
                
                # Calculate score
                severity_weight = self.severity_weights.get(severity, 4)
                pattern_score = len(matches) * severity_weight * confidence
                total_score += pattern_score
                
                pattern_info = PatternInfo(
                    name=pattern_name,
                    severity=severity,
                    description=description,
                    confidence=confidence
                )
                detected_patterns.append(pattern_info)
        
        return detected_patterns, total_score
    
    def get_risk_level(self, score: float, pattern_count: int) -> str:
        """
        Determine risk level based on score and pattern count.
        
        Args:
            score: Total pattern score
            pattern_count: Number of different patterns detected
            
        Returns:
            Risk level string
        """
        if score >= 50 or pattern_count >= 5:
            return "abuse"
        elif score >= 20 or pattern_count >= 3:
            return "concerning"
        else:
            return "safe"
    
    def get_pattern_statistics(self) -> Dict[str, Any]:
        """Get statistics about available patterns."""
        stats = {
            "total_patterns": len(self.patterns),
            "patterns_by_severity": defaultdict(int),
            "total_indicators": 0
        }
        
        for pattern_name, pattern_config in self.patterns.items():
            severity = pattern_config.get("severity", "medium")
            patterns = pattern_config.get("patterns", [])
            
            stats["patterns_by_severity"][severity] += 1
            stats["total_indicators"] += len(patterns)
        
        return dict(stats)

