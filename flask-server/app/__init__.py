from flask import Flask, jsonify, request
from flask_caching import Cache
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from sqlalchemy import create_engine
from .config import Config
from app import routes
from flask_cors import CORS
from .models.db import db
from database import seed_database
import os
import jwt

app = Flask(__name__)
migrate = Migrate(app, db)
jwt_manager = JWTManager(app)
CORS(app)
app.config.from_object(Config)
app.config['CACHE_TYPE'] = 'simple'  # Use a simple in-memory cache
cache = Cache(app)

@app.route('/api/config')
@cache.cached(timeout=3600)
def get_config():
    api_key = os.environ.get('API_KEY')
    return jsonify({'api_key': api_key})


@app.route('/protected', methods=['GET'])
def protected_route():
  access_token_cookie = request.cookies.get('access_token')
  if access_token_cookie:
    try:
      # Decode the access token from the cookie
      decoded_token = jwt.decode(
      access_token_cookie, app.config['SECRET_KEY'], algorithms=['HS256'])
      username = decoded_token.get('username')
      id = decoded_token.get('id')

      # Authentication successful, respond with data from the protected endpoint
      return jsonify({
          'message': 'Welcome! This is a protected route.',
          'username': username,
          'id': id
        }), 200
    except jwt.ExpiredSignatureError:
      # Token has expired, respond with unauthorized status code
      return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
      # Invalid token, respond with unauthorized status code
      return jsonify({'message': 'Invalid token'}), 401
  else:
    # Access token not found in the cookie, respond with unauthorized status code
    return jsonify({'message': 'Access token not found'}), 401


routes_list = [
    routes.main.bp,
    routes.matches.bp,
    routes.match.bp,
    routes.news.bp,
    routes.auth.bp,
    routes.competition.bp,
    routes.club.bp,
    routes.player.bp,
    routes.post.bp,
    routes.like.bp,
    routes.comment.bp,
    routes.notification.bp
]

for route in routes_list:
  app.register_blueprint(route)


db.init_app(app)
seed_database(app)

# engine = create_engine(db_url)

if __name__ == '__main__':
    app.run(port=5000, debug=True)

