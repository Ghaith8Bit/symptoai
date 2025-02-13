import about from "../../../assets/about.jpg"

export default function AboutSection() {
    return (
        <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 shadow-xl dark:bg-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    About Our Diabetes Initiative
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    We're pioneering advanced diabetes diagnostics using AI-powered analysis
                    and continuous glucose monitoring. Our team of endocrinologists and
                    data scientists work together to deliver personalized care plans.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl dark:bg-gray-700">
                        <h3 className="font-bold text-blue-600 dark:text-blue-400">15K+</h3>
                        <p className="text-sm">Patients Helped</p>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-xl dark:bg-gray-700">
                        <h3 className="font-bold text-teal-600 dark:text-teal-400">98%</h3>
                        <p className="text-sm">Accuracy Rate</p>
                    </div>
                </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                    src={about}
                    alt="Medical Team"
                    className="w-full h-full object-cover animate-scaleIn"
                />
            </div>
        </div>
    );
}