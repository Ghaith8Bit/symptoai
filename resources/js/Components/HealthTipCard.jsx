export default function HealthTipCard({ tip }) {
    return (
        <div
            className="relative bg-white bg-opacity-80 border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 group"
            style={{ backdropFilter: 'blur(5px)' }}
        >
            {/* Decorative Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-400 via-blue-300 to-transparent opacity-20 rounded-lg pointer-events-none"></div>

            <h3 className="font-bold text-lg text-blue-900">{tip.title}</h3>
            <p className="text-sm text-gray-700 mt-2">{tip.description}</p>
        </div>
    );
}
