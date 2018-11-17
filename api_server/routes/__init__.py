from .routes import create_routes
from flask import Flask

def create_app(db_con):
    app = Flask(__name__)
    routes = create_routes(db_con)
    
    app.register_blueprint(routes, url_prefix='/api/v1')
    return app
