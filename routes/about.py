"""
About routes for LexAI.
"""

from flask import Blueprint, render_template

# Create Blueprint
about_bp = Blueprint(
    "about",
    __name__
)


@about_bp.route("/about")
def about():
    """
    Render the About page.
    """
    return render_template("about.html")