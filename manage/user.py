from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
import MySQLdb.cursors

# Initialize Flask App
app = Flask(__name__, static_folder='static', template_folder='templates')
app.secret_key = "supersecretkey"  # Change this in production

# Configure MySQL Database Connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'   # Change if needed
app.config['MYSQL_PASSWORD'] = ''   # Set your MySQL password
app.config['MYSQL_DB'] = 'task_manager'

mysql = MySQL(app)
bcrypt = Bcrypt(app)

# Home Route - Redirects if not logged in
@app.route('/')
def home():
    if "user" in session:
        return render_template('index.html', username=session["user"])
    return render_template('index.html')

# Dashboard Route - Protected
@app.route('/main.html')
def dashboard():
    if "user" in session:
        return render_template('main.html')
    return render_template('main.html')

# Signup Route
@app.route('/signup.html', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO users (email, password) VALUES (%s, %s)', (email, hashed_password))
        mysql.connection.commit()
        cursor.close()

        flash("Signup successful! Please log in.", "success")
        return redirect(url_for('login'))
    
    return render_template('signup.html')

# Login Route
@app.route('/login.html', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cursor.fetchone()
        cursor.close()

        if user and bcrypt.check_password_hash(user['password'], password):
            session["user"] = user["email"]
            flash("Login successful!", "success")
            return redirect(url_for('home'))
        else:
            flash("Invalid email or password!", "danger")

    return render_template('login.html')

# Logout Route
@app.route('/logout.html')
def logout():
    session.pop("user", None)
    flash("You have been logged out!", "info")
    return redirect(url_for("login"))

# Run the Flask App
if __name__ == '__main__':
    app.run(debug=True)
