import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCategories } from '@/entities/Categories';
import {
    QuestionDifficulty,
    QuestionType,
    useQuestions,
} from '@/entities/Questions';

interface Form {
    amount: number;
    category: number;
    difficulty: QuestionDifficulty;
    type: QuestionType;
}

export const CreateQuizForm = () => {
    const fetchQuestions = useQuestions((state) => state.fetchQuestions);
    const fetchCategories = useCategories((state) => state.fetchCategories);
    const categories = useCategories((state) => state.categories);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Form>();
    const onSubmit: SubmitHandler<Form> = (data) => {
        fetchQuestions(data.amount, data.category, data.difficulty, data.type);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <form
            className={
                'flex flex-col gap-4 min-w-96 bg-white shadow-lg p-4 rounded-md'
            }
            onSubmit={handleSubmit(onSubmit)}
        >
            <label className={'flex flex-col gap-1 relative'}>
                Number of Questions
                <input
                    type="number"
                    defaultValue={5}
                    {...register('amount', {
                        min: {
                            value: 5,
                            message:
                                'The number of questions cannot be less than 5',
                        },
                        max: {
                            value: 50,
                            message: 'The number of questions cannot exceed 50',
                        },
                    })}
                    className={'border-2 p-1 rounded-lg'}
                    placeholder={'Number of Questions'}
                />
                {errors.amount && (
                    <span
                        className={
                            'text-red-500 text-sm absolute bottom-[-20px]'
                        }
                    >
                        {errors.amount.message}
                    </span>
                )}
            </label>
            <label className={'flex flex-col-reverse gap-1'}>
                <select
                    {...register('category')}
                    className={'border-2 p-1 rounded-lg'}
                >
                    <option value="">Any Category</option>
                    {categories.map((category) => {
                        return (
                            <option value={category.id} key={category.id}>
                                {category.name}
                            </option>
                        );
                    })}
                </select>
                Category
            </label>
            <label className={'flex flex-col-reverse gap-1'}>
                <select
                    {...register('difficulty')}
                    className={'border-2 p-1 rounded-lg'}
                >
                    <option value="">Any Difficulty</option>
                    <option value={QuestionDifficulty.easy}>Easy</option>
                    <option value={QuestionDifficulty.medium}>Medium</option>
                    <option value={QuestionDifficulty.hard}>Hard</option>
                </select>
                Difficulty
            </label>
            <label className={'flex flex-col-reverse gap-1'}>
                <select
                    {...register('type')}
                    className={'border-2 p-1 rounded-lg'}
                >
                    <option value="">Any Type</option>
                    <option value={QuestionType.multiple}>Multiple</option>
                    <option value={QuestionType.boolean}>True / False</option>
                </select>
                Type
            </label>
            <button
                className={
                    'p-2 mt-4 bg-indigo-400 hover:bg-purple-500 text-white rounded-lg'
                }
                type={'submit'}
            >
                Start
            </button>
        </form>
    );
};
