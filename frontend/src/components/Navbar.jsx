import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyProfile } from "../services/userApi";

function Navbar() {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [isAdmin, setIsAdmin] = useState(false);

    const location = useLocation();

    useEffect(() => {
        function updateToken() {
            setToken(localStorage.getItem("token"));
        }

        window.addEventListener("storage", updateToken);

        return () => {
            window.removeEventListener("storage", updateToken);
        };
    }, []);

    useEffect(() => {
        if (!token) {
            setIsAdmin(false);
            return;
        }

        getMyProfile()
            .then((response) => {
                setIsAdmin(response.data.role === "admin");
            })
            .catch((error) => {
                console.log(
                    "NAVBAR ERROR:",
                    error.response?.data
                );

                setIsAdmin(false);
            });
    }, [token]);

    function handleLogout() {
        localStorage.removeItem("token");

        setToken(null);
        setIsAdmin(false);

        window.location.href = "/";
    }

    function navClass(path) {
        const active = location.pathname === path;

        return `
            relative
            px-3
            py-2
            rounded-lg
            transition-all
            duration-300
            ${
                active
                    ? "bg-yellow-400 text-gray-950 font-semibold shadow-lg shadow-yellow-400/10"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-white/5"
            }
        `;
    }

    return (
        <nav
            className="
                sticky
                top-0
                z-50
                bg-gray-950/90
                backdrop-blur-xl
                border-b
                border-white/10
                text-white
                px-6
                md:px-10
                py-4
            "
        >

            <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="
                        group
                        flex
                        items-center
                        gap-2
                        text-2xl
                        font-extrabold
                        tracking-tight
                        whitespace-nowrap
                    "
                >

                    <span
                        className="
                            w-9
                            h-9
                            flex
                            items-center
                            justify-center
                            rounded-xl
                            bg-yellow-400
                            text-gray-950
                            text-lg
                            group-hover:rotate-12
                            group-hover:scale-110
                            transition-all
                            duration-300
                        "
                    >
                        ⚽
                    </span>

                    <span>
                        Ticket
                        <span className="text-yellow-400">
                            Hub
                        </span>
                    </span>

                </Link>


                {/* Navigation */}
                <div className="hidden md:flex items-center gap-2">

                    {isAdmin && (
                        <Link
                            to="/admin"
                            className={navClass("/admin")}
                        >
                            🛠️ Admin
                        </Link>
                    )}

                    <Link
                        to="/matches"
                        className={navClass("/matches")}
                    >
                        🏟️ Matches
                    </Link>

                    <Link
                        to="/search-tickets"
                        className={navClass("/search-tickets")}
                    >
                        🔎 Search
                    </Link>


                    {token ? (
                        <>

                            <Link
                                to="/my-tickets"
                                className={navClass("/my-tickets")}
                            >
                                🎟️ My Tickets
                            </Link>

                            <Link
                                to="/active-reservations"
                                className={navClass("/active-reservations")}
                            >
                                ⏱️ Reservations
                            </Link>

                            <Link
                                to="/profile"
                                className={navClass("/profile")}
                            >
                                👤 Profile
                            </Link>

                            <Link
                                to="/history"
                                className={navClass("/history")}
                            >
                                📋 History
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="
                                    ml-2
                                    px-4
                                    py-2
                                    rounded-lg
                                    border
                                    border-red-400/30
                                    text-red-300
                                    hover:bg-red-500/10
                                    hover:text-red-200
                                    hover:scale-105
                                    transition-all
                                    duration-200
                                "
                            >
                                Logout
                            </button>

                        </>
                    ) : (
                        <>

                            <Link
                                to="/login"
                                className={navClass("/login")}
                            >
                                Sign In
                            </Link>

                            <Link
                                to="/signup"
                                className="
                                    px-5
                                    py-2
                                    rounded-lg
                                    bg-yellow-400
                                    text-gray-950
                                    font-bold
                                    hover:bg-yellow-300
                                    hover:scale-105
                                    hover:shadow-lg
                                    hover:shadow-yellow-400/20
                                    transition-all
                                    duration-300
                                "
                            >
                                Sign Up
                            </Link>

                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;