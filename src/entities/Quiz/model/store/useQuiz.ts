import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

interface QuizState {
    correctAnswers: number;
    incrementCorrectAnswers: () => void;
    resetCorrectAnswers: () => void;
}

export const useQuiz = create<QuizState>()(
    immer(
        devtools((set) => ({
            correctAnswers: 0,
            incrementCorrectAnswers: () =>
                set((state) => ({ correctAnswers: state.correctAnswers + 1 })),
            resetCorrectAnswers: () => set(() => ({ correctAnswers: 0 })),
        })),
    ),
);
