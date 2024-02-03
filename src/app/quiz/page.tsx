"use client"
import React, { useState } from "react";
import Data , {DataProps} from "@/app/(components)/Data";
import {RadioGroup, Radio, useRadio, VisuallyHidden, cn, RadioProps} from "@nextui-org/react";

const CustomRadio = (props: RadioProps & { checked: boolean }) => {
    const {
        Component,
        children,
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

const questionsArray: DataProps['questions'] = [];
const Quiz = () => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer,setSelectedAnswer] = useState('')
    const [checked,setChecked] = useState(false)
    const [selectedAnswerIndex,setSelectedAnswerIndex] = useState<number|null>(null)
    const [showResult, setShowResult] = useState(false)
    const [result,setResult] = useState({
        score:0,
        correct:0,
        incorrect:0
    })

    const handleAnswerSelect = (index : number) => {
        setSelectedAnswerIndex(index);
    };

    const handleNextQuestion = () => {
        setActiveQuestion((prev) => prev + 1);
        setSelectedAnswerIndex(null);
    };

    const handlePrevQuestion = () => {
        setActiveQuestion((prev) => prev - 1);
        setSelectedAnswerIndex(null);
    };

    const handleClear = () => {
        setSelectedAnswerIndex(null);
    };

    return (
        <Data>
            {(data: DataProps) => {
                const questionsArray = data.questions;





                return (
                    <div>
                        <div>
                            <h1>
                                Question : {activeQuestion + 1}
                                <span>/{questionsArray.length}</span>
                            </h1>
                        </div>
                        <div>
                            {!showResult ? (
                                <div>
                                    <h1>{questionsArray[activeQuestion].question}</h1>
                                    <RadioGroup>
                                        {questionsArray[activeQuestion].answers.map((answer, index) => (
                                            <CustomRadio
                                                key={index}
                                                onChange={() => handleAnswerSelect(index)}
                                                checked={selectedAnswerIndex === index}
                                                value={answer}
                                            >
                                                {answer}
                                            </CustomRadio>
                                        ))}
                                    </RadioGroup>
                                    <button onClick={handleNextQuestion}>Next Question</button>
                                    <button onClick={handlePrevQuestion}>Prev Question</button>
                                    <button onClick={handleClear}>Clear</button>
                                    <button>Confirm</button>

                                </div>
                            ) : (
                                <div>

                                </div>
                            )}
                        </div>
                    </div>
                );
            }}
        </Data>
    );
};

export default Quiz;