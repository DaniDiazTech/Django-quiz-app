from django.urls import path

from .views import (
    QuizListView,
    QuizDetailView
)

app_name = 'quizes'

urlpatterns = [
    path('', QuizListView.as_view(), name='list_quiz_view'),
    path('quiz/<pk>', QuizDetailView.as_view(), name='quiz_view')
]
