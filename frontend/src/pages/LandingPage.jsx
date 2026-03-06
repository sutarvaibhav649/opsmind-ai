import React from "react";
import { useNavigate } from "react-router-dom";
import {
    MessageSquare,
    FileText,
    Database,
    BarChart3
} from "lucide-react";

function LandingPage() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#05122b] text-white flex flex-col">

        {/* Navbar */}

        <div className="flex items-center justify-between px-10 py-5 border-b border-white/10">

            <h1 className="text-xl font-bold text-blue-400">
            OpsMind AI
            </h1>

            <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition"
            >
            Login
            </button>

        </div>

        {/* Hero Section */}

        <div className="flex flex-col items-center justify-center text-center px-6 py-24">

            <h1 className="text-5xl font-bold leading-tight max-w-4xl">

            Enterprise Knowledge Assistant
            <span className="text-blue-400"> Powered by AI</span>

            </h1>

            <p className="text-gray-400 mt-6 max-w-2xl text-lg">

            Ask questions across your company's SOPs, manuals, and internal
            documents. OpsMind AI retrieves the most relevant knowledge and
            provides precise answers with citations.

            </p>

            <div className="flex gap-4 mt-10">

            <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-sm transition"
            >
                Get Started
            </button>

            <button
                onClick={() => navigate("/login")}
                className="border border-white/20 hover:border-blue-400 px-6 py-3 rounded-lg text-sm transition"
            >
                Try Demo
            </button>

            </div>

        </div>

        {/* Features */}

        <div className="px-10 pb-24">

            <h2 className="text-center text-2xl font-semibold mb-12">

            Powerful AI Knowledge System

            </h2>

            <div className="grid md:grid-cols-4 gap-6">

            {/* Feature 1 */}

            <div className="bg-[#091837] border border-white/10 p-6 rounded-xl hover:border-blue-400 transition">

                <FileText className="text-blue-400 mb-4" size={28} />

                <h3 className="font-semibold mb-2">
                Document Ingestion
                </h3>

                <p className="text-gray-400 text-sm">
                Upload corporate PDFs and automatically convert them into
                searchable knowledge.
                </p>

            </div>

            {/* Feature 2 */}

            <div className="bg-[#091837] border border-white/10 p-6 rounded-xl hover:border-blue-400 transition">

                <Database className="text-blue-400 mb-4" size={28} />

                <h3 className="font-semibold mb-2">
                Vector Search
                </h3>

                <p className="text-gray-400 text-sm">
                Advanced semantic search retrieves the most relevant
                document chunks using embeddings.
                </p>

            </div>

            {/* Feature 3 */}

            <div className="bg-[#091837] border border-white/10 p-6 rounded-xl hover:border-blue-400 transition">

                <MessageSquare className="text-blue-400 mb-4" size={28} />

                <h3 className="font-semibold mb-2">
                AI Chat Interface
                </h3>

                <p className="text-gray-400 text-sm">
                Ask natural language questions and receive real-time AI
                responses with citations.
                </p>

            </div>

            {/* Feature 4 */}

            <div className="bg-[#091837] border border-white/10 p-6 rounded-xl hover:border-blue-400 transition">

                <BarChart3 className="text-blue-400 mb-4" size={28} />

                <h3 className="font-semibold mb-2">
                Admin Analytics
                </h3>

                <p className="text-gray-400 text-sm">
                Monitor queries, user activity, and document usage with
                a powerful analytics dashboard.
                </p>

            </div>

            </div>

        </div>

        {/* CTA Section */}

        <div className="text-center py-16 border-t border-white/10">

            <h2 className="text-2xl font-semibold mb-4">
            Start exploring your knowledge base
            </h2>

            <p className="text-gray-400 mb-6">

            Upload documents and let AI answer your team’s questions instantly.

            </p>

            <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-sm transition"
            >
            Launch App
            </button>

        </div>

        {/* Footer */}

        <div className="text-center text-gray-500 text-sm py-6 border-t border-white/10">

            Built for AI Innovation Lab Internship • OpsMind AI

        </div>

        </div>
    );
}

export default LandingPage;