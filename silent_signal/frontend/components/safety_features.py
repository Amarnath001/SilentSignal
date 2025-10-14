"""
Safety features component for SilentSignal frontend.
"""

import streamlit as st


def render_safety_features():
    """Render safety features."""
    if st.session_state.get("disguise_mode", False):
        render_disguise_mode()
    else:
        render_panic_button()


def render_disguise_mode():
    """Render calculator disguise mode."""
    st.markdown("---")
    st.markdown("## 🧮 Calculator")
    
    # Simple calculator interface
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        if st.button("7"):
            st.session_state.calc_input = st.session_state.get("calc_input", "") + "7"
    
    with col2:
        if st.button("8"):
            st.session_state.calc_input = st.session_state.get("calc_input", "") + "8"
    
    with col3:
        if st.button("9"):
            st.session_state.calc_input = st.session_state.get("calc_input", "") + "9"
    
    with col4:
        if st.button("/"):
            st.session_state.calc_input = st.session_state.get("calc_input", "") + "/"
    
    # Display current input
    st.text_input("Display", value=st.session_state.get("calc_input", "0"), disabled=True)
    
    # Clear button
    if st.button("Clear", use_container_width=True):
        st.session_state.calc_input = "0"


def render_panic_button():
    """Render panic button."""
    st.markdown("---")
    
    col1, col2, col3 = st.columns([1, 2, 1])
    
    with col2:
        if st.button("🚨 Emergency Help", key="panic_button", use_container_width=True):
            st.session_state.disguise_mode = True
            st.success("Switched to disguise mode")
            st.rerun()
    
    st.markdown("""
    <div style="text-align: center; color: #666; font-size: 0.9rem;">
        Click the emergency button above to quickly switch to calculator mode for privacy.
    </div>
    """, unsafe_allow_html=True)

