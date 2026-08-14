import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../services/authApi";

function SignUp() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        identifier: "",
        identifier_type: "email",
        first_name: "",
        last_name: "",
        password: "",
        city: "Tehran",
        role: "spectator"
    });


    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }


    function handleSubmit(event) {
        event.preventDefault();

        signup(form)
            .then((response) => {
                console.log("SIGNUP:", response.data);

                navigate(
                    "/signup/verify",
                    {
                        state: {
                            identifier: form.identifier
                        }
                    }
                );
            })
            .catch((error) => {
                console.log(
                    "SIGNUP ERROR:",
                    error.response?.data
                );

                alert(
                    error.response?.data?.detail ||
                    "Signup failed"
                );
            });
    }


    const inputClass = `
        w-full
        bg-gray-950
        border border-white/10
        text-white
        rounded-xl
        px-4 py-3
        outline-none
        focus:border-yellow-400
        focus:ring-1
        focus:ring-yellow-400
        placeholder:text-gray-600
        hover:border-white/20
        transition-all
        duration-300
    `;


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

                    {/* Stadium decoration */}
                    <div className="
                        absolute
                        -bottom-16
                        -right-10
                        text-[190px]
                        opacity-10
                        animate-pulse
                    ">
                        🏟️
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
                            JOIN TICKETHUB
                        </p>


                        <h2 className="
                            text-5xl
                            font-black
                            leading-tight
                            mb-6
                        ">
                            Your seat is

                            <span className="text-yellow-400">
                                {" "}waiting.
                            </span>
                        </h2>


                        <p className="
                            text-gray-400
                            text-lg
                            leading-8
                            max-w-md
                        ">
                            Create your account and start discovering
                            exciting matches and unforgettable sporting events.
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
                                    ⚽
                                </span>

                                <span className="text-gray-300">
                                    Discover upcoming matches
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
                                    Reserve your favorite seats
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
                                    Manage your tickets securely
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
                            Create Account
                        </h1>


                        <p className="text-gray-500">
                            Join us and start booking tickets
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email / Phone */}
                        <div>

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
                                name="identifier"
                                value={form.identifier}
                                onChange={handleChange}
                                placeholder="Enter your email or phone"
                                className={inputClass}
                                required
                            />

                        </div>


                        {/* Identifier type */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Account Identifier
                            </label>

                            <select
                                name="identifier_type"
                                value={form.identifier_type}
                                onChange={handleChange}
                                className={inputClass}
                            >

                                <option value="email">
                                    Email
                                </option>

                                <option value="phone">
                                    Phone
                                </option>

                            </select>

                        </div>


                        {/* First + Last name */}
                        <div className="grid sm:grid-cols-2 gap-4">

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    text-gray-400
                                    mb-2
                                ">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="first_name"
                                    value={form.first_name}
                                    onChange={handleChange}
                                    placeholder="First name"
                                    className={inputClass}
                                    required
                                />

                            </div>


                            <div>

                                <label className="
                                    block
                                    text-sm
                                    text-gray-400
                                    mb-2
                                ">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="last_name"
                                    value={form.last_name}
                                    onChange={handleChange}
                                    placeholder="Last name"
                                    className={inputClass}
                                    required
                                />

                            </div>

                        </div>


                        {/* Password */}
                        <div>

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
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className={inputClass}
                                required
                            />

                        </div>


                        {/* City */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="Your city"
                                className={inputClass}
                                required
                            />

                        </div>


                        {/* Role */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Account Type
                            </label>

                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className={inputClass}
                            >

                                <option value="spectator">
                                    Spectator
                                </option>

                            </select>

                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            className="
                                group
                                relative
                                w-full
                                mt-2
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
                                Create Account →
                            </span>

                        </button>

                    </form>


                    <p className="
                        text-center
                        text-gray-500
                        text-sm
                        mt-6
                    ">
                        Already have an account?

                        {" "}

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="
                                text-yellow-400
                                hover:text-yellow-300
                                font-semibold
                                transition-colors
                            "
                        >
                            Sign In
                        </button>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default SignUp;