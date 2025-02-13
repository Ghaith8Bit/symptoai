import blog from "../../../assets/research.jpg"

export default function BlogSection() {
    return (
        <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 shadow-xl dark:bg-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    Medical Blog
                </h2>
                <div className="space-y-6">
                    <div className="p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 dark:hover:bg-gray-700">
                        <h3 className="font-bold text-lg mb-2 dark:text-white">
                            Living with Diabetes: Daily Management Tips
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Discover effective strategies for managing your diabetes...
                        </p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 dark:hover:bg-gray-700">
                        <h3 className="font-bold text-lg mb-2 dark:text-white">
                            Nutrition Guide for Diabetics
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Learn about the best dietary practices and meal planning...
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                    src={blog}
                    alt="Blog"
                    className="w-full h-full object-cover animate-scaleIn"
                />
            </div>
        </div>
    );
}