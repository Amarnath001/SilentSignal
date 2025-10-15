"""
Metrics dashboard component for SilentSignal frontend.
"""

import streamlit as st
from typing import Dict, Any


def render_metrics_dashboard(metrics_data: Dict[str, Any]):
    """Render metrics dashboard."""
    
    # Overall metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            "Total Analyses",
            metrics_data.get("total_analyses", 0),
            delta=None
        )
    
    with col2:
        st.metric(
            "Successful Analyses", 
            metrics_data.get("successful_analyses", 0),
            delta=None
        )
    
    with col3:
        st.metric(
            "Failed Analyses",
            metrics_data.get("failed_analyses", 0),
            delta=None
        )
    
    with col4:
        st.metric(
            "Avg Processing Time",
            f"{metrics_data.get('average_processing_time', 0):.2f}s",
            delta=None
        )
    
    # Pattern statistics
    pattern_stats = metrics_data.get("pattern_statistics", {})
    if pattern_stats:
        st.markdown("### 📊 Pattern Detection Statistics")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("**Pattern Categories**")
            st.write(f"Total Patterns: {pattern_stats.get('total_patterns', 0)}")
            st.write(f"Total Indicators: {pattern_stats.get('total_indicators', 0)}")
        
        with col2:
            st.markdown("**Severity Distribution**")
            severity_dist = pattern_stats.get('patterns_by_severity', {})
            for severity, count in severity_dist.items():
                st.write(f"{severity.title()}: {count}")
    
    # Workflow status
    workflow_status = metrics_data.get("workflow_status", {})
    if workflow_status:
        st.markdown("### ⚙️ Workflow Status")
        
        current_step = workflow_status.get("current_step")
        completed_steps = workflow_status.get("completed_steps", [])
        failed_steps = workflow_status.get("failed_steps", [])
        
        if current_step:
            st.info(f"Current Step: {current_step}")
        
        if completed_steps:
            st.success(f"Completed Steps: {', '.join(completed_steps)}")
        
        if failed_steps:
            st.error(f"Failed Steps: {', '.join(failed_steps)}")

