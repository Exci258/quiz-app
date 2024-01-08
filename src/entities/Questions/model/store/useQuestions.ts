import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { shuffleArray } from '@/shared/lib/shuffleArray';
import { Question } from '../types/questions';

interface QuestionsState {
    questions: Question[];
    fetchQuestions: (
        amount: number,
        category: number,
        difficulty: string,
        type: string,
    ) => void;
    resetQuestions: () => void;
}

export const useQuestions = create<QuestionsState>()(
    immer(
        devtools((set) => ({
            questions: [],
            fetchQuestions: async (amount, category, difficulty, type) => {
                try {
                    const response = await fetch(
                        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`,
                    );
                    if (!response.ok) {
                        throw new Error('Ошибка при загрузке викторины');
                    }
                    const data = (await response.json()) as {
                        results: Question[];
                    };
                    const newData = data.results.map((question) => {
                        return {
                            ...question,
                            answers: shuffleArray([
                                ...question.incorrect_answers,
                                question.correct_answer,
                            ]),
                        };
                    });
                    set({ questions: newData });
                } catch (e) {
                    console.error(e);
                }
            },
            resetQuestions: () => set(() => ({ questions: [] })),
        })),
    ),
);
