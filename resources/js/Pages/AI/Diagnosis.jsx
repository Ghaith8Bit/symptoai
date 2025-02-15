import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function DiagnosisAssistant({ auth }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatStarted, setChatStarted] = useState(false);
    const [conversationFinished, setConversationFinished] = useState(false);
    const messagesEndRef = useRef(null);

    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];

    const isGreeting = (message) => {
        const cleanMessage = message.toLowerCase().replace(/[^a-z ]/g, '').trim();
        return greetings.some(greet => cleanMessage === greet.toLowerCase());
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (conversationFinished || !newMessage.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: newMessage.trim() };
        setMessages(prev => [...prev, userMsg]);
        setNewMessage('');

        // Check for greeting
        if (isGreeting(newMessage.trim())) {
            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: 'Hello! How can I assist you with your medical concerns today?'
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
            return;
        }

        setIsTyping(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/diagnose', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms: newMessage.trim() }),
            });
            const data = await response.json();
            const responseText = data.response;
            const match = responseText.match(/\{"diagnosed_disease": ".*?"\}/);

            if (match) {
                const diagnosis = JSON.parse(match[0]);
                const botMsg = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: `Based on your symptoms, the possible diagnosis is: ${diagnosis.diagnosed_disease}`
                };
                setMessages(prev => [...prev, botMsg]);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            const errorMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: 'An error occurred while processing your request. Please try again.'
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
            setConversationFinished(true);
        }
    };

    const startChat = async () => {
        if (newMessage.trim()) {
            const userMsg = { id: Date.now(), sender: 'user', text: newMessage.trim() };
            setMessages([userMsg]);
            setNewMessage('');
            setChatStarted(true);

            // Check for greeting
            if (isGreeting(newMessage.trim())) {
                const botMsg = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: 'Hello! Please describe your symptoms so I can assist you.'
                };
                setMessages(prev => [...prev, botMsg]);
                setIsTyping(false);
                return;
            }

            setIsTyping(true);

            try {
                const response = await fetch('http://127.0.0.1:5000/diagnose', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ symptoms: newMessage.trim() }),
                });
                const data = await response.json();
                const responseText = data.response;
                const match = responseText.match(/\{"diagnosed_disease": ".*?"\}/);

                if (match) {
                    const diagnosis = JSON.parse(match[0]);
                    const diagnosisMsg = {
                        id: Date.now() + 1,
                        sender: 'bot',
                        text: `Diagnosis: ${diagnosis.diagnosed_disease}`
                    };
                    setMessages(prev => [...prev, diagnosisMsg]);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                const errorMsg = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: 'Error processing your request.'
                };
                setMessages(prev => [...prev, errorMsg]);
            } finally {
                setIsTyping(false);
                setConversationFinished(true);
            }
        } else {
            setChatStarted(true);
        }
    };


    const resetChat = () => {
        setMessages([]);
        setNewMessage('');
        setConversationFinished(false);
    };


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Diagnosis Assistant" />
            <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <header className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl">
                    <h1 className="text-2xl font-bold tracking-tighter">AI Health Companion</h1>
                    <p className="text-sm text-blue-100 mt-1">24/7 Symptom Analysis & Guidance</p>
                </header>

                {!chatStarted ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-8">
                        <div className="max-w-2xl space-y-8">
                            <div className="animate-fade-in">
                                <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                                    Health Assistant
                                </h1>
                                <p className="text-xl text-gray-300 mb-8">
                                    Describe your symptoms and get instant medical insights
                                </p>
                            </div>

                            <div className="relative group w-full max-w-2xl mx-auto">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Example: Headache, fever, and sore throat..."
                                        className="w-full px-6 py-5 text-lg bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700/50 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/30 placeholder-gray-400 transition-all duration-200 pr-24"
                                        onKeyPress={(e) => e.key === 'Enter' && startChat()}
                                    />
                                    <button
                                        onClick={startChat}
                                        className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold flex items-center space-x-2 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
                                    >
                                        <span>Analyze</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 p-4 overflow-y-auto space-y-4" id="chat-window">
                            {messages.length === 0 && (
                                <div className="text-center py-12 text-gray-400 animate-pulse">
                                    Waiting for your symptoms description...
                                </div>
                            )}

                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-200`}>
                                    <div className={`max-w-xl p-4 rounded-3xl shadow-lg ${msg.sender === 'user'
                                        ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-none'
                                        : 'bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-bl-none'
                                        }`}
                                    >
                                        <p className="text-lg leading-relaxed">{msg.text}</p>
                                        <div className="mt-2 text-xs opacity-70 flex items-center space-x-1">
                                            {msg.sender === 'bot' && (
                                                <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                                                    <path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
                                                </svg>
                                            )}
                                            <span>{msg.sender === 'user' ? 'You' : 'MediAI'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="p-4 bg-gray-800/90 backdrop-blur-sm rounded-3xl border border-gray-700/50 rounded-bl-none">
                                        <div className="flex space-x-2 items-center">
                                            <div className="typing-dot bg-blue-400"></div>
                                            <div className="typing-dot bg-purple-400"></div>
                                            <div className="typing-dot bg-blue-400"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {conversationFinished ? (
                            <div className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50 flex justify-center">
                                <button
                                    onClick={resetChat}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:scale-[1.02] transition-transform duration-200 shadow-lg hover:shadow-blue-500/20 flex items-center space-x-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                    </svg>
                                    <span>New Consultation</span>
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSend} className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
                                <div className="max-w-4xl mx-auto relative">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Describe symptoms in detail..."
                                        className="w-full pl-6 pr-24 py-5 text-lg bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700/50 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/30 placeholder-gray-400 transition-all duration-200"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium flex items-center space-x-2 hover:scale-[1.02] transition-transform duration-200 shadow-lg hover:shadow-blue-500/20"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>

            <style jsx>{`
                .typing-dot {
                    height: 8px;
                    width: 8px;
                    border-radius: 50%;
                    animation: typing 1.4s infinite ease-in-out;
                }
                .typing-dot:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .typing-dot:nth-child(3) {
                    animation-delay: 0.4s;
                }
                @keyframes typing {
                    0%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-6px); }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
