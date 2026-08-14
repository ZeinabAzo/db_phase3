import { useState } from "react";
import {
    login,
    sendOtp,
    verifyOtp
} from "../services/authApi";
import { useNavigate } from "react-router-dom";

function Login() {
    const [mode, setMode] = useState("password");

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");

    const navigate = useNavigate();


    function handleLogin(event) {
        event.preventDefault();

        const identifierType = identifier.includes("@")
            ? "email"
            : "phone";

        if (mode === "otp") {
            verifyOtp({
                identifier: identifier,
                identifier_type: identifierType,
                code: otp
            })
                .then((response) => {
                    localStorage.setItem(
                        "token",
                        response.data.access_token
                    );

                    window.dispatchEvent(
                        new Event("storage")
                    );

                    alert("Login successful");

                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                    alert("Invalid OTP");
                });

            return;
        }

        login({
            identifier: identifier,
            identifier_type: identifierType,
            password: password
        })
            .then((response) => {
                localStorage.setItem(
                    "token",
                    response.data.access_token
                );

                localStorage.setItem(
                    "user_id",
                    response.data.user_id
                );

                window.dispatchEvent(
                    new Event("storage")
                );

                alert("Login successful");

                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                alert("Login failed");
            });
    }


    function handleSendOtp() {
        const identifierType = identifier.includes("@")
            ? "email"
            : "phone";

        sendOtp({
            identifier: identifier,
            identifier_type: identifierType
        })
            .then(() => {
                alert("OTP sent successfully");
            })
            .catch((error) => {
                console.log(error);
                alert("Failed to send OTP");
            });
    }


    return (
        <div className="
            relative
            min-h-screen
            bg-gray-950
            text-white
            flex
            items-center
            justify-center
            px-6
            py-12
            overflow-hidden
        ">

            {/* Background glow */}
            <div className="
                absolute
                -top-40
                -left-40
                w-96
                h-96
                bg-yellow-400/10
                rounded-full
                blur-3xl
                animate-pulse
            " />

            <div className="
                absolute
                -bottom-40
                -right-40
                w-96
                h-96
                bg-blue-500/10
                rounded-full
                blur-3xl
                animate-pulse
            " />


            {/* Main card */}
            <div className="
                relative
                z-10
                w-full
                max-w-5xl
                grid
                md:grid-cols-2
                bg-gray-900
                border
                border-white/10
                rounded-3xl
                overflow-hidden
                shadow-2xl
                animate-[fadeIn_0.7s_ease-out]
            ">


                {/* LEFT SIDE */}
                <div className="
                    hidden
                    md:flex
                    relative
                    bg-gradient-to-br
                    from-gray-900
                    via-gray-800
                    to-gray-950
                    p-12
                    flex-col
                    justify-center
                    overflow-hidden
                ">

                    {/* Decorative ball */}
                    <div className="
                        absolute
                        -bottom-20
                        -right-10
                        text-[180px]
                        opacity-10
                        animate-bounce
                    ">
                        ⚽
                    </div>

                    <div className="
                        absolute
                        top-10
                        right-10
                        w-32
                        h-32
                        rounded-full
                        bg-yellow-400/10
                        blur-3xl
                    " />


                    <div className="relative z-10">

                        <p className="
                            text-yellow-400
                            font-bold
                            tracking-[0.25em]
                            text-sm
                            mb-5
                        ">
                            WELCOME BACK
                        </p>


                        <h2 className="
                            text-5xl
                            font-black
                            leading-tight
                            mb-6
                        ">
                            Your next

                            <span className="text-yellow-400">
                                {" "}match
                            </span>

                            {" "}is waiting.
                        </h2>


                        <p className="
                            text-gray-400
                            text-lg
                            leading-8
                            max-w-md
                        ">
                            Sign in to manage your tickets,
                            reservations and upcoming sporting events.
                        </p>


                        <div className="mt-10 space-y-5">

                            <div className="
                                flex
                                items-center
                                gap-4
                                group
                            ">

                                <span className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-yellow-400/10
                                    border
                                    border-yellow-400/20
                                    flex
                                    items-center
                                    justify-center
                                    text-xl
                                    group-hover:scale-110
                                    group-hover:rotate-6
                                    transition-all
                                ">
                                    🎟️
                                </span>

                                <span className="text-gray-300">
                                    Easy ticket booking
                                </span>

                            </div>


                            <div className="
                                flex
                                items-center
                                gap-4
                                group
                            ">

                                <span className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-yellow-400/10
                                    border
                                    border-yellow-400/20
                                    flex
                                    items-center
                                    justify-center
                                    text-xl
                                    group-hover:scale-110
                                    group-hover:rotate-6
                                    transition-all
                                ">
                                    🔒
                                </span>

                                <span className="text-gray-300">
                                    Secure account
                                </span>

                            </div>


                            <div className="
                                flex
                                items-center
                                gap-4
                                group
                            ">

                                <span className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-yellow-400/10
                                    border
                                    border-yellow-400/20
                                    flex
                                    items-center
                                    justify-center
                                    text-xl
                                    group-hover:scale-110
                                    group-hover:rotate-6
                                    transition-all
                                ">
                                    ⚡
                                </span>

                                <span className="text-gray-300">
                                    Fast reservations
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}
                <div className="p-8 md:p-12">

                    <div className="text-center mb-8">

                        <div className="
                            text-3xl
                            font-black
                            mb-5
                        ">
                            Ticket
                            <span className="text-yellow-400">
                                Hub
                            </span>
                        </div>


                        <h1 className="
                            text-3xl
                            font-black
                            mb-2
                        ">
                            Sign In
                        </h1>


                        <p className="text-gray-500">
                            Access your account
                        </p>

                    </div>


                    <form onSubmit={handleLogin}>

                        {/* Login mode */}
                        <div className="
                            flex
                            mb-6
                            bg-gray-950
                            border
                            border-white/10
                            rounded-xl
                            p-1
                        ">

                            <button
                                type="button"
                                onClick={() => setMode("password")}
                                className={`
                                    flex-1
                                    py-3
                                    rounded-lg
                                    font-semibold
                                    transition-all
                                    duration-300
                                    ${
                                        mode === "password"
                                            ? "bg-yellow-400 text-gray-950 shadow-lg"
                                            : "text-gray-400 hover:text-white"
                                    }
                                `}
                            >
                                Password
                            </button>


                            <button
                                type="button"
                                onClick={() => setMode("otp")}
                                className={`
                                    flex-1
                                    py-3
                                    rounded-lg
                                    font-semibold
                                    transition-all
                                    duration-300
                                    ${
                                        mode === "otp"
                                            ? "bg-yellow-400 text-gray-950 shadow-lg"
                                            : "text-gray-400 hover:text-white"
                                    }
                                `}
                            >
                                OTP Login
                            </button>

                        </div>


                        {/* Email / Phone */}
                        <div className="mb-5">

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Email or Phone
                            </label>


                            <input
                                type="text"
                                placeholder="Enter your email or phone"
                                value={identifier}
                                onChange={(e) =>
                                    setIdentifier(e.target.value)
                                }
                                className="
                                    w-full
                                    bg-gray-950
                                    border
                                    border-white/10
                                    text-white
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:border-yellow-400
                                    focus:ring-1
                                    focus:ring-yellow-400
                                    placeholder:text-gray-600
                                    transition-all
                                    duration-300
                                    hover:border-white/20
                                "
                            />

                        </div>


                        {/* Password */}
                        {mode === "password" && (
                            <div className="
                                mb-6
                                animate-[fadeIn_0.3s_ease-out]
                            ">

                                <label className="
                                    block
                                    text-sm
                                    text-gray-400
                                    mb-2
                                ">
                                    Password
                                </label>


                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="
                                        w-full
                                        bg-gray-950
                                        border
                                        border-white/10
                                        text-white
                                        rounded-xl
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-yellow-400
                                        focus:ring-1
                                        focus:ring-yellow-400
                                        placeholder:text-gray-600
                                        transition-all
                                        duration-300
                                        hover:border-white/20
                                    "
                                />

                            </div>
                        )}


                        {/* OTP */}
                        {mode === "otp" && (
                            <div className="
                                animate-[fadeIn_0.3s_ease-out]
                            ">

                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    className="
                                        w-full
                                        mb-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-yellow-400/40
                                        text-yellow-400
                                        font-semibold
                                        hover:bg-yellow-400/10
                                        hover:border-yellow-400
                                        transition-all
                                        duration-300
                                    "
                                >
                                    Send OTP
                                </button>


                                <div className="mb-6">

                                    <label className="
                                        block
                                        text-sm
                                        text-gray-400
                                        mb-2
                                    ">
                                        Verification Code
                                    </label>


                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) =>
                                            setOtp(e.target.value)
                                        }
                                        className="
                                            w-full
                                            bg-gray-950
                                            border
                                            border-white/10
                                            text-white
                                            rounded-xl
                                            px-4
                                            py-3
                                            outline-none
                                            focus:border-yellow-400
                                            focus:ring-1
                                            focus:ring-yellow-400
                                            placeholder:text-gray-600
                                            transition-all
                                            duration-300
                                        "
                                    />

                                </div>

                            </div>
                        )}


                        {/* Submit */}
                        <button
                            type="submit"
                            className="
                                group
                                relative
                                w-full
                                py-3.5
                                rounded-xl
                                bg-yellow-400
                                text-gray-950
                                font-extrabold
                                text-lg
                                overflow-hidden
                                hover:bg-yellow-300
                                hover:scale-[1.02]
                                hover:shadow-xl
                                hover:shadow-yellow-400/20
                                transition-all
                                duration-300
                            "
                        >

                            <span className="relative z-10">

                                {mode === "password"
                                    ? "Sign In →"
                                    : "Verify OTP →"}

                            </span>

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Login;