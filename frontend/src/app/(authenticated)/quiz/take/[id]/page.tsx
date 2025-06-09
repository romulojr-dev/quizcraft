'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mockQuizzes } from '@/data/mockQuiz';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';

export default function TakeQuizPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

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

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const isCorrect = selectedOption === question.correctAnswer;

  const handleOptionSelect = (value: string) => {
    const optionIndex = parseInt(value);
    setSelectedOption(optionIndex);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      toast.error('Please select an answer');
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const score = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
      }, 0);
      
      const searchParams = new URLSearchParams({
        score: score.toString(),
        answers: JSON.stringify(newAnswers),
        title: quiz.title
      });
      router.push(`/quiz/results/${quiz.id}?${searchParams.toString()}`);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null); // Reset selection for next question
      setShowFeedback(false); // Reset feedback state
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          <CardDescription>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg font-medium">{question.text}</div>
          <RadioGroup
            value={selectedOption?.toString() || ""} // Set empty string as default
            onValueChange={handleOptionSelect}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div key={`${currentQuestion}-${index}`} className="flex items-center space-x-2">
                <div className="flex-1">
                  <div className={`flex items-center space-x-2 rounded-md p-2 ${
                    showFeedback && index === question.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : showFeedback && index === selectedOption
                      ? 'bg-red-50 dark:bg-red-900/20'
                      : ''
                  }`}>
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`question-${currentQuestion}-option-${index}`}
                      disabled={showFeedback}
                    />
                    <Label htmlFor={`question-${currentQuestion}-option-${index}`}>{option}</Label>
                    {showFeedback && index === question.correctAnswer && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                    {showFeedback && index === selectedOption && index !== question.correctAnswer && (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
          {showFeedback && (
            <div className={`p-4 rounded-md ${
              isCorrect 
                ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
            }`}>
              {isCorrect 
                ? '✨ Correct! Well done!' 
                : `❌ Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`
              }
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button 
            onClick={handleNext}
            disabled={selectedOption === null}
          >
            {isLastQuestion ? 'Finish' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}