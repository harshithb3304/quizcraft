import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const QuizPage = () => {
  return (
    <div>
      <h1 className="flex items-center justify-center p-4 text-base md:text-lg lg:text-xl xl:text-2xl mt-20 mb-8">
          Hey I am trying to build a Quiz app so click the below button to start the Quiz
      </h1>
      <div className="flex items-center justify-center">
        <Link href="/quiz">
          <Button radius="sm" size="lg" color="secondary">
            Start Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizPage;
