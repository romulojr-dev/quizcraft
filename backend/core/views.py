# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from .models import Note, Quiz, Question, Flashcard
from .serializers import NoteSerializer, QuizSerializer, FlashcardSerializer
from .utils import validate_file, extract_text_from_note
from .services.openai_service import generate_quiz_from_text, generate_flashcards_from_text
import json
import PyPDF2
import docx
from PIL import Image
import pytesseract

@api_view(['GET'])
def hello(request):
    return Response({"message": "Welcome to Quiz Astra!"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_note(request):
    if 'file' not in request.FILES:
        return Response(
            {'error': 'No file provided'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    file = request.FILES['file']
    title = request.POST.get('title', file.name)
    
    try:
        file_type = validate_file(file)
        
        note = Note.objects.create(
            title=title,
            file=file,
            file_type=file_type,
            user=request.user
        )
        
        serializer = NoteSerializer(note)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    except ValidationError as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_notes(request):
    notes = Note.objects.filter(user=request.user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_note(request, note_id):
    try:
        note = Note.objects.get(id=note_id, user=request.user)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Note.DoesNotExist:
        return Response(
            {'error': 'Note not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_quiz(request, note_id):
    try:
        note = Note.objects.get(id=note_id, user=request.user)
        text_content = extract_text_from_note(note)
        
        # Generate quiz using OpenAI
        quiz_data = generate_quiz_from_text(text_content)
        quiz_json = json.loads(quiz_data)
        
        # Create quiz
        quiz = Quiz.objects.create(
            note=note,
            title=f"Quiz for {note.title}"
        )
        
        # Create questions
        for q_data in quiz_json['questions']:
            Question.objects.create(
                quiz=quiz,
                question_text=q_data['question'],
                option_a=q_data['options']['A'],
                option_b=q_data['options']['B'],
                option_c=q_data['options']['C'],
                option_d=q_data['options']['D'],
                correct_answer=q_data['correct_answer'],
                explanation=q_data['explanation']
            )
        
        serializer = QuizSerializer(quiz)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    except Note.DoesNotExist:
        return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_flashcards(request, note_id):
    try:
        note = Note.objects.get(id=note_id, user=request.user)
        text_content = extract_text_from_note(note)
        
        # Generate flashcards using OpenAI
        flashcard_data = generate_flashcards_from_text(text_content)
        flashcard_json = json.loads(flashcard_data)
        
        # Create flashcards
        flashcards = []
        for f_data in flashcard_json['flashcards']:
            flashcard = Flashcard.objects.create(
                note=note,
                front=f_data['front'],
                back=f_data['back']
            )
            flashcards.append(flashcard)
        
        serializer = FlashcardSerializer(flashcards, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    except Note.DoesNotExist:
        return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_quizzes(request, note_id=None):
    """Get all quizzes or quizzes for a specific note"""
    try:
        if note_id:
            quizzes = Quiz.objects.filter(note_id=note_id, note__user=request.user)
        else:
            quizzes = Quiz.objects.filter(note__user=request.user)
        
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz_detail(request, quiz_id):
    """Get detailed information about a specific quiz"""
    try:
        quiz = Quiz.objects.get(id=quiz_id, note__user=request.user)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)
    except Quiz.DoesNotExist:
        return Response(
            {'error': 'Quiz not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_flashcards(request, note_id=None):
    """Get all flashcards or flashcards for a specific note"""
    try:
        if note_id:
            flashcards = Flashcard.objects.filter(note_id=note_id, note__user=request.user)
        else:
            flashcards = Flashcard.objects.filter(note__user=request.user)
        
        serializer = FlashcardSerializer(flashcards, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )