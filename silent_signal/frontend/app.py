"""
SilentSignal Frontend - Streamlit Application

Modern, production-quality Streamlit interface for SilentSignal.
Features clean UI, real-time analysis, and comprehensive safety features.
"""

import streamlit as st
import requests
import json
import time
from typing import Dict, Any, Optional
import logging

from silent_signal.frontend.components import (
    render_header, render_sidebar, render_main_content,
    render_analysis_results, render_safety_features,
    render_examples, render_metrics_dashboard
)
from silent_signal.frontend.utils.api_client import APIClient

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Page configuration
st.set_page_config(
    page_title="SilentSignal - AI Emotional Abuse Detection",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for modern UI
st.markdown("""
<style>
    .main-header {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        text-align: center;
        color: white;
    }
    
    .risk-card {
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        border-left: 4px solid;
    }
    
    .risk-safe {
        background-color: #d4edda;
        border-left-color: #28a745;
    }
    
    .risk-concerning {
        background-color: #fff3cd;
        border-left-color: #ffc107;
    }
    
    .risk-abuse {
        background-color: #f8d7da;
        border-left-color: #dc3545;
    }
    
    .pattern-item {
        background-color: #f8f9fa;
        padding: 0.5rem;
        margin: 0.25rem 0;
        border-radius: 4px;
        border-left: 3px solid #007bff;
    }
    
    .metric-card {
        background-color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        text-align: center;
    }
    
    .emergency-button {
        background-color: #dc3545;
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        width: 100%;
    }
</style>
""", unsafe_allow_html=True)


def main():
    """Main application entry point."""
    try:
        # Initialize session state
        initialize_session_state()
        
        # Render header
        render_header()
        
        # Initialize API client
        api_client = APIClient()
        
        # Check API connection
        if not api_client.is_connected():
            st.error("⚠️ Cannot connect to SilentSignal API. Please ensure the backend is running.")
            st.stop()
        
        # Render sidebar
        render_sidebar()
        
        # Get current page
        page = st.session_state.get("current_page", "analyze")
        
        # Render main content based on current page
        if page == "analyze":
            render_analysis_page(api_client)
        elif page == "examples":
            render_examples_page(api_client)
        elif page == "metrics":
            render_metrics_page(api_client)
        elif page == "resources":
            render_resources_page(api_client)
        else:
            render_analysis_page(api_client)
        
        # Render safety features
        render_safety_features()
        
    except Exception as e:
        logger.error(f"Application error: {e}")
        st.error(f"An error occurred: {str(e)}")
        st.error("Please refresh the page and try again.")


def initialize_session_state():
    """Initialize session state variables."""
    if "current_page" not in st.session_state:
        st.session_state.current_page = "analyze"
    
    if "analysis_history" not in st.session_state:
        st.session_state.analysis_history = []
    
    if "disguise_mode" not in st.session_state:
        st.session_state.disguise_mode = False
    
    if "last_analysis" not in st.session_state:
        st.session_state.last_analysis = None


def render_analysis_page(api_client: APIClient):
    """Render the main analysis page."""
    st.markdown("## 🔍 Conversation Analysis")
    
    # Analysis input section
    with st.container():
        st.markdown("### Enter Conversation Text")
        
        # Text input
        conversation_text = st.text_area(
            "Conversation to analyze:",
            height=200,
            placeholder="Enter the conversation text you'd like to analyze for emotional abuse patterns...",
            help="Paste the conversation text here. The system will analyze it for signs of emotional abuse, manipulation, or coercive control."
        )
        
        # Analysis options
        col1, col2, col3 = st.columns(3)
        
        with col1:
            include_details = st.checkbox("Include detailed analysis", value=True)
        
        with col2:
            show_patterns = st.checkbox("Show detected patterns", value=True)
        
        with col3:
            get_resources = st.checkbox("Include support resources", value=True)
        
        # Analyze button
        if st.button("🔍 Analyze Conversation", type="primary", use_container_width=True):
            if conversation_text.strip():
                perform_analysis(api_client, conversation_text, {
                    "include_details": include_details,
                    "show_patterns": show_patterns,
                    "get_resources": get_resources
                })
            else:
                st.warning("Please enter some conversation text to analyze.")
    
    # Display analysis results if available
    if st.session_state.last_analysis:
        render_analysis_results(st.session_state.last_analysis)


def render_examples_page(api_client: APIClient):
    """Render the examples page."""
    st.markdown("## 📚 Example Conversations")
    
    render_examples(api_client)


def render_metrics_page(api_client: APIClient):
    """Render the metrics dashboard page."""
    st.markdown("## 📊 Analysis Metrics")
    
    try:
        metrics_data = api_client.get_metrics()
        render_metrics_dashboard(metrics_data)
    except Exception as e:
        st.error(f"Failed to load metrics: {str(e)}")


def render_resources_page(api_client: APIClient):
    """Render the resources page."""
    st.markdown("## 🆘 Crisis Resources & Support")
    
    try:
        resources_data = api_client.get_resources()
        
        # Display crisis resources
        st.markdown("### 📞 Crisis Hotlines")
        
        hotlines = resources_data.get("resources", {})
        for key, value in hotlines.items():
            if isinstance(value, str) and any(word in value.lower() for word in ["hotline", "lifeline"]):
                st.markdown(f"**{key.replace('_', ' ').title()}**: {value}")
        
        # Display resource groups
        st.markdown("### 🛡️ Support Resources")
        
        for key, value in hotlines.items():
            if isinstance(value, dict) and "title" in value:
                with st.expander(f"📋 {value['title']}"):
                    st.markdown(f"**Description**: {value.get('description', '')}")
                    
                    if "resources" in value:
                        st.markdown("**Available Resources**:")
                        for resource in value["resources"]:
                            st.markdown(f"• {resource}")
        
    except Exception as e:
        st.error(f"Failed to load resources: {str(e)}")


def perform_analysis(api_client: APIClient, conversation_text: str, options: Dict[str, bool]):
    """Perform conversation analysis."""
    try:
        # Show progress
        progress_bar = st.progress(0)
        progress_text = st.empty()
        
        # Call API
        response = api_client.analyze_conversation(conversation_text)
        
        # Update progress
        progress_bar.progress(100)
        progress_text.text("Analysis complete!")
        
        # Store results
        analysis_result = {
            "timestamp": time.time(),
            "conversation": conversation_text,
            "response": response,
            "options": options
        }
        
        st.session_state.last_analysis = analysis_result
        st.session_state.analysis_history.append(analysis_result)
        
        # Limit history size
        if len(st.session_state.analysis_history) > 10:
            st.session_state.analysis_history = st.session_state.analysis_history[-10:]
        
        st.success("Analysis completed successfully!")
        
        # Rerun to show results
        st.rerun()
        
    except Exception as e:
        logger.error(f"Analysis error: {e}")
        st.error(f"Analysis failed: {str(e)}")


if __name__ == "__main__":
    main()
