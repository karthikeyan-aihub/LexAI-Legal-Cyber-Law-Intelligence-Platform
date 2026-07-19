"""
Chat routes for LexAI.
"""

from flask import Blueprint, render_template, request, jsonify
import traceback
from rag.rag_pipeline import LexAIRAG

# Create Blueprint
chat_bp = Blueprint(
    "chat",
    __name__
)

# Load LexAI once when Flask starts
rag = LexAIRAG()


@chat_bp.route("/chat")
def chat():
    """
    Render the LexAI Chat page.
    """
    return render_template("chat.html")


@chat_bp.route("/api/chat", methods=["POST"])
def api_chat():
    """
    Process user questions using the RAG pipeline.
    """

    data = request.get_json()

    question = data.get("message", "").strip()

    if not question:
        return jsonify({
            "error": "Question cannot be empty."
        }), 400

    try:

        result = rag.ask(question)

        return jsonify(result)

    except Exception as e:
        traceback.print_exc()
        return jsonify({
            "error": str(e)
        }), 500
