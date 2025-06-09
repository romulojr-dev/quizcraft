'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { mockQuizzes } from '@/data/mockQuiz';
import { Clock, ListChecks } from 'lucide-react';

export default function QuizPreviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const quiz = mockQuizzes.find(q => q.id === params.id);

  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <p>Quiz not found</p>
            <Button 
              onClick={() => router.push('/dashboard')}
              className="mt-4"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          <CardDescription>{quiz.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-muted-foreground" />
              <span>{quiz.questions.length} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>~{quiz.questions.length} mins</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Instructions:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Read each question carefully before answering</li>
              <li>Select the best answer from the given options</li>
              <li>You cannot return to previous questions</li>
              <li>Your score will be shown at the end</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => router.push(`/quiz/take/${params.id}`)}
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}