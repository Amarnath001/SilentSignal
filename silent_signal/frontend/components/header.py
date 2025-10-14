"""
Header component for SilentSignal frontend.
"""

import streamlit as st
from typing import Dict, Any


def render_header():
    """Render the main application header."""
    st.markdown("""
    <div class="main-header">
        <h1>🛡️ SilentSignal</h1>
        <p style="font-size: 1.2rem; margin: 0;">
            AI-Powered Emotional Abuse Detection System
        </p>
        <p style="font-size: 0.9rem; margin: 0; opacity: 0.9;">
            Detecting manipulation, gaslighting, and coercive control patterns
        </p>
    </div>
    """, unsafe_allow_html=True)

