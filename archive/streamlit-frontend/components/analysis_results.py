"""
Analysis results component for SilentSignal frontend.
"""

import streamlit as st
from typing import Dict, Any


def render_analysis_results(analysis_data: Dict[str, Any]):
    """Render analysis results."""
    response = analysis_data["response"]
    risk_level = response.get("risk_level", "safe")
    
    # Risk level display
    risk_emoji = {"safe": "✅", "concerning": "⚠️", "abuse": "🚨"}
    emoji = risk_emoji.get(risk_level, "❓")
    
    risk_class = f"risk-{risk_level}"
    
    st.markdown(f"""
    <div class="risk-card {risk_class}">
        <h3>{emoji} Risk Level: {risk_level.title()}</h3>
        <p><strong>Confidence Score:</strong> {response.get('risk_score', 0):.2f}</p>
        <p><strong>Red Flags Detected:</strong> {response.get('red_flags_count', 0)}</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Patterns detected
    patterns = response.get("patterns_detected", [])
    if patterns:
        st.markdown("### 🔍 Detected Patterns")
        for pattern in patterns:
            pattern_name = pattern.get("name", "").replace("_", " ").title()
            severity = pattern.get("severity", "medium")
            confidence = pattern.get("confidence", 0)
            
            st.markdown(f"""
            <div class="pattern-item">
                <strong>{pattern_name}</strong> ({severity}) - Confidence: {confidence:.2f}
                <br><small>{pattern.get('description', '')}</small>
            </div>
            """, unsafe_allow_html=True)
    
    # Suggestions
    suggestions = response.get("suggestions", [])
    if suggestions:
        st.markdown("### 💡 Recommendations")
        for suggestion in suggestions:
            st.markdown(f"• {suggestion}")
    
    # Resources
    resources = response.get("resources", [])
    if resources:
        st.markdown("### 🆘 Support Resources")
        for resource in resources:
            st.markdown(f"• {resource}")

