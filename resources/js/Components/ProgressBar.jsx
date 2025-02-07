import { motion } from "framer-motion";

export default function ProgressBar({ progress, current, total }) {
    return (
        <div className="px-8 pt-6">
            <div className="flex justify-between mb-4">
                <span className="text-gray-500">السؤال {current} من {total}</span>
                <span className="font-semibold text-blue-600">{Math.round(progress)}% اكتمال</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-teal-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
    );
}
