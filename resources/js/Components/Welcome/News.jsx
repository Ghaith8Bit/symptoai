import research from "../../../assets/research.jpg"

export default function NewsSection() {
    return (
        <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 shadow-xl dark:bg-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    Latest Diabetes Research
                </h2>
                <div className="space-y-6">
                    <div className="p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 dark:hover:bg-gray-700">
                        <h3 className="font-bold text-lg mb-2 dark:text-white">
                            New Glucose Monitoring Technology
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Breakthrough in non-invasive glucose monitoring using...
                        </p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 dark:hover:bg-gray-700">
                        <h3 className="font-bold text-lg mb-2 dark:text-white">
                            AI in Diabetes Prediction
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Machine learning models now achieve 95% accuracy in...
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                    src={research}
                    alt="Research"
                    className="w-full h-full object-cover animate-scaleIn"
                />
            </div>
        </div>
    );
}