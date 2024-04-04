from flask import Flask, render_template, jsonify, request
import psycopg2

app = Flask(__name__)

# Connect to your PostgreSQL database
conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="newpassword",
    host="localhost",
    port="5432"
)

# Sample student data
# Replace this with a query to fetch data from your database
def get_students_from_db():
    cur = conn.cursor()
    cur.execute("SELECT * FROM applicants")
    students = cur.fetchall()
    cur.close()
    print(students)
    return students

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/api/students')
def get_students():
    students = get_students_from_db()
    dict_students = []
    for each in students:
        d = {
                "id": each[0],
                "name": each[1],
                "age": each[4],
                "grade": each[6],
                "address": each[3],
                "contactNumber": each[4],
                "sop": each[-1]
        }
        dict_students.append(d)
    return jsonify(dict_students)

@app.route('/api/search', methods=['POST'])
def search_students():
    search_term = request.json.get('searchTerm', '').lower()
    students = get_students_from_db()
    filtered_students = [student for student in students if search_term in student[1].lower()]  # Assuming student's name is in index 1
    return jsonify(filtered_students)

@app.route('/student/<int:student_id>')
def student_details(student_id):
    # Fetch student details from the database based on student_id
    cur = conn.cursor()
    cur.execute("SELECT * FROM students WHERE id = %s", (student_id,))
    student = cur.fetchone()
    cur.close()
    return render_template('student_details.html', student=student)

if __name__ == '__main__':
    app.run(debug=True)
