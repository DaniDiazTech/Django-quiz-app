# Django Quiz app

A simple Quiz app created with Django and JavaScript.

## Set up

One command to set up the app:

```bash
git@github.com:DaniDiazTech/Django-quiz-app.git
# with http: https://github.com/DaniDiazTech/Django-quiz-app.git
cd Django-quiz-app
python -m venv .venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Don't forget to create superuser and use the admin to create the quizes.

```bash
python manage.py createsuperuser
```

### TO-DO: 

- Implement a user application.
- Fix countdown bug
- Create a good UI
