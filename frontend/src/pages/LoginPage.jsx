// LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
            alert(data.error);
            return;
        }
        login(data.token);
        navigate("/chat");
    };

    return (
        <div className="min-h-screen bg-[#05122b] text-white flex flex-col">
            <div className="p-4 text-sm font-semibold">OpsMind-AI</div>
            <div className="flex flex-1 items-center justify-center px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#032257] w-full max-w-[320px] rounded-lg p-6 sm:p-8 flex flex-col gap-4"
                >
                    <h2 className="text-center text-lg font-semibold mb-2">Sign In</h2>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs">Email</label>
                        <input
                            type="email"
                            className="bg-[#05122b98] h-9 rounded px-3 text-sm outline-none focus:ring-1 focus:ring-blue-500 transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs">Password</label>
                        <input
                            type="password"
                            className="bg-[#05122b98] h-9 rounded px-3 text-sm outline-none focus:ring-1 focus:ring-blue-500 transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="mt-2 bg-blue-600 hover:bg-blue-700 transition rounded-md py-2 text-sm font-medium">
                        Sign In
                    </button>
                    <p className="text-center text-xs mt-1">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-blue-400 cursor-pointer hover:underline"
                        >
                            Register
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;