export enum QuestionDifficulty {
    easy = 'easy',
    medium = 'medium',
    hard = 'hard',
}

export enum QuestionType {
    multiple = 'multiple',
    boolean = 'boolean',
}

export interface Question {
    type: QuestionType;
    difficulty: QuestionDifficulty;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
}
