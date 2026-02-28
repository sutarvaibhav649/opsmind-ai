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
            body: JSON.stringify({ email, password })
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
        <div className="min-h-screen bg-[#2c2c2c] text-white flex flex-col">
            
            {/* Header */}
            <div className="p-4 text-sm font-semibold">
                OpsMind-AI
            </div>

            {/* Center Card */}
            <div className="flex flex-1 items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#3a3a3a] w-[320px] rounded-lg p-8 flex flex-col gap-4"
                >
                    <h2 className="text-center text-lg font-semibold mb-2">
                        Sign In
                    </h2>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs">Email</label>
                        <input
                            type="email"
                            className="bg-[#555] h-8 rounded px-2 text-sm outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs">Password</label>
                        <input
                            type="password"
                            className="bg-[#555] h-8 rounded px-2 text-sm outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="mt-2 bg-[#6b6b6b] hover:bg-[#7c7c7c] transition rounded-md py-1 text-sm"
                    >
                        Sign In
                    </button>

                    <p className="text-center text-xs mt-3">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-blue-400 cursor-pointer hover:underline"
                        >
                            register
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;