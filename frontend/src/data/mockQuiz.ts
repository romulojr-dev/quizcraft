import { Quiz } from '@/types/quiz';

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Test your knowledge of React basics',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: '1',
        text: 'What is React?',
        options: [
          'A JavaScript library for building user interfaces',
          'A programming language',
          'A database management system',
          'A web server'
        ],
        correctAnswer: 0
      },
      {
        id: '2',
        text: 'What hook is used for side effects in React?',
        options: [
          'useState',
          'useEffect',
          'useContext',
          'useReducer'
        ],
        correctAnswer: 1
      },
      {
        id: '3',
        text: 'Which of these is not a React Hook?',
        options: [
          'useState',
          'useEffect',
          'useHistory',
          'useLoop'
        ],
        correctAnswer: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Computer Hardware Basics',
    description: 'Test your knowledge about computer parts and components',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: '1',
        text: 'What is the "brain" of the computer?',
        options: [
          'CPU (Central Processing Unit)',
          'RAM (Random Access Memory)',
          'GPU (Graphics Processing Unit)',
          'Power Supply Unit'
        ],
        correctAnswer: 0
      },
      {
        id: '2',
        text: 'Which component temporarily stores data for quick access?',
        options: [
          'Hard Drive',
          'RAM',
          'CPU',
          'BIOS'
        ],
        correctAnswer: 1
      },
      {
        id: '3',
        text: 'What does GPU stand for?',
        options: [
          'General Processing Unit',
          'Graphics Performance Utility',
          'Graphics Processing Unit',
          'General Purpose Unit'
        ],
        correctAnswer: 2
      },
      {
        id: '4',
        text: 'Which storage device has no moving parts?',
        options: [
          'Hard Disk Drive (HDD)',
          'Floppy Disk',
          'Solid State Drive (SSD)',
          'DVD Drive'
        ],
        correctAnswer: 2
      },
      {
        id: '5',
        text: 'What component supplies power to all parts of the computer?',
        options: [
          'Motherboard',
          'Power Supply Unit (PSU)',
          'CPU',
          'Battery'
        ],
        correctAnswer: 1
      },
      {
        id: '6',
        text: 'Which component connects all parts of the computer together?',
        options: [
          'CPU',
          'RAM',
          'Motherboard',
          'Power Supply'
        ],
        correctAnswer: 2
      },
      {
        id: '7',
        text: 'What type of port is commonly used for connecting a mouse or keyboard?',
        options: [
          'HDMI',
          'USB',
          'VGA',
          'Ethernet'
        ],
        correctAnswer: 1
      },
      {
        id: '8',
        text: 'Which component is responsible for displaying images on your monitor?',
        options: [
          'CPU',
          'RAM',
          'GPU',
          'Power Supply'
        ],
        correctAnswer: 2
      },
      {
        id: '9',
        text: 'What is the purpose of a heat sink?',
        options: [
          'To power the computer',
          'To store data',
          'To cool components',
          'To process graphics'
        ],
        correctAnswer: 2
      },
      {
        id: '10',
        text: 'Which of these is an input device?',
        options: [
          'Monitor',
          'Printer',
          'Speakers',
          'Keyboard'
        ],
        correctAnswer: 3
      }
    ]
  },
  {
    id: '3',
    title: 'General Science',
    description: 'Test your knowledge of basic scientific concepts',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: '1',
        text: 'What is the closest planet to the Sun?',
        options: [
          'Venus',
          'Mercury',
          'Mars',
          'Earth'
        ],
        correctAnswer: 1
      },
      {
        id: '2',
        text: 'Which of these is not a state of matter?',
        options: [
          'Solid',
          'Liquid',
          'Energy',
          'Gas'
        ],
        correctAnswer: 2
      },
      {
        id: '3',
        text: 'What is the basic unit of life?',
        options: [
          'Cell',
          'Atom',
          'Molecule',
          'Tissue'
        ],
        correctAnswer: 0
      },
      {
        id: '4',
        text: 'What is the process by which plants make their food?',
        options: [
          'Respiration',
          'Photosynthesis',
          'Digestion',
          'Decomposition'
        ],
        correctAnswer: 1
      },
      {
        id: '5',
        text: 'Which part of the human body produces insulin?',
        options: [
          'Liver',
          'Kidneys',
          'Pancreas',
          'Stomach'
        ],
        correctAnswer: 2
      },
      {
        id: '6',
        text: 'What is the speed of light in vacuum?',
        options: [
          '299,792 kilometers per second',
          '199,792 kilometers per second',
          '399,792 kilometers per second',
          '499,792 kilometers per second'
        ],
        correctAnswer: 0
      },
      {
        id: '7',
        text: "Which element has the chemical symbol 'Fe'?",
        options: [
          'Fluorine',
          'Iron',
          'Francium',
          'Fermium'
        ],
        correctAnswer: 1
      },
      {
        id: '8',
        text: 'What is the largest organ in the human body?',
        options: [
          'Brain',
          'Liver',
          'Skin',
          'Heart'
        ],
        correctAnswer: 2
      },
      {
        id: '9',
        text: 'Which force keeps planets in orbit around the Sun?',
        options: [
          'Nuclear Force',
          'Electromagnetic Force',
          'Gravity',
          'Friction'
        ],
        correctAnswer: 2
      },
      {
        id: '10',
        text: 'What is the most abundant gas in Earth\'s atmosphere?',
        options: [
          'Oxygen',
          'Carbon Dioxide',
          'Hydrogen',
          'Nitrogen'
        ],
        correctAnswer: 3
      }
    ]
  }
];