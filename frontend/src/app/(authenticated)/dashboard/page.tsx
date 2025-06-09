'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockQuizzes } from '@/data/mockQuiz';
import { formatDistance } from 'date-fns';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Only render date-dependent content after mounting on client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-6">
        <h1 className="text-4xl font-bold">Hello, User</h1>
        <div className="flex gap-4">
          <Button 
            onClick={() => router.push('/quiz/generate')}
            className="bg-primary hover:bg-primary/90"
          >
            Generate Quiz
          </Button>
        </div>
      </div>

      {/* Available Quizzes */}
      <Card>
        <CardHeader>
          <CardTitle>Available Quizzes</CardTitle>
          <CardDescription>Select a quiz to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockQuizzes.map((quiz) => (
              <Card 
                key={quiz.id}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => router.push(`/quiz/preview/${quiz.id}`)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{quiz.title}</CardTitle>
                  <CardDescription>
                    {quiz.questions.length} questions
                    {mounted && ` • Created ${formatDistance(new Date(quiz.createdAt), new Date(), { addSuffix: true })}`}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}