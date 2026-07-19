from flask import Flask, render_template
from routes.home import home_bp
from routes.chat import chat_bp
from routes.about import about_bp

app = Flask(__name__)

# ==========================
# Configuration
# ==========================
app.config.from_object("config")

# ==========================
# Register Blueprints
# ==========================
app.register_blueprint(home_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(about_bp)

# ==========================
# Error Handlers
# ==========================

@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"), 404


@app.errorhandler(500)
def internal_server_error(error):
    return render_template("500.html"), 500


# ==========================
# Run Application
# ==========================
import os

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=True
    )