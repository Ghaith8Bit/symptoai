import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function ConditionResult({ config, answers }) {
    const Icon = config.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className={`${config.color} p-6 rounded-2xl flex flex-col items-center`}>
                <Icon className="w-16 h-16 text-white mb-4" />
                <h2 className="text-4xl font-bold text-white mb-2">{config.label}</h2>
                <p className="text-xl text-white/90">{config.description}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4">التوصيات:</h3>
                <ul className="space-y-3">
                    {config.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center space-x-3 text-lg">
                            <CheckIcon className="w-5 h-5 text-green-500" />
                            <span>{rec}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}
