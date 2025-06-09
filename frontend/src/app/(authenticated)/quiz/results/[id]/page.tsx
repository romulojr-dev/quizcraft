'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { mockQuizzes } from '@/data/mockQuiz';
import { Check, X, Trophy, ArrowRight } from 'lucide-react';

interface ResultsPageProps {
  params: { id: string };
  searchParams: { score: string; answers: string; title: string };
}

export default function ResultsPage({ params, searchParams }: ResultsPageProps) {
  const router = useRouter();
  const answers = JSON.parse(searchParams.answers);
  const score = parseInt(searchParams.score);
  
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

  const totalQuestions = quiz.questions.length;
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Score Overview */}
      <Card className="bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Trophy className="h-12 w-12 text-primary" />
            <div className="text-center">
              <h2 className="text-3xl font-bold">{percentage.toFixed(0)}%</h2>
              <p className="text-muted-foreground">
                You scored {score} out of {totalQuestions} questions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle>{quiz.title} - Review</CardTitle>
          <CardDescription>See what you got right and wrong</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {quiz.questions.map((question, index) => {
            const isCorrect = answers[index] === question.correctAnswer;
            return (
              <div 
                key={index} 
                className={`p-4 rounded-lg ${
                  isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {isCorrect 
                    ? <Check className="h-5 w-5 text-green-500 mt-1" />
                    : <X className="h-5 w-5 text-red-500 mt-1" />
                  }
                  <div className="flex-1 space-y-2">
                    <p className="font-medium">Question {index + 1}: {question.text}</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        Your answer: {question.options[answers[index]]}
                      </p>
                      {!isCorrect && (
                        <p className="text-green-600 dark:text-green-400">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            onClick={() => router.push('/dashboard')}
          >
            Back to Dashboard
          </Button>
          <Button 
            onClick={() => router.push(`/quiz/take/${params.id}`)}
          >
            Try Again <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}