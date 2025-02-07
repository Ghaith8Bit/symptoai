import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function ChatBot({ auth }) {
    const [messages, setMessages] = useState([{
        id: Date.now(),
        sender: 'bot',
        text: 'Hello! I am your Medical Assistant. How can I help you today?',
    }]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Enhanced scroll behavior
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // User message
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: newMessage.trim(),
        };

        setMessages(prev => [...prev, userMsg]);
        setNewMessage('');

        // Show typing indicator
        setIsTyping(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Bot response
        const botMsg = {
            id: Date.now() + 1,
            sender: 'bot',
            text: 'Thank you for your message. I am still learning to help with disease predictions. Please hold on for further assistance.',
        };

        setIsTyping(false);
        setMessages(prev => [...prev, botMsg]);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Medical Chat Assistant
                </h2>
            }
        >
            <Head title="Chat Bot" />

            <div className="py-12 max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 shadow-lg">
                        <div className="flex items-center space-x-4">
                            <div className="animate-bounce">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="text-white text-xl font-bold tracking-wide">Medical Chat Assistant</h3>
                        </div>
                    </div>

                    {/* Chat Body */}
                    <div className="p-4 h-[500px] overflow-y-auto custom-scrollbar">
                        {messages.map((msg, index) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                            >
                                <div className={`relative max-w-md p-4 rounded-2xl shadow-md transition-all duration-200 ${msg.sender === 'user'
                                    ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white animate-message-user'
                                    : 'bg-gradient-to-br from-gray-100 to-white text-gray-800 animate-message-bot'
                                    } ${index === messages.length - 1 ? 'animate-pop-in' : ''}`}
                                    style={{
                                        clipPath: msg.sender === 'user'
                                            ? 'polygon(0 0, 100% 0, 100% 75%, 98% 100%, 0 100%, 0% 50%)'
                                            : 'polygon(0 0, 100% 0, 100% 100%, 98% 75%, 0 100%, 0% 50%)'
                                    }}>
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                    {msg.sender === 'user' && (
                                        <div className="absolute right-0 bottom-0 w-4 h-4 bg-blue-600 transform translate-x-1/2 rotate-45"></div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-2xl w-max animate-pulse">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white/90 backdrop-blur-sm">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Type your health concern..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transform transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
                            >
                                Send
                                <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx global>{`
                @keyframes message-user {
                    0% { transform: translateX(20px) scale(0.9); opacity: 0; }
                    100% { transform: translateX(0) scale(1); opacity: 1; }
                }

                @keyframes message-bot {
                    0% { transform: translateX(-20px) scale(0.9); opacity: 0; }
                    100% { transform: translateX(0) scale(1); opacity: 1; }
                }

                @keyframes pop-in {
                    0% { transform: scale(0.95); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .animate-message-user {
                    animation: message-user 0.3s ease-out;
                }

                .animate-message-bot {
                    animation: message-bot 0.3s ease-out;
                }

                .animate-pop-in {
                    animation: pop-in 0.2s ease-out;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.5);
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.8);
                }

                .delay-100 {
                    animation-delay: 100ms;
                }

                .delay-200 {
                    animation-delay: 200ms;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}