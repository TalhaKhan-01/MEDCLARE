import sqlite3
import os

db_path = os.path.join(os.getcwd(), 'medclare.db')
print(f"Connecting to {db_path}...")

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("ALTER TABLE reports ADD COLUMN lang VARCHAR DEFAULT 'en'")
    conn.commit()
    print("Column 'lang' added successfully.")
except sqlite3.OperationalError as e:
    if "duplicate column name" in str(e).lower():
        print("Column 'lang' already exists.")
    else:
        print(f"Error: {e}")
finally:
    if conn:
        conn.close()
