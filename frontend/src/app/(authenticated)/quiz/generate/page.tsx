'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

export default function GenerateQuizPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Invalid file type. Please upload PDF, DOCX, or TXT files only.');
        return;
      }
      
      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      setFile(selectedFile);
      toast.success('File selected successfully');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);
      const token = localStorage.getItem('token');
      
      // Step 1: Upload note
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('http://localhost:8000/notes/upload/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload note');
      }

      const { note_id } = await uploadResponse.json();
      toast.success('Note uploaded successfully!');

      // Step 2: Generate quiz from note
      setGeneratingQuiz(true);
      const generateResponse = await fetch(`http://localhost:8000/notes/${note_id}/generate-quiz/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!generateResponse.ok) {
        throw new Error('Failed to generate quiz');
      }

      const { quiz_id } = await generateResponse.json();
      toast.success('Quiz generated successfully!');

      // Step 3: Navigate to quiz preview
      router.push(`/quiz/preview/${quiz_id}`);
    } catch (error) {
      console.error('Error in quiz generation flow:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process request');
    } finally {
      setUploading(false);
      setGeneratingQuiz(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Generate Quiz</CardTitle>
          <CardDescription>
            Upload a document to automatically generate quiz questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 space-y-4">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {file ? file.name : 'Upload your document'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOCX, or TXT up to 10MB
                </p>
              </div>
              <Input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose File
              </Button>
            </div>
            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!file || uploading || generatingQuiz}
              >
                {uploading ? 'Uploading...' : generatingQuiz ? 'Generating Quiz...' : 'Generate Quiz'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}