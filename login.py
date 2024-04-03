from flask import Flask, request, jsonify, redirect, url_for
import psycopg2

app = Flask(__name__)

# PostgreSQL connection configuration
DB_HOST = 'your_database_host'
DB_NAME = 'your_database_name'
DB_USER = 'your_database_user'
DB_PASSWORD = 'your_database_password'

# Function to connect to the PostgreSQL database
def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )

# Route for handling login requests
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()

    # Query to fetch user from database
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (username, password))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user:
        # If user is found, return redirect response
        return redirect(url_for('dashboard'))  # Assuming you have a route named 'dashboard'
    else:
        # If user is not found, return failure response
        return jsonify({'success': False, 'message': 'Invalid username or password'})

# Route for dashboard
@app.route('/dashboard')
def dashboard():
    return 'Welcome to the dashboard!'  # This can be any response you want to send

if __name__ == '__main__':
    app.run(debug=True)
