export default function LoginLogsStats() {
    const logs = [
        { date: '2025-01-05', time: '14:30', location: 'New York, USA' },
        { date: '2025-01-04', time: '18:15', location: 'Los Angeles, USA' },
        { date: '2025-01-03', time: '09:00', location: 'Chicago, USA' },
    ];

    return (
        <div className="bg-white p-6 shadow-sm sm:rounded-lg">
            <h3 className="font-semibold text-lg text-gray-900">Login Logs</h3>
            <table className="mt-4 w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-indigo-600 text-white">
                        <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{log.date}</td>
                            <td className="border border-gray-300 px-4 py-2">{log.time}</td>
                            <td className="border border-gray-300 px-4 py-2">{log.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
