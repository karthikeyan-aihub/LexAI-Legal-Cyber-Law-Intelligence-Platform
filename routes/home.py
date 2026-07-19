"""
Home routes for LexAI.
"""

from flask import Blueprint, render_template

# Create Blueprint
home_bp = Blueprint(
    "home",
    __name__
)


@home_bp.route("/")
def home():
    """
    Render the Home page.
    """
    return render_template("index.html")