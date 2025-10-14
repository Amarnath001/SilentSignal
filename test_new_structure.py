#!/usr/bin/env python3
"""
Test script for the new SilentSignal structure.
"""

import sys
import os

# Add the project root to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_imports():
    """Test that all modules can be imported."""
    print("Testing imports...")
    
    try:
        from silent_signal.config.settings import settings
        print("✅ Settings imported successfully")
        
        from silent_signal.backend.models.schemas import AnalysisRequest, AnalysisResponse
        print("✅ Models imported successfully")
        
        from silent_signal.backend.core.pattern_detector import PatternDetector
        print("✅ Pattern detector imported successfully")
        
        from silent_signal.backend.core.mcp_orchestrator import MCPOrchestrator
        print("✅ MCP orchestrator imported successfully")
        
        from silent_signal.backend.services.nimo_client import NimoClient
        print("✅ NIM client imported successfully")
        
        from silent_signal.backend.utils.resource_manager import ResourceManager
        print("✅ Resource manager imported successfully")
        
        from silent_signal.frontend.utils.api_client import APIClient
        print("✅ API client imported successfully")
        
        return True
        
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        return False

def test_data_files():
    """Test that data files exist."""
    print("\nTesting data files...")
    
    data_files = [
        "silent_signal/data/pattern_knowledge.json",
        "silent_signal/data/resources.json",
        "silent_signal/data/examples/safe.txt",
        "silent_signal/data/examples/concerning.txt",
        "silent_signal/data/examples/abusive.txt"
    ]
    
    all_exist = True
    for file_path in data_files:
        if os.path.exists(file_path):
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path} - Missing!")
            all_exist = False
    
    return all_exist

def test_pattern_detection():
    """Test pattern detection functionality."""
    print("\nTesting pattern detection...")
    
    try:
        from silent_signal.backend.core.pattern_detector import PatternDetector
        
        detector = PatternDetector()
        test_text = "You're crazy. That never happened. You're imagining things."
        
        patterns, score = detector.analyze_text(test_text)
        
        print(f"✅ Pattern detection working - Found {len(patterns)} patterns, score: {score}")
        
        if patterns:
            for pattern in patterns:
                print(f"   - {pattern.name}: {pattern.severity} (confidence: {pattern.confidence:.2f})")
        
        return True
        
    except Exception as e:
        print(f"❌ Pattern detection failed: {e}")
        return False

def test_configuration():
    """Test configuration loading."""
    print("\nTesting configuration...")
    
    try:
        from silent_signal.config.settings import settings
        
        print(f"✅ App name: {settings.app_name}")
        print(f"✅ App version: {settings.app_version}")
        print(f"✅ NIM model: {settings.nim_model}")
        print(f"✅ API port: {settings.api_port}")
        print(f"✅ Frontend port: {settings.frontend_port}")
        
        return True
        
    except Exception as e:
        print(f"❌ Configuration failed: {e}")
        return False

def main():
    """Run all tests."""
    print("🧪 Testing SilentSignal New Structure")
    print("=" * 50)
    
    tests = [
        test_imports,
        test_data_files,
        test_configuration,
        test_pattern_detection
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=" * 50)
    print(f"Tests passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! New structure is working correctly.")
        print("\nNext steps:")
        print("1. Install dependencies: pip install -r requirements.txt")
        print("2. Configure .env file")
        print("3. Run backend: python main.py backend")
        print("4. Run frontend: python main.py frontend")
        return 0
    else:
        print("❌ Some tests failed. Please check the errors above.")
        return 1

if __name__ == "__main__":
    exit(main())

