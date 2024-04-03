import psycopg2
from psycopg2 import Error
from flask import Flask, jsonify

app = Flask(__name__)

# Function to fetch student details from the database
def fetch_student_details(student_id):
    try:
        # Establish connection to the PostgreSQL database
        connection = psycopg2.connect(
            user="postgres",
            password="",
            host="localhost",
            port="5432",
            database="applicants"
        )

        cursor = connection.cursor()

        # SQL query to fetch student details based on ID
        cursor.execute("SELECT * FROM students WHERE id = %s", (student_id,))
        student = cursor.fetchone()  # Fetch the first row

        # Close communication with the database
        cursor.close()

        if student:
            return {
                'id': student[0],
                'name': student[1],
                'father_name': student[2],
                'email': student[3],
                'phone_number': student[4],
                'age': student[5],
                'highest_qualification': student[6],
                'SOP': student[7]
            }
        else:
            return None  # Return None if student not found

    except (Exception, Error) as error:
        print("Error fetching student details:", error)
        return None

    finally:
        # Close database connection
        if connection:
            connection.close()

# Route to fetch student details based on ID
@app.route('/api/students/<int:student_id>')
def get_student_details(student_id):
    student = fetch_student_details(student_id)
    if student:
        return jsonify(student)
    else:
        return jsonify({'message': 'Student not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
