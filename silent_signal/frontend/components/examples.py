"""
Examples component for SilentSignal frontend.
"""

import streamlit as st
import time
from typing import Dict, Any


def render_examples(api_client):
    """Render example conversations."""
    
    examples = {
        "Safe Conversation": {
            "text": "Thanks for understanding. Let's talk about it when you're free. Have a great day!",
            "description": "Healthy, respectful communication"
        },
        "Concerning Pattern": {
            "text": "You never listen to me. If you really cared, you'd make time. You're being selfish.",
            "description": "Guilt-tripping and emotional manipulation"
        },
        "Potential Abuse": {
            "text": "You're crazy. That never happened. If you leave, I'll hurt myself. You owe me.",
            "description": "Gaslighting, threats, and manipulation"
        }
    }
    
    st.markdown("### Select an Example to Analyze")
    
    for title, example in examples.items():
        with st.expander(f"📝 {title}"):
            st.markdown(f"**Description**: {example['description']}")
            st.markdown("**Example Text**:")
            st.code(example['text'])
            
            if st.button(f"Analyze '{title}'", key=f"analyze_{title}"):
                # Perform analysis
                try:
                    response = api_client.analyze_conversation(example['text'])
                    
                    # Store results
                    analysis_result = {
                        "timestamp": time.time(),
                        "conversation": example['text'],
                        "response": response,
                        "options": {"include_details": True}
                    }
                    
                    st.session_state.last_analysis = analysis_result
                    st.session_state.current_page = "analyze"
                    st.rerun()
                    
                except Exception as e:
                    st.error(f"Analysis failed: {str(e)}")
    
    st.markdown("---")
    st.markdown("### 💡 Tips for Using Examples")
    st.markdown("""
    - **Safe examples** show healthy communication patterns
    - **Concerning examples** demonstrate mild manipulation tactics
    - **Abuse examples** show serious emotional abuse patterns
    
    Use these examples to understand how SilentSignal identifies different types of concerning behavior.
    """)
