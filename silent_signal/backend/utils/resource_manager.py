"""
Resource Manager for SilentSignal

Manages crisis resources, help hotlines, and support information.
Production-quality implementation with comprehensive resource data.
"""

import json
import os
from typing import Dict, List, Any, Optional
import logging

logger = logging.getLogger(__name__)


class ResourceManager:
    """
    Manages crisis resources and support information.
    
    Provides access to help hotlines, support groups, and crisis resources
    with fallback mechanisms for offline operation.
    """
    
    def __init__(self, resource_data_path: Optional[str] = None):
        """
        Initialize the resource manager.
        
        Args:
            resource_data_path: Path to resource data JSON file
        """
        self.resource_data_path = resource_data_path
        self.resources = self._load_resources()
    
    def _load_resources(self) -> Dict[str, Any]:
        """Load resources from file or use defaults."""
        if self.resource_data_path and os.path.exists(self.resource_data_path):
            try:
                with open(self.resource_data_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                logger.warning(f"Failed to load resources from {self.resource_data_path}: {e}")
        
        # Return default resources
        return self._get_default_resources()
    
    def _get_default_resources(self) -> Dict[str, Any]:
        """Get default crisis resources."""
        return {
            "national_hotline": "National Domestic Violence Hotline: 1-800-799-7233",
            "crisis_text": "Crisis Text Line: Text HOME to 741741",
            "national_suicide_prevention": "National Suicide Prevention Lifeline: 988",
            "rape_crisis": "RAINN National Sexual Assault Hotline: 1-800-656-4673",
            "childhelp": "Childhelp National Child Abuse Hotline: 1-800-4-A-CHILD",
            "elder_abuse": "Elder Abuse Hotline: 1-800-252-8966",
            "mental_health": "National Mental Health Hotline: 1-800-950-6264",
            "safety_planning": {
                "title": "Safety Planning Resources",
                "description": "Important safety planning information",
                "resources": [
                    "Create a safety plan with trusted contacts",
                    "Keep important documents in a safe place",
                    "Identify safe places to go in an emergency",
                    "Consider getting a protective order",
                    "Document any abuse or threats"
                ]
            },
            "counseling": {
                "title": "Professional Counseling Services",
                "description": "Mental health and relationship counseling",
                "resources": [
                    "Individual therapy for emotional support",
                    "Couples counseling for relationship issues",
                    "Group therapy for survivors of abuse",
                    "Trauma-informed therapy services"
                ]
            },
            "support_groups": {
                "title": "Support Groups",
                "description": "Peer support and community resources",
                "resources": [
                    "Domestic violence survivor groups",
                    "Mental health support groups",
                    "Online support communities",
                    "Local community centers"
                ]
            },
            "legal_resources": {
                "title": "Legal Resources",
                "description": "Legal assistance and protection options",
                "resources": [
                    "Protective orders and restraining orders",
                    "Legal aid services",
                    "Family court resources",
                    "Immigration legal services"
                ]
            },
            "emergency_services": {
                "title": "Emergency Services",
                "description": "Immediate help and emergency response",
                "resources": [
                    "Call 911 for immediate danger",
                    "Local emergency services",
                    "Hospital emergency rooms",
                    "Crisis intervention teams"
                ]
            }
        }
    
    def get_crisis_resources(self) -> Dict[str, Any]:
        """Get all available crisis resources."""
        return self.resources
    
    def get_resource_by_category(self, category: str) -> Optional[Dict[str, Any]]:
        """Get resources for a specific category."""
        return self.resources.get(category)
    
    def get_hotline_numbers(self) -> Dict[str, str]:
        """Get all hotline numbers."""
        hotlines = {}
        for key, value in self.resources.items():
            if isinstance(value, str) and any(word in value.lower() for word in ["hotline", "lifeline", "text"]):
                hotlines[key] = value
        return hotlines
    
    def get_resources_for_risk_level(self, risk_level: str) -> List[str]:
        """Get appropriate resources based on risk level."""
        if risk_level == "abuse":
            return [
                self.resources.get("national_hotline", ""),
                self.resources.get("crisis_text", ""),
                self.resources.get("emergency_services", {}).get("title", ""),
                "Document the abuse and consider legal protection"
            ]
        elif risk_level == "concerning":
            return [
                self.resources.get("counseling", {}).get("title", ""),
                self.resources.get("support_groups", {}).get("title", ""),
                "Consider professional help and support"
            ]
        else:
            return [
                "Maintain healthy communication",
                "Continue to trust your instincts",
                "Seek help if the situation changes"
            ]
    
    def search_resources(self, query: str) -> List[Dict[str, Any]]:
        """Search resources by query."""
        results = []
        query_lower = query.lower()
        
        for key, value in self.resources.items():
            if isinstance(value, str):
                if query_lower in value.lower() or query_lower in key.lower():
                    results.append({
                        "category": key,
                        "content": value,
                        "type": "hotline"
                    })
            elif isinstance(value, dict):
                title = value.get("title", "")
                description = value.get("description", "")
                if (query_lower in title.lower() or 
                    query_lower in description.lower() or 
                    query_lower in key.lower()):
                    results.append({
                        "category": key,
                        "content": value,
                        "type": "resource_group"
                    })
        
        return results
    
    def add_resource(self, category: str, resource_data: Any) -> None:
        """Add a new resource category."""
        self.resources[category] = resource_data
        self._save_resources()
    
    def update_resource(self, category: str, resource_data: Any) -> None:
        """Update an existing resource category."""
        if category in self.resources:
            self.resources[category] = resource_data
            self._save_resources()
        else:
            logger.warning(f"Resource category '{category}' not found for update")
    
    def _save_resources(self) -> None:
        """Save resources to file."""
        if self.resource_data_path:
            try:
                with open(self.resource_data_path, 'w', encoding='utf-8') as f:
                    json.dump(self.resources, f, indent=2, ensure_ascii=False)
                logger.info(f"Resources saved to {self.resource_data_path}")
            except Exception as e:
                logger.error(f"Failed to save resources: {e}")
    
    def get_resource_statistics(self) -> Dict[str, Any]:
        """Get statistics about available resources."""
        stats = {
            "total_categories": len(self.resources),
            "hotline_count": len(self.get_hotline_numbers()),
            "resource_groups": 0,
            "total_resources": 0
        }
        
        for key, value in self.resources.items():
            if isinstance(value, dict):
                stats["resource_groups"] += 1
                if "resources" in value:
                    stats["total_resources"] += len(value["resources"])
        
        return stats
    
    def validate_resources(self) -> Dict[str, List[str]]:
        """Validate resource data integrity."""
        validation_results = {
            "errors": [],
            "warnings": []
        }
        
        # Check for required categories
        required_categories = ["national_hotline", "crisis_text"]
        for category in required_categories:
            if category not in self.resources:
                validation_results["errors"].append(f"Missing required category: {category}")
        
        # Check for valid phone numbers in hotlines
        for key, value in self.resources.items():
            if isinstance(value, str) and "hotline" in key.lower():
                if not any(char.isdigit() for char in value):
                    validation_results["warnings"].append(f"Hotline '{key}' may not contain phone number")
        
        # Check resource group structure
        for key, value in self.resources.items():
            if isinstance(value, dict):
                if "title" not in value:
                    validation_results["warnings"].append(f"Resource group '{key}' missing title")
                if "resources" not in value:
                    validation_results["warnings"].append(f"Resource group '{key}' missing resources list")
        
        return validation_results

