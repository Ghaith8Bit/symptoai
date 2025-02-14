import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { FaHeadSideVirus, FaLungs, FaTooth, FaBandAid, FaHeartbeat, FaBone } from 'react-icons/fa';

const ExpertType = ({ auth }) => {
    const symptoms = [
        { id: 1, name: 'الصداع', icon: <FaHeadSideVirus />, color: 'from-blue-500 to-purple-600' },
        { id: 2, name: 'ألم الحنجرة', icon: <FaLungs />, color: 'from-rose-500 to-pink-600' },
        { id: 3, name: 'ألم الأسنان', icon: <FaTooth />, color: 'from-cyan-500 to-blue-600' },
        { id: 4, name: 'إصابات الجلد', icon: <FaBandAid />, color: 'from-green-500 to-emerald-600' },
        { id: 5, name: 'ألم الصدر', icon: <FaHeartbeat />, color: 'from-red-500 to-rose-600' },
        { id: 6, name: 'ألم المفاصل', icon: <FaBone />, color: 'from-amber-500 to-orange-600' },
    ];

    const handleCardClick = (symptom) => {
        window.location.href = `/expertsystem`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 120 }
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="النظام الذبي للتشخيص الطبي" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-7xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        اختر نوع العرض الطبي
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {symptoms.map((symptom) => (
                            <motion.div
                                key={symptom.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer"
                                onClick={() => handleCardClick(symptom.name)}
                            >
                                <div className={`bg-gradient-to-br ${symptom.color} rounded-xl p-6 shadow-xl transform transition-all duration-300 hover:shadow-2xl h-48 flex flex-col items-center justify-center`}>
                                    <div className="text-6xl text-white mb-4 transition-transform duration-300 group-hover:scale-110">
                                        {symptom.icon}
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white text-center">
                                        {symptom.name}
                                    </h2>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ExpertType;