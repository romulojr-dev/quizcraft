export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}