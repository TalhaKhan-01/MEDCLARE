import os
import shutil
import sys
from pathlib import Path

# Add the current directory to sys.path so we can import 'app'
sys.path.append(str(Path(__file__).parent))

try:
    from app.database import engine, Base
    from app.config import settings
    from app import models  # IMPORT MODELS TO REGISTER TABLES
except ImportError:
    print("Error: Could not import app modules. Make sure you are running this script from the backend directory.")
    sys.exit(1)

def clear_db():
    print("Clearing database tables...")
    # Using drop_all and create_all is a thorough way to reset the schema
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("Database tables cleared and recreated.")

def clear_uploads():
    print(f"Clearing uploads directory: {settings.UPLOAD_DIR}")
    if os.path.exists(settings.UPLOAD_DIR):
        for filename in os.listdir(settings.UPLOAD_DIR):
            file_path = os.path.join(settings.UPLOAD_DIR, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f'Failed to delete {file_path}. Reason: {e}')
    else:
        print("Uploads directory does not exist, skipping.")
    print("Uploads cleared.")

def clear_chroma():
    print(f"Clearing Chroma database: {settings.CHROMA_PERSIST_DIR}")
    if os.path.exists(settings.CHROMA_PERSIST_DIR):
        try:
            shutil.rmtree(settings.CHROMA_PERSIST_DIR)
            os.makedirs(settings.CHROMA_PERSIST_DIR)
        except Exception as e:
            print(f'Failed to clear Chroma DB. Reason: {e}')
    else:
        print("Chroma directory does not exist, skipping.")
    print("Chroma cleared.")

if __name__ == "__main__":
    clear_db()
    clear_uploads()
    clear_chroma()
    print("\nCleanup complete!")
