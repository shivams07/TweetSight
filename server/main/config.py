# project/server/config.py
import os

class BaseConfig:
    """Base configuration."""
    FLASK_APP="main/__init__.py"
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious')
    DEBUG = False
    CONSUMER_KEY = 'CIfavXbvcO8f3ewG2L0H7oGzs'
    CONSUMER_SECRET = 'EXdKsu0Wg8rndpfkn0TEnCqLeELxUec1l67fj1Aqi4iT1PrafO'
    ACCESS_TOKEN = '3056320099-U6eA3ZBqeSWcmKGpTD54o8nVxgFeP1d1eGkiLRh'
    ACCESS_TOKEN_SECRET = 'uovzDBbxrz9wC4y8OUTpzXHMyGh0oGe44pSbkMeAgoXkd'

class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    FLASK_ENV="development"

class TestingConfig(BaseConfig):
    """Testing configuration."""
    DEBUG = True
    FLASK_ENV="testing"


class ProductionConfig(BaseConfig):
    """Production configuration."""
    DEBUG = False
    FLASK_ENV="production"
