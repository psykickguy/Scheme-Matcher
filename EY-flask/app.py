from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = 'hmm'

#database stuff
app.config.from_pyfile('config.py')
mysql = MySQL(app)

#routes
@app.route('/')
def fefault():
    return redirect(url_for('home'))

@app.route('/home')
def home():
    if 'name' in session:
        return render_template('home.html', name=session['name'])
    else: return render_template('home.html')

@app.route('/registration', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        userDetails = request.form
        aadhaar = userDetails['aadhaar']
        email = userDetails['email']
        mobile = userDetails['mobile']
        name = userDetails['name']

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users(mobile, email, aadhaar, name) VALUES(%s, %s, %s, %s)",(mobile, email, aadhaar, name))
        mysql.connection.commit()
        cur.close()

        flash('New user registered successfully')
        return redirect(url_for('home'))
    return render_template('registration.html')

@app.route('/eligibility')
def eligibility():
    return render_template('eligibility.html')

if __name__ == '__main__':
    app.run(debug=True)
