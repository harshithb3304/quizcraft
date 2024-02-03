"use client";
import React, {useState} from "react";
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
import {questions} from "@/data/quizbook";
import {number} from "prop-types";


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
                "data-[selected=true]:border-primary",
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
                    <span className="text-small text-foreground opacity-70">{description}</span>
                )}
            </div>
        </Component>
    );
};



const Quiz = () => {

    const [selectedAnswers, setSelectedAnswers] = useState<Array<number|null>>(Array(questions.length).fill(null));
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [result, setResult] = useState({
        score: 0,
        correct: 0,
        incorrect: 0,
    });
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [message, setMessage] = useState('');



    const handleAnswerSelect = (index: number) => {
        const temp = [...selectedAnswers]
        temp[activeQuestion] = index;
        setSelectedAnswers(temp);
    };

    const handleNextQuestion = () => {
        setActiveQuestion((prev) => prev + 1);

    };

    const handlePrevQuestion = () => {
        setActiveQuestion((prev) => prev - 1);

    };

    const handleClear = () => {
        const temp = [...selectedAnswers]
        temp[activeQuestion] = null;
        setSelectedAnswers(temp);
    };

    const handleConfirm = () => {
        if (selectedAnswers[activeQuestion] !== null) {
            const selectedAnswer = questions[activeQuestion].answers[selectedAnswers[activeQuestion] !];
            const correctAnswer = questions[activeQuestion]?.correctAnswer;

            if (selectedAnswer === correctAnswer) {
                setResult((prevResult) => ({
                    ...prevResult,
                    score: prevResult.score + 1,
                    correct: prevResult.correct + 1,
                }));
                setMessage('Correct Answer!');
            } else {
                setResult((prevResult) => ({
                    ...prevResult,
                    incorrect: prevResult.incorrect + 1,
                }));
                setMessage('Incorrect Answer. Tough Luck!');
            }
        } else {
            setMessage('Please select an answer before confirming.');
        }

        onOpen();
    };


    if (questions.length === 0) {
        return <div>No questions available. Please check your data source.</div>;
    }

    return (
        <div>
            <div>
                <h1>
                    Question : {activeQuestion + 1}
                    <span>/{questions.length}</span>
                </h1>
            </div>
            <div>
                <div>
                    <h1>{questions[activeQuestion].question}</h1>
                    <RadioGroup value={`${selectedAnswers[activeQuestion]}`}>
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
                    <Button color={"secondary"} onClick={handleNextQuestion}>Next Question</Button>
                    <Button color={'secondary'} onClick={handlePrevQuestion}>Prev Question</Button>
                    <Button color={"secondary"} onClick={handleClear}>Clear</Button>
                    <Button color={"secondary"} onClick={handleConfirm}>Confirm</Button>

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
                            }
                        }}
                    >
                        <ModalContent>
                            <ModalHeader className="flex flex-col gap-1">WARNING</ModalHeader>
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
    );


};

export default Quiz;
