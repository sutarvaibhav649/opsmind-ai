import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, FileText, Database, BarChart3 } from "lucide-react";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#05122b] text-white flex flex-col">
            {/* Navbar */}
            <div className="flex items-center justify-between px-5 sm:px-8 md:px-10 py-4 sm:py-5 border-b border-white/10">
                <h1 className="text-lg sm:text-xl font-bold text-blue-400">OpsMind AI</h1>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm transition"
                >
                    Login
                </button>
            </div>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center px-5 sm:px-8 py-14 sm:py-20 md:py-24">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-4xl">
                    Enterprise Knowledge Assistant
                    <span className="text-blue-400"> Powered by AI</span>
                </h1>
                <p className="text-gray-400 mt-5 sm:mt-6 max-w-2xl text-base sm:text-lg px-2">
                    Ask questions across your company's SOPs, manuals, and internal
                    documents. OpsMind AI retrieves the most relevant knowledge and
                    provides precise answers with citations.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 w-full sm:w-auto px-4 sm:px-0">
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-sm transition w-full sm:w-auto"
                    >
                        Get Started
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="border border-white/20 hover:border-blue-400 px-6 py-3 rounded-lg text-sm transition w-full sm:w-auto"
                    >
                        Try Demo
                    </button>
                </div>
            </div>

            {/* Features */}
            <div className="px-5 sm:px-8 md:px-10 pb-16 sm:pb-20 md:pb-24">
                <h2 className="text-center text-xl sm:text-2xl font-semibold mb-8 sm:mb-12">
                    Powerful AI Knowledge System
                </h2>
                {/* 1 col on mobile, 2 col on sm, 4 col on md */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-[#091837] border border-white/10 p-5 sm:p-6 rounded-xl hover:border-blue-400 transition">
                        <FileText className="text-blue-400 mb-4" size={28} />
                        <h3 className="font-semibold mb-2">Document Ingestion</h3>
                        <p className="text-gray-400 text-sm">
                            Upload corporate PDFs and automatically convert them into searchable knowledge.
                        </p>
                    </div>
                    <div className="bg-[#091837] border border-white/10 p-5 sm:p-6 rounded-xl hover:border-blue-400 transition">
                        <Database className="text-blue-400 mb-4" size={28} />
                        <h3 className="font-semibold mb-2">Vector Search</h3>
                        <p className="text-gray-400 text-sm">
                            Advanced semantic search retrieves the most relevant document chunks using embeddings.
                        </p>
                    </div>
                    <div className="bg-[#091837] border border-white/10 p-5 sm:p-6 rounded-xl hover:border-blue-400 transition">
                        <MessageSquare className="text-blue-400 mb-4" size={28} />
                        <h3 className="font-semibold mb-2">AI Chat Interface</h3>
                        <p className="text-gray-400 text-sm">
                            Ask natural language questions and receive real-time AI responses with citations.
                        </p>
                    </div>
                    <div className="bg-[#091837] border border-white/10 p-5 sm:p-6 rounded-xl hover:border-blue-400 transition">
                        <BarChart3 className="text-blue-400 mb-4" size={28} />
                        <h3 className="font-semibold mb-2">Admin Analytics</h3>
                        <p className="text-gray-400 text-sm">
                            Monitor queries, user activity, and document usage with a powerful analytics dashboard.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="text-center py-12 sm:py-16 border-t border-white/10 px-5">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Start exploring your knowledge base
                </h2>
                <p className="text-gray-400 mb-6 text-sm sm:text-base">
                    Upload documents and let AI answer your team's questions instantly.
                </p>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-sm transition"
                >
                    Launch App
                </button>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-500 text-xs sm:text-sm py-6 border-t border-white/10 px-4">
                Built for AI Innovation Lab Internship • OpsMind AI
            </div>
        </div>
    );
}

export default LandingPage;