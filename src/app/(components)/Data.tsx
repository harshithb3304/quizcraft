import React , {ReactNode} from "react";

interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
}

export interface DataProps {
  totalQuestions: number;
  questions: Question[];
}
type DataChildrenFunction = (data: DataProps) => ReactNode;
const Data: React.FC<{ children: DataChildrenFunction }> = ({ children }) => {
  const data: DataProps = {
    totalQuestions: 5,
    questions: [
      {
        id: 1,
        question: "What is the capital of France?",
        answers: ["Madrid", "Paris", "Rome", "Berlin"],
        correctAnswer: "Paris",
      },
      {
        id: 2,
        question: "What is the largest planet in our solar system?",
        answers: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: "Jupiter",
      },
      {
        id: 3,
        question: "What is the smallest country in the world?",
        answers: ["Monaco", "Maldives", "Vatican City", "San Marino"],
        correctAnswer: "Vatican City",
      },
      {
        id: 4,
        question: "What is the most widely spoken language in the world?",
        answers: ["English", "Mandarin", "Spanish", "Hindi"],
        correctAnswer: "Mandarin",
      },
      {
        id: 5,
        question: "Who is the founder of Microsoft?",
        answers: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
        correctAnswer: "Bill Gates",
      },
    ],
  };

  return (
    <div>
      {children(data)}
    </div>
  );
};

export default Data;


