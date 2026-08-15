import { useEffect, useState } from "react";
import { getMyProfile } from "../services/userApi";
import { Link } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getMyProfile()
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (!user) {
        return (
            <div className="
                min-h-screen
                bg-gray-950
                flex
                items-center
                justify-center
                text-white
            ">
                <div className="text-center">

                    <div className="
                        relative
                        w-16
                        h-16
                        mx-auto
                        mb-6
                    ">

                        <div className="
                            absolute
                            inset-0
                            rounded-full
                            border-4
                            border-gray-800
                        />

                        <div className="
                            absolute
                            inset-0
                            rounded-full
                            border-4
                            border-transparent
                            border-t-yellow-400
                            animate-spin
                        />

                        <div className="
                            absolute
                            inset-3
                            rounded-full
                            bg-yellow-400/10
                            flex
                            items-center
                            justify-center
                        ">
                            👤
                        </div>

                    </div>

                    <p className="text-gray-400 animate-pulse">
                        Loading profile...
                    </p>

                </div>
            </div>
        );
    }

    const initials =
        `${user.first_name?.charAt(0) || ""}${user.last_name?.charAt(0) || ""}`
            .toUpperCase();


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
                -left-40
                w-96
                h-96
                bg-yellow-400/10
                rounded-full
                blur-3xl
            " />

            <div className="
                absolute
                bottom-0
                -right-40
                w-96
                h-96
                bg-blue-500/10
                rounded-full
                blur-3xl
            " />


            <div className="
                relative
                z-10
                max-w-4xl
                mx-auto
                animate-[fadeIn_0.7s_ease-out]
            ">

                {/* Header */}
                <div className="mb-10">

                    <p className="
                        text-yellow-400
                        text-sm
                        font-bold
                        tracking-[0.25em]
                        mb-3
                    ">
                        ACCOUNT
                    </p>

                    <h1 className="
                        text-4xl
                        md:text-5xl
                        font-black
                    ">
                        My Profile
                    </h1>

                    <p className="
                        text-gray-400
                        mt-3
                        text-lg
                    ">
                        Manage your personal information
                        and account details.
                    </p>

                </div>


                {/* Profile Card */}
                <div className="
                    bg-gray-900
                    border
                    border-white/10
                    rounded-3xl
                    overflow-hidden
                    shadow-2xl
                    hover:border-yellow-400/20
                    transition-all
                    duration-500
                ">

                    {/* Profile header */}
                    <div className="
                        relative
                        bg-gradient-to-br
                        from-gray-800
                        via-gray-900
                        to-gray-950
                        px-8
                        py-10
                        overflow-hidden
                    ">

                        {/* Decorative glow */}
                        <div className="
                            absolute
                            -top-24
                            -right-24
                            w-64
                            h-64
                            bg-yellow-400/10
                            rounded-full
                            blur-3xl
                        " />


                        <div className="
                            relative
                            z-10
                            flex
                            flex-col
                            sm:flex-row
                            items-center
                            sm:items-start
                            gap-6
                        ">

                            {/* Avatar */}
                            <div className="
                                relative
                                group
                            ">

                                <div className="
                                    w-28
                                    h-28
                                    rounded-3xl
                                    bg-yellow-400
                                    text-gray-950
                                    flex
                                    items-center
                                    justify-center
                                    text-4xl
                                    font-black
                                    shadow-xl
                                    shadow-yellow-400/10
                                    group-hover:scale-105
                                    group-hover:rotate-2
                                    transition-all
                                    duration-300
                                ">
                                    {initials || "👤"}
                                </div>

                                <div className="
                                    absolute
                                    -bottom-2
                                    -right-2
                                    w-8
                                    h-8
                                    rounded-full
                                    bg-green-400
                                    border-4
                                    border-gray-900
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-950
                                    text-xs
                                ">
                                    ✓
                                </div>

                            </div>


                            {/* User info */}
                            <div className="
                                text-center
                                sm:text-left
                                flex-1
                            ">

                                <h2 className="
                                    text-3xl
                                    font-black
                                ">
                                    {user.first_name}
                                    {" "}
                                    {user.last_name}
                                </h2>


                                <p className="
                                    text-gray-400
                                    mt-2
                                    break-all
                                ">
                                    {user.email || user.phone}
                                </p>


                                <div className="
                                    flex
                                    flex-wrap
                                    justify-center
                                    sm:justify-start
                                    gap-3
                                    mt-5
                                ">

                                    <span className="
                                        px-4
                                        py-1.5
                                        rounded-full
                                        bg-yellow-400/10
                                        border
                                        border-yellow-400/30
                                        text-yellow-400
                                        text-sm
                                        font-bold
                                        capitalize
                                    ">
                                        {user.role}
                                    </span>


                                    {user.city && (
                                        <span className="
                                            px-4
                                            py-1.5
                                            rounded-full
                                            bg-white/5
                                            border
                                            border-white/10
                                            text-gray-300
                                            text-sm
                                        ">
                                            📍 {user.city}
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Information */}
                    <div className="p-8">

                        <div className="flex items-center gap-3 mb-7">

                            <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-yellow-400/10
                                border
                                border-yellow-400/20
                                flex
                                items-center
                                justify-center
                            ">
                                👤
                            </div>

                            <div>
                                <h3 className="
                                    text-xl
                                    font-bold
                                ">
                                    Personal Information
                                </h3>

                                <p className="
                                    text-gray-500
                                    text-sm
                                ">
                                    Your account details
                                </p>
                            </div>

                        </div>


                        <div className="
                            grid
                            sm:grid-cols-2
                            gap-5
                        ">

                            {/* First Name */}
                            <div className="
                                group
                                bg-gray-950
                                rounded-2xl
                                p-5
                                border
                                border-white/5
                                hover:border-yellow-400/20
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            ">

                                <p className="
                                    text-gray-500
                                    text-sm
                                    mb-2
                                ">
                                    First Name
                                </p>

                                <p className="
                                    font-bold
                                    text-lg
                                    text-gray-200
                                ">
                                    {user.first_name || "—"}
                                </p>

                            </div>


                            {/* Last Name */}
                            <div className="
                                group
                                bg-gray-950
                                rounded-2xl
                                p-5
                                border
                                border-white/5
                                hover:border-yellow-400/20
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            ">

                                <p className="
                                    text-gray-500
                                    text-sm
                                    mb-2
                                ">
                                    Last Name
                                </p>

                                <p className="
                                    font-bold
                                    text-lg
                                    text-gray-200
                                ">
                                    {user.last_name || "—"}
                                </p>

                            </div>


                            {/* Email */}
                            <div className="
                                group
                                bg-gray-950
                                rounded-2xl
                                p-5
                                border
                                border-white/5
                                hover:border-yellow-400/20
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            ">

                                <p className="
                                    text-gray-500
                                    text-sm
                                    mb-2
                                ">
                                    Email
                                </p>

                                <p className="
                                    font-bold
                                    text-gray-200
                                    break-all
                                ">
                                    {user.email || "—"}
                                </p>

                            </div>


                            {/* Phone */}
                            <div className="
                                group
                                bg-gray-950
                                rounded-2xl
                                p-5
                                border
                                border-white/5
                                hover:border-yellow-400/20
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            ">

                                <p className="
                                    text-gray-500
                                    text-sm
                                    mb-2
                                ">
                                    Phone
                                </p>

                                <p className="
                                    font-bold
                                    text-gray-200
                                ">
                                    {user.phone || "—"}
                                </p>

                            </div>


                            {/* City */}
                            <div className="
                                group
                                bg-gray-950
                                rounded-2xl
                                p-5
                                border
                                border-white/5
                                hover:border-yellow-400/20
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            ">

                                <p className="
                                    text-gray-500
                                    text-sm
                                    mb-2
                                ">
                                    City
                                </p>

                                <p className="
                                    font-bold
                                    text-gray-200
                                ">
                                    {user.city || "—"}
                                </p>

                            </div>


                            {/* Role */}
                            <div className="
                                group
                                bg-gray-950
                                rounded-2xl
                                p-5
                                border
                                border-white/5
                                hover:border-yellow-400/20
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            ">

                                <p className="
                                    text-gray-500
                                    text-sm
                                    mb-2
                                ">
                                    Account Type
                                </p>

                                <p className="
                                    font-bold
                                    text-gray-200
                                    capitalize
                                ">
                                    {user.role || "—"}
                                </p>

                            </div>

                        </div>


                        {/* Edit */}
                        <div className="
                            mt-8
                            pt-7
                            border-t
                            border-white/10
                            flex
                            justify-end
                        ">

                            <Link
                                to="/edit-profile"
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-yellow-400
                                    text-gray-950
                                    font-extrabold
                                    hover:bg-yellow-300
                                    hover:scale-105
                                    hover:shadow-lg
                                    hover:shadow-yellow-400/20
                                    transition-all
                                    duration-300
                                "
                            >
                                <span>
                                    ✏️
                                </span>

                                <span>
                                    Edit Profile
                                </span>

                                <span className="
                                    group-hover:translate-x-1
                                    transition-transform
                                ">
                                    →
                                </span>

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;