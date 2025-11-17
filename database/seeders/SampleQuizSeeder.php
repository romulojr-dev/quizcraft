<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LectureNote;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Choice;


class SampleQuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create one Lecture Note
        $lectureNote = LectureNote::create([
            'user_id' => null,
            'title' => 'Introduction to Computer Science',
            'file_path' => null,
            'extracted_text' => 'Computer science is the study of computers and computational systems. It includes theory, development, and application of software and systems.',
        ]);

        // Define 3 quizzes with questions and choices
        $quizzes = [
            [
                'title' => 'Quiz 1: Basics of Computer Science',
                'questions' => [
                    [
                        'question_text' => 'What is computer science?',
                        'question_type' => 'definition',
                        'correct_answer' => 'A',
                        'choices' => [
                            'A' => 'The study of computers and computational systems.',
                            'B' => 'Typing speed improvement.',
                            'C' => 'Computer repair service.',
                            'D' => 'Graphic design techniques.',
                        ],
                    ],
                    [
                        'question_text' => 'Which of the following is a core area of computer science?',
                        'question_type' => 'conceptual',
                        'correct_answer' => 'B',
                        'choices' => [
                            'A' => 'Cooking recipes',
                            'B' => 'Software development',
                            'C' => 'Manual typing',
                            'D' => 'Hand-drawn animation',
                        ],
                    ],
                    [
                        'question_text' => 'Why is computational thinking important?',
                        'question_type' => 'conceptual',
                        'correct_answer' => 'C',
                        'choices' => [
                            'A' => 'It improves painting skills.',
                            'B' => 'It helps in handwriting.',
                            'C' => 'It allows problem solving using computers.',
                            'D' => 'It fixes mobile screens.',
                        ],
                    ],
                ]
            ],
            [
                'title' => 'Quiz 2: Programming Concepts',
                'questions' => [
                    [
                        'question_text' => 'What is a programming language?',
                        'question_type' => 'definition',
                        'correct_answer' => 'D',
                        'choices' => [
                            'A' => 'Spoken language for programmers.',
                            'B' => 'Type of computer virus.',
                            'C' => 'Tool for typing faster.',
                            'D' => 'A language used to write instructions for a computer.',
                        ],
                    ],
                    [
                        'question_text' => 'Which of these is a high-level programming language?',
                        'question_type' => 'conceptual',
                        'correct_answer' => 'A',
                        'choices' => [
                            'A' => 'Python',
                            'B' => 'Binary',
                            'C' => 'Assembly',
                            'D' => 'Circuit logic',
                        ],
                    ],
                    [
                        'question_text' => 'What does a compiler do?',
                        'question_type' => 'conceptual',
                        'correct_answer' => 'C',
                        'choices' => [
                            'A' => 'Fixes hardware',
                            'B' => 'Runs the software',
                            'C' => 'Converts code into machine language',
                            'D' => 'Draws user interfaces',
                        ],
                    ],
                ]
            ],
            [
                'title' => 'Quiz 3: Hardware vs Software',
                'questions' => [
                    [
                        'question_text' => 'What is hardware?',
                        'question_type' => 'definition',
                        'correct_answer' => 'B',
                        'choices' => [
                            'A' => 'A software tool',
                            'B' => 'The physical parts of a computer',
                            'C' => 'A cloud service',
                            'D' => 'A type of programming',
                        ],
                    ],
                    [
                        'question_text' => 'Which of the following is an example of software?',
                        'question_type' => 'conceptual',
                        'correct_answer' => 'A',
                        'choices' => [
                            'A' => 'Microsoft Word',
                            'B' => 'Hard disk',
                            'C' => 'Monitor',
                            'D' => 'CPU',
                        ],
                    ],
                    [
                        'question_text' => 'How do software and hardware work together?',
                        'question_type' => 'conceptual',
                        'correct_answer' => 'D',
                        'choices' => [
                            'A' => 'They don’t interact.',
                            'B' => 'Hardware only works with electricity.',
                            'C' => 'Software fixes hardware automatically.',
                            'D' => 'Software gives instructions to hardware to perform tasks.',
                        ],
                    ],
                ]
            ]
        ];

        foreach ($quizzes as $quizData) {
            $quiz = Quiz::create([
                'lecture_note_id' => $lectureNote->id,
                'title' => $quizData['title'],
                'prompt_used' => 'Auto-generated seed data',
                'ai_response' => null,
            ]);

            foreach ($quizData['questions'] as $q) {
                $question = Question::create([
                    'quiz_id' => $quiz->id,
                    'question_text' => $q['question_text'],
                    'question_type' => $q['question_type'],
                    'correct_answer' => $q['correct_answer'],
                ]);

                foreach ($q['choices'] as $letter => $text) {
                    Choice::create([
                        'question_id' => $question->id,
                        'choice_letter' => $letter,
                        'choice_text' => $text,
                    ]);
                }
            }
        }
    }
}
