import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#05122b] text-white flex flex-col">
            {/* Header */}
            <div className="p-4 text-sm font-semibold">
                OpsMind-AI
            </div>

            {/* Center Card */}
            <div className="flex flex-1 items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#032257] w-[320px] rounded-lg p-8 flex flex-col gap-4"
                >
                    <h2 className="text-center text-lg font-semibold mb-2">
                        Sign Up
                    </h2>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs">Email</label>
                        <input
                            type="email"
                            className="bg-[#05122b98] h-8 rounded px-2 text-sm outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs">Password</label>
                        <input
                            type="password"
                            className="bg-[#05122b98] h-8 rounded px-2 text-sm outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="mt-2 bg-[#02112d] hover:bg-[#02112de1] transition rounded-md py-1 text-sm">
                        Sign Up
                    </button>
                    <p className="text-center text-xs mt-3">
                        Have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-white cursor-pointer hover:underline"
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;