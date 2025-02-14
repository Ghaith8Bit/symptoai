
import { motion } from "framer-motion";
import { FiActivity, FiMail, FiFileText, FiUser, FiClock, FiDatabase } from "react-icons/fi";

const StatisticsTable = () => {
    // Dummy data for statistics
    const statsData = [
        {
            icon: <FiMail className="w-5 h-5" />,
            title: "Contact Requests",
            value: "2,845",
            trend: "+12.5%",
            color: "text-blue-500"
        },
        {
            icon: <FiActivity className="w-5 h-5" />,
            title: "AI Diagnostics",
            value: "1,234",
            trend: "+24.7%",
            color: "text-purple-500"
        },
        {
            icon: <FiFileText className="w-5 h-5" />,
            title: "Blogs Published",
            value: "893",
            trend: "+8.2%",
            color: "text-teal-500"
        },
        {
            icon: <FiUser className="w-5 h-5" />,
            title: "Total Logins",
            value: "15,893",
            trend: "+3.1%",
            color: "text-orange-500"
        },
        {
            icon: <FiClock className="w-5 h-5" />,
            title: "Consultation Hours",
            value: "4,231h",
            trend: "+15.3%",
            color: "text-pink-500"
        },
        {
            icon: <FiDatabase className="w-5 h-5" />,
            title: "Medical Data Processed",
            value: "34TB",
            trend: "+42%",
            color: "text-green-500"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 border border-gray-100"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FiDatabase className="mr-2 text-blue-600" />
                Platform Statistics
            </h2>

            <div className="grid gap-4">
                {statsData.map((stat, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-20`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">{stat.title}</h3>
                                    <p className="text-sm text-gray-500">Last 30 days</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                                <span className={`text-sm ${stat.color}`}>{stat.trend}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default StatisticsTable;