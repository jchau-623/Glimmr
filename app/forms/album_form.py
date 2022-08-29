from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Album

# add custom validators

class AlbumForm(FlaskForm):
    title = StringField('title', validators=[DataRequired('Title is required.'),
    Length(max=29, message="Title must be less than 30 characters long."),
    Length(min=4, message="Title must be at least 4 characters long.")])

    description = TextAreaField('description', validators=[
        Length(max=254, message="Description must be less than 255 characters.")])
