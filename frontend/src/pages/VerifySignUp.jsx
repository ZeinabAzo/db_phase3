import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { verifySignup } from "../services/authApi";

function VerifySignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    const identifier = location.state?.identifier;
    const [code, setCode] = useState("");


    function handleSubmit(event) {
        event.preventDefault();

        if (!identifier) {
            alert("Signup information not found");
            navigate("/signup");
            return;
        }

        verifySignup({identifier,code }).then((response) => {
                console.log("VERIFY:", response.data);

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

                navigate("/");
            })
            .catch((error) => {
                console.log(
                    "VERIFY ERROR:",
                    error.response?.data
                );

                alert(
                    error.response?.data?.detail ||
                    "Invalid code"
                );
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


            {/* Main Card */}
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

                    {/* Lock decoration */}
                    <div className="
                        absolute
                        -bottom-16
                        -right-5
                        text-[190px]
                        opacity-10
                        animate-pulse
                    ">
                        🔐
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
                            ONE LAST STEP
                        </p>


                        <h2 className="
                            text-5xl
                            font-black
                            leading-tight
                            mb-6
                        ">
                            Verify your

                            <span className="text-yellow-400">
                                {" "}account.
                            </span>
                        </h2>


                        <p className="
                            text-gray-400
                            text-lg
                            leading-8
                            max-w-md
                        ">
                            Enter the verification code you received
                            to complete your registration and start
                            enjoying TicketHub.
                        </p>


                        {/* Steps */}
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
                                    text-yellow-400
                                    text-xl
                                    group-hover:scale-110
                                    transition-all
                                ">
                                    ✓
                                </span>

                                <span className="text-gray-300">
                                    Secure verification
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
                                    🎟️
                                </span>

                                <span className="text-gray-300">
                                    Access your tickets
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
                                    ⚽
                                </span>

                                <span className="text-gray-300">
                                    Enjoy the game
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}
                <div className="
                    p-8
                    md:p-12
                    flex
                    flex-col
                    justify-center
                ">

                    {/* Logo */}
                    <div className="text-center mb-8">

                        <div className="
                            text-3xl
                            font-black
                            mb-7
                        ">
                            Ticket
                            <span className="text-yellow-400">
                                Hub
                            </span>
                        </div>


                        {/* Animated icon */}
                        <div className="
                            relative
                            w-20
                            h-20
                            mx-auto
                            mb-6
                        ">

                            <div className="
                                absolute
                                inset-0
                                rounded-full
                                bg-yellow-400/10
                                animate-ping
                            " />

                            <div className="
                                relative
                                w-20
                                h-20
                                rounded-full
                                bg-yellow-400/10
                                border
                                border-yellow-400/30
                                flex
                                items-center
                                justify-center
                                text-4xl
                                shadow-lg
                                shadow-yellow-400/10
                            ">
                                🔐
                            </div>

                        </div>


                        <h1 className="
                            text-3xl
                            font-black
                            mb-3
                        ">
                            Verify Account
                        </h1>


                        <p className="
                            text-gray-500
                            leading-6
                            max-w-sm
                            mx-auto
                        ">
                            Enter the verification code sent to
                            your email or phone.
                        </p>

                    </div>


                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div>

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
                                value={code}
                                onChange={(e) =>
                                    setCode(e.target.value)
                                }
                                placeholder="Enter OTP code"
                                maxLength={6}
                                className="
                                    w-full
                                    bg-gray-950
                                    border
                                    border-white/10
                                    text-white
                                    text-center
                                    text-2xl
                                    font-bold
                                    tracking-[0.5em]
                                    rounded-xl
                                    px-4
                                    py-4
                                    outline-none
                                    focus:border-yellow-400
                                    focus:ring-1
                                    focus:ring-yellow-400
                                    placeholder:text-gray-600
                                    placeholder:text-base
                                    placeholder:tracking-normal
                                    hover:border-white/20
                                    transition-all
                                    duration-300
                                "
                                required
                            />

                        </div>


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
                                Verify Account →
                            </span>

                        </button>

                    </form>


                    {/* Back */}
                    <button
                        type="button"
                        onClick={() => navigate("/signup")}
                        className="
                            mt-7
                            text-sm
                            text-gray-500
                            hover:text-yellow-400
                            transition-colors
                            duration-200
                        "
                    >
                        ← Back to Sign Up
                    </button>

                </div>

            </div>

        </div>
    );
}

export default VerifySignUp;