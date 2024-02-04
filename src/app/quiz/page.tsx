"use client";
import React, { useState } from "react";
import {
  RadioGroup,
  Radio,
  useRadio,
  VisuallyHidden,
  cn,
  RadioProps,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { questions } from "@/data/quizbook";
import Link from "next/link";

interface CustomRadioProps {
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  description?: string;
}

const CustomRadio = (props: RadioProps) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-secondary lg:max-w-[1000px] cursor-pointer"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};

let results: number[] = [0, 0, 0];

const Quiz = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number | null>>(
    Array(questions.length).fill(null)
  );
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [result, setResult] = useState({
    score: 0,
    correct: 0,
    incorrect: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");
  const [isConfirmClicked, setIsConfirmClicked] = useState<Array<boolean>>(
    Array(questions.length).fill(false)
  );
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (index: number) => {
    const temp = [...selectedAnswers];
    temp[activeQuestion] = index;
    setSelectedAnswers(temp);
  };

  const handleNextQuestion = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1);
    } else {
      setActiveQuestion((prev) => prev);
    }
  };

  const handleClear = () => {
    if (!isConfirmClicked[activeQuestion]) {
      const temp = [...selectedAnswers];
      temp[activeQuestion] = null;
      setSelectedAnswers(temp);
    }
  };

  const handleConfirm = () => {
    if (selectedAnswers[activeQuestion] !== null) {
      const selectedAnswer =
        questions[activeQuestion].answers[selectedAnswers[activeQuestion]!];
      const correctAnswer = questions[activeQuestion]?.correctAnswer;

      if (selectedAnswer === correctAnswer) {
        setResult((prevResult) => ({
          ...prevResult,
          score: prevResult.score + 1,
          correct: prevResult.correct + 1,
        }));

        setMessage("Correct Answer!");
        setWarning("Congratulations");
      } else {
        setResult((prevResult) => ({
          ...prevResult,
          incorrect: prevResult.incorrect + 1,
        }));

        setMessage("Incorrect Answer. Tough Luck!");
        setWarning("Sorry");
      }

      const tempIsConfirmClicked = [...isConfirmClicked];
      tempIsConfirmClicked[activeQuestion] = true;
      setIsConfirmClicked(tempIsConfirmClicked);
    } else {
      setMessage("Please select an answer before confirming.");
      setWarning("Warning");
    }

    onOpen();
  };

  if (questions.length === 0) {
    return <div>No questions available. Please check your data source.</div>;
  }

  return (
    <div className="">
      {!showResult ? (
        <div>
          <div className="text-7xl flex justify-center p-4 mb-10">
            <h1>
              Question : {activeQuestion + 1}
              <span>/{questions.length}</span>
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <div>
              <h1 className=" text-5xl p-4 m-10">
                {questions[activeQuestion].question}
              </h1>
              <div>
                <RadioGroup
                  className="flex justify-center  p-4 m-4 w-full"
                  value={`${selectedAnswers[activeQuestion]}`}
                >
                  {questions[activeQuestion].answers.map((answer, index) => (
                    <CustomRadio
                      key={index}
                      onChange={() => handleAnswerSelect(index)}
                      value={`${index}`}
                    >
                      {answer}
                    </CustomRadio>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex justify-center flex-col items-center p-1 gap-4 lg:flex-row">
                <Button color={"secondary"} onClick={handlePrevQuestion}>
                  Prev Question
                </Button>
                {activeQuestion < questions.length - 1 ? (
                  <Button color={"secondary"} onClick={handleNextQuestion}>
                    Next Question
                  </Button>
                ) : (
                  <Button
                    color={"secondary"}
                    onClick={() => setShowResult(true)}
                  >
                    See Results
                  </Button>
                )}
                <Button color={"secondary"} onClick={handleClear}>
                  Clear
                </Button>
                <Button color={"secondary"} onClick={handleConfirm}>
                  Confirm
                </Button>
              </div>

              <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onClose={onClose}
                motionProps={{
                  variants: {
                    enter: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut",
                      },
                    },
                    exit: {
                      y: -20,
                      opacity: 0,
                      transition: {
                        duration: 0.2,
                        ease: "easeIn",
                      },
                    },
                  },
                }}
              >
                <ModalContent>
                  <ModalHeader className="flex flex-col gap-1">
                    {warning}
                  </ModalHeader>
                  <ModalBody>
                    <p>{message}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center  flex-col">
            <h1 className="text-7xl p-4 m-10">YOUR RESULTS</h1>
            <h1 className="text-3xl ">
              Your percentage is {(result.score / 5) * 100}%
            </h1>
            <h1 className="text-3xl">Your score is {result.score}</h1>
            <h1 className="text-3xl">
              Number of correct answers are {result.correct}{" "}
            </h1>
            <h1 className="text-3xl">
              Number of incorrect answers are {result.incorrect}
            </h1>
            <Link href={"/quizpage"}>
              <Button className="p-4 m-10" color="secondary">
                Restart Test
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
