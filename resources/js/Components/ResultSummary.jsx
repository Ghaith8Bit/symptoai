export default function ResultSummary({ answers }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">ملخص الإجابات:</h3>
            <div className="space-y-4">
                {answers.map((answer, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">{answer.questionText}</span>
                        <span className={`px-3 py-1 rounded-full ${answer.answer === "yes" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                            {answer.answer === "yes" ? "نعم" : "لا"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
