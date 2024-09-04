import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_db_config():
    return {
        "host": "localhost",
        "user": os.getenv('ENV_MYSQL_USER'),
        "password": os.getenv('ENV_MYSQL_PASSWORD'),
        "database": os.getenv('ENV_MYSQL_DATABASE')
    }
