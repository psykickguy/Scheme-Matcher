from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_mysqldb import MySQL

#database stuff
app.config.from_pyfile('config.py')
mysql = MySQL(app)

#routes
@app.route()