from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello), # test api
    path('notes/upload/', views.upload_note, name='upload_note'),
    path('notes/', views.list_notes, name='list_notes'),
    path('notes/<int:note_id>/', views.delete_note, name='delete_note'),
    path('notes/<int:note_id>/generate-quiz/', views.generate_quiz, name='generate_quiz'),
    path('notes/<int:note_id>/generate-flashcards/', views.generate_flashcards, name='generate_flashcards'),

    # Quiz endpoints
    path('quizzes/', views.list_quizzes, name='list_quizzes'),
    path('notes/<int:note_id>/quizzes/', views.list_quizzes, name='list_note_quizzes'),
    path('quizzes/<int:quiz_id>/', views.get_quiz_detail, name='quiz_detail'),

    # Flashcard endpoints
    path('flashcards/', views.list_flashcards, name='list_flashcards'),
    path('notes/<int:note_id>/flashcards/', views.list_flashcards, name='list_note_flashcards'),
]
