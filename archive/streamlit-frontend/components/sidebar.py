"""
Sidebar component for SilentSignal frontend.
"""

import streamlit as st
from typing import Dict, Any


def render_sidebar():
    """Render the application sidebar."""
    with st.sidebar:
        st.markdown("## 🧭 Navigation")
        
        # Navigation buttons
        pages = {
            "🔍 Analyze": "analyze",
            "📚 Examples": "examples", 
            "📊 Metrics": "metrics",
            "🆘 Resources": "resources"
        }
        
        for page_name, page_key in pages.items():
            if st.button(page_name, use_container_width=True):
                st.session_state.current_page = page_key
                st.rerun()
        
        st.markdown("---")
        
        # Disguise mode toggle
        st.markdown("## 🔒 Safety Features")
        
        disguise_mode = st.checkbox(
            "Disguise Mode",
            value=st.session_state.get("disguise_mode", False),
            help="Switch to calculator view for privacy"
        )
        
        if disguise_mode != st.session_state.get("disguise_mode", False):
            st.session_state.disguise_mode = disguise_mode
            st.rerun()
        
        if st.session_state.get("disguise_mode", False):
            st.markdown("""
            <div style="background-color: #f0f0f0; padding: 1rem; border-radius: 8px;">
                <h4>🧮 Calculator Mode</h4>
                <p>This app appears as a calculator to protect your privacy.</p>
            </div>
            """, unsafe_allow_html=True)
        
        st.markdown("---")
        
        # Quick stats
        if st.session_state.get("analysis_history"):
            st.markdown("## 📈 Quick Stats")
            
            history = st.session_state.analysis_history
            total_analyses = len(history)
            
            # Count risk levels
            risk_counts = {"safe": 0, "concerning": 0, "abuse": 0}
            for analysis in history:
                risk_level = analysis["response"].get("risk_level", "safe")
                if risk_level in risk_counts:
                    risk_counts[risk_level] += 1
            
            st.metric("Total Analyses", total_analyses)
            st.metric("Safe Conversations", risk_counts["safe"])
            st.metric("Concerning Patterns", risk_counts["concerning"])
            st.metric("Potential Abuse", risk_counts["abuse"])
        
        st.markdown("---")
        
        # About section
        st.markdown("## ℹ️ About SilentSignal")
        st.markdown("""
        SilentSignal uses advanced AI to detect emotional abuse patterns including:
        
        • Gaslighting & reality denial
        • Guilt-tripping & manipulation
        • Threats & intimidation
        • Controlling behavior
        • Isolation attempts
        
        **Privacy First**: No data is stored or transmitted.
        """)
        
        # Emergency resources
        st.markdown("## 🚨 Emergency")
        st.markdown("""
        **If you're in immediate danger:**
        
        📞 Call 911
        
        **National Hotlines:**
        • Domestic Violence: 1-800-799-7233
        • Crisis Text: Text HOME to 741741
        • Suicide Prevention: 988
        """)

