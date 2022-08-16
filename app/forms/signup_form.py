from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def email_length(form, field):
    length_email = field.data
    if len(length_email) > 80:
        raise ValidationError("Email must be less than 80 characters")

# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')

def repeat_password(form, field):
    repeat_password = field.data
    password = form.data['password']

    if repeat_password != password:
        raise ValidationError("Your passwords must match")

def password_length(form, field):
    password = field.data
    if len(password) < 5 or len(password) > 20:
        raise ValidationError('Password must be between 5 and 20 characters')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired('Please enter your first name')])
    last_name = StringField('last_name', validators=[DataRequired('Please enter your last name')])
    email = StringField('email', validators=[DataRequired('Please enter an email'), user_exists, email_length, Email(message='This is not a valid email')])
    password = StringField('password', validators=[DataRequired('Please enter a password'), password_length])
    repeat_password = StringField('repeat_password', validators=[DataRequired('Your passwords must match'), repeat_password])
