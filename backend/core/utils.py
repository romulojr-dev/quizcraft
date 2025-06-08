from django.conf import settings
from django.core.exceptions import ValidationError
import magic
import PyPDF2
import docx
from PIL import Image
import pytesseract

def validate_file(file):
    # Check file size
    if file.size > settings.MAX_UPLOAD_SIZE:
        raise ValidationError(
            f'File size cannot exceed {settings.MAX_UPLOAD_SIZE/1024/1024}MB'
        )
    
    # Check file type
    mime = magic.Magic()
    file_type = mime.from_buffer(file.read(1024))
    file.seek(0)  # Reset file pointer
    
    # Determine file type category
    if 'PDF' in file_type:
        return 'pdf'
    elif any(word in file_type for word in ['Microsoft Word', 'OpenDocument']):
        return 'docx'
    elif 'image' in file_type.lower():
        return 'image'
    else:
        raise ValidationError(
            'Unsupported file type. Please upload PDF, DOCX, or image files.'
        )

def extract_text_from_note(note):
    """
    Extract text content from uploaded notes (PDF, DOCX, or Image)
    """
    text_content = ""
    file_path = note.file.path

    try:
        if note.file_type == 'pdf':
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text_content += page.extract_text()
        
        elif note.file_type == 'docx':
            doc = docx.Document(file_path)
            text_content = '\n'.join([paragraph.text for paragraph in doc.paragraphs])
        
        elif note.file_type == 'image':
            text_content = pytesseract.image_to_string(Image.open(file_path))
        
        return text_content.strip()
    
    except Exception as e:
        raise Exception(f"Error extracting text from {note.file_type}: {str(e)}")