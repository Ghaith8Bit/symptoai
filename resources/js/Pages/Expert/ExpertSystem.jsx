import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Confetti from 'react-dom-confetti';
import { IdentificationIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

import Question from '../../Components/Question';
import ProgressBar from '../../Components/ProgressBar';
import ConditionResult from '../../Components/ConditionResult';
import ResultSummary from '../../Components/ResultSummary';

const questions = [
    { id: 1, text: 'هل تعاني من ارتفاع الحرارة؟' },
    { id: 2, text: 'هل تعاني من سعال جاف؟' },
    { id: 3, text: 'هل تشعر بالتعب الشديد؟' },
    { id: 4, text: 'هل تعاني من ضيق في التنفس؟' },
];

const conditionConfig = {
    critical: {
        label: 'حرجة',
        color: 'bg-red-600',
        description: 'تحتاج إلى عناية طبية فورية!',
        recommendations: ['التمس العناية الطبية فورًا', 'اعزل نفسك عن الآخرين', 'راقب الأعراض باستمرار']
    },
    moderate: {
        label: 'متوسطة',
        color: 'bg-yellow-500',
        description: 'يتطلب مراقبة عن كثب',
        recommendations: ['راجع طبيب في أسرع وقت', 'التزم الراحة المنزلية', 'سجل تطور الأعراض']
    },
    mild: {
        label: 'طفيفة',
        color: 'bg-green-500',
        description: 'حالة عادية لا تستدعي القلق',
        recommendations: ['واصل المراقبة الروتينية', 'حافظ على النظافة الشخصية', 'استشر طبيب إذا ساءت الأعراض']
    }
};

const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    duration: 3000,
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

export default function ExpertSystem({ auth }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const controls = useAnimation();

    const handleAnswer = (answer) => {
        setAnswers(prev => [...prev, { questionId: questions[currentQuestionIndex].id, answer, questionText: questions[currentQuestionIndex].text }]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            if (evaluateCondition().label === 'طفيفة') setShowConfetti(true);
        }
    };

    const restartQuiz = () => {
        setAnswers([]);
        setCurrentQuestionIndex(0);
        setShowConfetti(false);
    };

    const evaluateCondition = () => {
        const yesCount = answers.filter(a => a.answer === 'yes').length;
        return yesCount >= 3 ? conditionConfig.critical : yesCount === 2 ? conditionConfig.moderate : conditionConfig.mild;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="النظام الطبي الذكي" />
            <div className="min-h-screen bg-gradient-to-br from-blue-400 via-teal-300 to-blue-100 py-12">
                <div className="max-w-3xl mx-auto px-4">
                    <motion.div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-8 text-center">
                            <h1 className="text-4xl font-bold text-white mb-3">التشخيص الذكي</h1>
                            <p className="text-white/90 text-lg">نظام تقييم طبي ذكي لقياس شدة الأعراض</p>
                            <Confetti active={showConfetti} config={confettiConfig} />
                        </div>

                        <AnimatePresence>
                            {currentQuestionIndex < questions.length ? (
                                <>
                                    <ProgressBar progress={(currentQuestionIndex / questions.length) * 100} current={currentQuestionIndex + 1} total={questions.length} />
                                    <Question question={questions[currentQuestionIndex]} onAnswer={handleAnswer} controls={controls} />
                                </>
                            ) : (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-8 space-y-8"
                                >
                                    <div className="text-center">
                                        <h2 className="text-3xl font-bold text-gray-800 mb-2">نتيجة التقييم</h2>
                                        <p className="text-gray-600 text-lg">بناءً على إجاباتك، إليك النتيجة والتوصيات:</p>
                                    </div>

                                    <ConditionResult config={evaluateCondition()} />
                                    <ResultSummary answers={answers} />

                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={restartQuiz}
                                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                                        >
                                            <ArrowPathIcon className="w-5 h-5" />
                                            إعادة الاختبار
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
