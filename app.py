from flask import Flask, render_template, request, redirect, url_for, session
import psycopg2

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Add a secret key for session management

# Function to connect to the database
def connect_db():
    conn = psycopg2.connect(
        dbname='postgres',  # Update with your actual database name
        user='postgres',    # Replace with your actual database username
        password='12345',    # Replace with your actual database password
        host='localhost',
        port='5432'
    )
    return conn

# Login route
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Verify login credentials from the database
        conn = connect_db()
        cur = conn.cursor()
        cur.execute("SELECT * FROM login WHERE username=%s AND password=%s", (username, password))
        user = cur.fetchone()
        conn.close()

        if user:
            session['logged_in'] = True
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error="Invalid username or password")

    return render_template('login.html')

# Dashboard route
@app.route('/dashboard')
def dashboard():
    if 'logged_in' in session:
        return "Welcome to the dashboard!"
    else:
        return redirect(url_for('login'))

# Logout route
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
