import { useQuestions } from '@/entities/Questions';
import { useState } from 'react';
import { useQuiz } from '../../model/store/useQuiz';
import { decode } from 'html-entities';
import QuizIcon from '@/shared/assets/quiz.svg';

export const Quiz = () => {
    const questions = useQuestions((state) => state.questions);
    const [step, setStep] = useState(0);
    const correctAnswers = useQuiz((state) => state.correctAnswers);
    const incrementCorrectAnswers = useQuiz(
        (state) => state.incrementCorrectAnswers,
    );
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const resetCorrectAnswers = useQuiz((state) => state.resetCorrectAnswers);
    const resetQuestions = useQuestions((state) => state.resetQuestions);
    const progress = ((step + 1) / questions.length) * 100;
    const onClickAnswer = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const onNextQuestion = () => {
        if (!selectedAnswer) {
            return;
        }
        if (selectedAnswer === questions[step].correct_answer) {
            incrementCorrectAnswers();
        }
        setSelectedAnswer('');
        setStep((prevState) => prevState + 1);
    };

    const onResetQuiz = () => {
        resetCorrectAnswers();
        resetQuestions();
    };

    if (step === questions.length) {
        return (
            <div
                className={
                    'flex flex-col items-center gap-10 font-semibold bg-white ' +
                    'shadow-lg p-4 rounded-md min-w-96'
                }
            >
                <h1
                    className={'text-3xl'}
                >{`Result: ${correctAnswers} / ${questions.length}`}</h1>
                <QuizIcon width={200} height={200} />
                <button
                    onClick={onResetQuiz}
                    className={
                        'p-2 w-full bg-indigo-400 hover:bg-purple-500 text-white rounded-lg'
                    }
                >
                    Play again
                </button>
            </div>
        );
    }

    return (
        <div className={'w-96 font-semibold bg-white shadow-lg p-4 rounded-md'}>
            <h2 className={'text-center text-xl mb-2'}>{`Question #${
                step + 1
            }`}</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                    className="bg-gradient-to-r from-indigo-400 to-purple-500 h-2.5 rounded-full"
                    style={{
                        width: `${progress}%`,
                        transition: 'width 0.3s ease-in-out',
                    }}
                ></div>
            </div>
            <h1 className={'mb-3 text-center'}>
                {decode(questions[step].question)}
            </h1>

            <div className={'flex gap-4 flex-col'}>
                {questions[step].answers.map((answer) => {
                    return (
                        <div key={answer} className={'flex w-full rounded-md'}>
                            <input
                                id={answer}
                                type="radio"
                                value={answer}
                                checked={selectedAnswer === answer}
                                className={'appearance-none peer'}
                                onChange={() => onClickAnswer(answer)}
                            />
                            <label
                                htmlFor={answer}
                                key={answer}
                                className={
                                    'p-1 border-2 rounded-md block w-full cursor-pointer ' +
                                    'peer-checked:border-indigo-400 peer-checked:text-white ' +
                                    'peer-checked:bg-indigo-400 ' +
                                    'hover:bg-stone-100'
                                }
                            >
                                {decode(answer)}
                            </label>
                        </div>
                    );
                })}
                <button
                    className={
                        'p-2 bg-indigo-400 hover:bg-purple-500 text-white rounded-lg'
                    }
                    onClick={onNextQuestion}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
