import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Categories } from '../types/categories';

interface CategoriesState {
    categories: Categories[];
    fetchCategories: () => void;
}

export const useCategories = create<CategoriesState>()(
    immer(
        devtools((set) => ({
            categories: [],
            fetchCategories: async () => {
                try {
                    const response = await fetch(
                        `https://opentdb.com/api_category.php`,
                    );
                    if (!response.ok) {
                        throw new Error('Ошибка при загрузке категорий');
                    }
                    const data = (await response.json()) as {
                        trivia_categories: Categories[];
                    };
                    set({ categories: data.trivia_categories });
                } catch (e) {
                    console.error(e);
                }
            },
        })),
    ),
);
