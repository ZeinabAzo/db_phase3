import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getMyProfile,
    updateProfile
} from "../services/userApi";

function EditProfile() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        profile_image: "",
        city: ""
    });


    useEffect(() => {

        getMyProfile()

            .then((response) => {

                const user = response.data;

                setForm({
                    first_name: user.first_name || "",
                    last_name: user.last_name || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    profile_image: user.profile_image || "",
                    city: user.city || ""
                });

            })

            .catch((error) => {

                console.log(
                    "PROFILE ERROR:",
                    error.response?.data
                );

            });

    }, []);


    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }


    function handleSubmit(e) {

        e.preventDefault();

        updateProfile(form)

            .then((response) => {

                console.log(
                    "UPDATE:",
                    response.data
                );

                alert(
                    "Profile updated successfully"
                );

                navigate("/profile");

            })

            .catch((error) => {

                console.log(
                    "UPDATE ERROR:",
                    error.response?.data
                );

                alert(
                    error.response?.data?.detail ||
                    "Update failed"
                );

            });

    }


    const inputClass = `
        w-full
        bg-gray-950
        border border-white/10
        text-white
        rounded-xl
        px-4
        py-3
        outline-none
        transition-all
        duration-300
        focus:border-yellow-400
        focus:ring-1
        focus:ring-yellow-400
        hover:border-white/20
        placeholder:text-gray-600
    `;


    return (

        <div className="
            relative
            min-h-screen
            bg-gray-950
            text-white
            px-6
            py-12
            overflow-hidden
        ">

            {/* Background glow */}

            <div className="
                absolute
                -top-40
                -right-40
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
                -left-40
                w-96
                h-96
                bg-blue-500/10
                rounded-full
                blur-3xl
                animate-pulse
            " />


            <div className="
                relative
                z-10
                max-w-3xl
                mx-auto
                animate-[fadeIn_0.7s_ease-out]
            ">


                {/* Header */}

                <div className="mb-10">

                    <p className="
                        text-yellow-400
                        text-sm
                        font-bold
                        tracking-widest
                        mb-3
                    ">
                        ACCOUNT SETTINGS
                    </p>


                    <h1 className="
                        text-4xl
                        md:text-5xl
                        font-black
                    ">
                        Edit Profile
                    </h1>


                    <p className="
                        text-gray-400
                        mt-3
                        text-lg
                    ">
                        Update your personal information and account details.
                    </p>

                </div>


                {/* Main Card */}

                <div className="
                    bg-gray-900
                    border
                    border-white/10
                    rounded-3xl
                    overflow-hidden
                    shadow-2xl
                ">


                    {/* Card Header */}

                    <div className="
                        bg-gradient-to-r
                        from-gray-800
                        to-gray-900
                        px-8
                        py-7
                        border-b
                        border-white/10
                    ">

                        <div className="
                            flex
                            items-center
                            gap-4
                        ">

                            <div className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-yellow-400/10
                                border
                                border-yellow-400/20
                                flex
                                items-center
                                justify-center
                                text-2xl
                            ">
                                ✏️
                            </div>


                            <div>

                                <h2 className="
                                    text-xl
                                    font-bold
                                ">
                                    Personal Information
                                </h2>

                                <p className="
                                    text-gray-500
                                    text-sm
                                    mt-1
                                ">
                                    Keep your profile information up to date.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="
                            p-8
                            space-y-6
                        "
                    >


                        {/* Name */}

                        <div className="
                            grid
                            md:grid-cols-2
                            gap-5
                        ">


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
                                    name="first_name"
                                    value={form.first_name}
                                    onChange={handleChange}
                                    placeholder="First name"
                                    className={inputClass}
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
                                    name="last_name"
                                    value={form.last_name}
                                    onChange={handleChange}
                                    placeholder="Last name"
                                    className={inputClass}
                                />

                            </div>

                        </div>


                        {/* Email */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Email
                            </label>

                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className={inputClass}
                            />

                        </div>


                        {/* Phone */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Phone
                            </label>

                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone number"
                                className={inputClass}
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
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="City"
                                className={inputClass}
                            />

                        </div>


                        {/* Profile image */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Profile Image URL
                            </label>

                            <input
                                name="profile_image"
                                value={form.profile_image}
                                onChange={handleChange}
                                placeholder="https://..."
                                className={inputClass}
                            />

                            <p className="
                                text-gray-600
                                text-xs
                                mt-2
                            ">
                                Enter a URL for your profile image.
                            </p>

                        </div>


                        {/* Divider */}

                        <div className="
                            pt-5
                            border-t
                            border-white/10
                        ">


                            {/* Buttons */}

                            <div className="
                                flex
                                flex-col-reverse
                                sm:flex-row
                                gap-3
                                sm:justify-end
                            ">

                                <button
                                    type="button"
                                    onClick={() => navigate("/profile")}
                                    className="
                                        px-6
                                        py-3
                                        rounded-xl
                                        border
                                        border-white/10
                                        text-gray-300
                                        font-semibold
                                        hover:bg-white/5
                                        hover:text-white
                                        transition-all
                                        duration-300
                                    "
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="
                                        px-7
                                        py-3
                                        rounded-xl
                                        bg-yellow-400
                                        text-gray-950
                                        font-extrabold
                                        hover:bg-yellow-300
                                        hover:scale-[1.02]
                                        hover:shadow-lg
                                        hover:shadow-yellow-400/20
                                        transition-all
                                        duration-300
                                    "
                                >
                                    Save Changes →
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditProfile;