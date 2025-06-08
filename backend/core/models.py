from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from .utils import validate_file
from django.conf import settings

def note_file_path(instance, filename):
    # Generate file path: notes/<user_id>/<filename>
    return f'notes/{instance.user.id}/{filename}'

class Note(models.Model):
    CONTENT_TYPES = [
        ('pdf', 'PDF Document'),
        ('docx', 'Word Document'),
        ('image', 'Image File'),
    ]
    
    title = models.CharField(max_length=255)
    file = models.FileField(
        upload_to=note_file_path,
        validators=[validate_file]
    )
    file_type = models.CharField(max_length=5, choices=CONTENT_TYPES)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return f"{self.title} ({self.file_type})"

    def clean(self):
        if self.file:
            if self.file.size > settings.MAX_UPLOAD_SIZE:
                raise ValidationError(
                    f'File size cannot exceed {settings.MAX_UPLOAD_SIZE/1024/1024}MB'
                )

class Quiz(models.Model):
    note = models.ForeignKey(Note, related_name='quizzes', on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default="Generated Quiz")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Quiz for {self.note.title}"

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    question_text = models.TextField()
    option_a = models.CharField(max_length=255)
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)
    option_d = models.CharField(max_length=255)
    correct_answer = models.CharField(max_length=1)
    explanation = models.TextField()

    def __str__(self):
        return self.question_text[:50]

class Flashcard(models.Model):
    note = models.ForeignKey(Note, related_name='flashcards', on_delete=models.CASCADE)
    front = models.TextField()
    back = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Flashcard: {self.front[:30]}"
