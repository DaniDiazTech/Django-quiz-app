from django.views.generic import ListView, DetailView
from .models import Quiz

# Quiz List view
class QuizListView(ListView):
    model = Quiz
    template_name = 'quizes/main.html'

class QuizDetailView(DetailView):
    model = Quiz
    template_name = 'quizes/detail.html'