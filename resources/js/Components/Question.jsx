import { motion } from "framer-motion";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

export default function Question({ question, onAnswer, controls }) {
    return (
        <motion.div
            key={`question-${question.id}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 my-6"
        >
            <h3 className="text-3xl font-semibold text-center text-gray-800 leading-tight">
                {question.text}
            </h3>
            <div className="flex justify-center gap-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAnswer("yes")}
                    className="flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg transition-colors duration-200"
                    animate={controls}
                >
                    <XMarkIcon className="w-6 h-6" />
                    <span className="text-xl">نعم</span>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAnswer("no")}
                    className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg transition-colors duration-200"
                    animate={controls}
                >
                    <CheckIcon className="w-6 h-6" />
                    <span className="text-xl">لا</span>
                </motion.button>
            </div>
        </motion.div>
    );
}
