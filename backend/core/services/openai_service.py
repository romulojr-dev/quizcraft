import openai
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY

def generate_quiz_from_text(text_content, num_questions=5):
    """
    Generate quiz questions from text content using OpenAI API
    """
    try:
        prompt = f"""
        Generate {num_questions} quiz questions based on the following text. 
        
        Text content:
        {text_content}
        
        Format the output as JSON with the following structure:
        {{
            "questions": [
                {{
                    "question": "...",
                    "options": {{
                        "A": "...",
                        "B": "...",
                        "C": "...",
                        "D": "..."
                    }},
                    "correct_answer": "A/B/C/D",
                    "explanation": "..."
                }}
            ]
        }}
        """

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful quiz generator."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content

    except Exception as e:
        raise Exception(f"Failed to generate quiz: {str(e)}")

def generate_flashcards_from_text(text_content, num_cards=5):
    """
    Generate flashcards from text content using OpenAI API
    """
    try:
        prompt = f"""
        Generate {num_cards} flashcards based on the following text.
        Format as JSON:
        {{
            "flashcards": [
                {{
                    "front": "...",
                    "back": "..."
                }}
            ]
        }}

        Text content:
        {text_content}
        """

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a flashcard generator."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content

    except Exception as e:
        raise Exception(f"Failed to generate flashcards: {str(e)}")