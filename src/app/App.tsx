import { useQuestions } from '@/entities/Questions';
import { Quiz } from '@/entities/Quiz';
import { CreateQuizForm } from '@/features/CreateQuizForm';

function App() {
    const questionsLength = useQuestions((state) => state.questions.length);
    return (
        <main
            className={
                'min-h-screen flex justify-center items-center ' +
                'bg-gradient-to-r from-indigo-400 to-purple-500'
            }
        >
            {questionsLength <= 0 ? <CreateQuizForm /> : <Quiz />}
        </main>
    );
}

export default App;
