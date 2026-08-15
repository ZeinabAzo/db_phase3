import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getMatches } from "../services/matchApi";
import homeBackground from "../assets/images/home-background.jpg";

function Home() {

    useEffect(() => {

        getMatches()
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    return (

        <div
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-black
                text-white
            "
        >

            {/* Background */}
            <div
                className="
                    absolute
                    inset-0
                    bg-cover
                    bg-center
                    scale-105
                    animate-pulse
                "
                style={{
                    backgroundImage: `url(${homeBackground})`,
                    animationDuration: "8s"
                }}
            />

            {/* Dark overlay */}
            <div
                className="
                    absolute
                    inset-0
                    bg-black/60
                "
            />

            {/* Animated lights */}
            <div
                className="
                    absolute
                    -top-32
                    -left-32
                    w-96
                    h-96
                    bg-blue-500/20
                    rounded-full
                    blur-3xl
                    animate-pulse
                "
            />

            <div
                className="
                    absolute
                    -bottom-32
                    -right-32
                    w-96
                    h-96
                    bg-yellow-400/20
                    rounded-full
                    blur-3xl
                    animate-pulse
                "
            />

            {/* Content */}
            <div
                className="
                    relative
                    z-10
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    px-6
                "
            >

                <div
                    className="
                        max-w-4xl
                        text-center
                        animate-[fadeIn_1s_ease-out]
                    "
                >

                    {/* Small label */}
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            mb-6
                            rounded-full
                            border
                            border-yellow-400/30
                            bg-yellow-400/10
                            text-yellow-300
                            text-sm
                            font-semibold
                            backdrop-blur-sm
                        "
                    >
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />

                        LIVE SPORTS TICKETS
                    </div>


                    {/* Main title */}
                    <h1
                        className="
                            text-5xl
                            md:text-7xl
                            font-black
                            tracking-tight
                            leading-tight
                            drop-shadow-2xl
                        "
                    >
                        Experience

                        <span
                            className="
                                block
                                text-transparent
                                bg-clip-text
                                bg-gradient-to-r
                                from-yellow-300
                                via-yellow-400
                                to-orange-500
                            "
                        >
                            The Game
                        </span>
                    </h1>


                    {/* Subtitle */}
                    <p
                        className="
                            mt-6
                            text-lg
                            md:text-2xl
                            text-gray-200
                            max-w-2xl
                            mx-auto
                            leading-relaxed
                        "
                    >
                        Book your favorite sports tickets,
                        find the best seats, and experience
                        every moment live.
                    </p>


                    {/* Buttons */}
                    <div
                        className="
                            mt-10
                            flex
                            flex-col
                            sm:flex-row
                            justify-center
                            gap-4
                        "
                    >

                        <Link
                            to="/matches"
                            className="
                                group
                                px-8
                                py-4
                                rounded-xl
                                bg-yellow-400
                                text-black
                                font-bold
                                text-lg
                                shadow-lg
                                shadow-yellow-400/20
                                hover:bg-yellow-300
                                hover:scale-105
                                transition-all
                                duration-300
                            "
                        >
                            Explore Matches

                            <span
                                className="
                                    inline-block
                                    ml-2
                                    group-hover:translate-x-1
                                    transition-transform
                                "
                            >
                                →
                            </span>

                        </Link>


                        <Link
                            to="/search-tickets"
                            className="
                                px-8
                                py-4
                                rounded-xl
                                border
                                border-white/30
                                bg-white/10
                                backdrop-blur-md
                                text-white
                                font-bold
                                text-lg
                                hover:bg-white/20
                                hover:scale-105
                                transition-all
                                duration-300
                            "
                        >
                            Search Tickets
                        </Link>

                    </div>


                    {/* Bottom stats */}
                    <div
                        className="
                            mt-16
                            grid
                            grid-cols-3
                            max-w-xl
                            mx-auto
                            border-t
                            border-white/20
                            pt-8
                        "
                    >

                        <div>
                            <p className="text-2xl md:text-3xl font-bold">
                                ⚡
                            </p>

                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                                Fast Booking
                            </p>
                        </div>


                        <div
                            className="
                                border-x
                                border-white/20
                            "
                        >
                            <p className="text-2xl md:text-3xl font-bold">
                                🎟️
                            </p>

                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                                Secure Tickets
                            </p>
                        </div>


                        <div>
                            <p className="text-2xl md:text-3xl font-bold">
                                🏆
                            </p>

                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                                Live Events
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Home;