import { Link } from "react-router-dom";


function MatchCard({
    matchId,
    homeTeam,
    awayTeam,
    stadium,
    date
}) {

    return (

        <div
            className="
                group
                bg-gray-900
                border
                border-white/10
                rounded-3xl
                overflow-hidden
                shadow-xl
                hover:-translate-y-2
                hover:border-yellow-400/30
                transition-all
                duration-300
            "
        >

            {/* Top section */}

            <div
                className="
                    bg-gradient-to-r
                    from-gray-800
                    to-gray-950
                    px-6
                    py-6
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        mb-6
                    "
                >

                    <span
                        className="
                            text-xs
                            font-bold
                            tracking-widest
                            text-yellow-400
                        "
                    >
                        UPCOMING MATCH
                    </span>


                    <span
                        className="
                            text-2xl
                            group-hover:scale-125
                            transition-transform
                            duration-300
                        "
                    >
                        ⚽
                    </span>

                </div>


                {/* Teams */}

                <div
                    className="
                        flex
                        items-center
                        justify-center
                        gap-3
                        text-center
                    "
                >

                    {/* Home team */}

                    <div className="flex-1">

                        <div
                            className="
                                w-14
                                h-14
                                mx-auto
                                mb-3
                                rounded-full
                                bg-gray-950
                                border
                                border-white/10
                                flex
                                items-center
                                justify-center
                                text-2xl
                                group-hover:scale-110
                                transition-transform
                                duration-300
                            "
                        >
                            🏠
                        </div>


                        <h2
                            className="
                                font-extrabold
                                text-lg
                                break-words
                            "
                        >
                            {homeTeam}
                        </h2>

                    </div>


                    {/* VS */}

                    <div
                        className="
                            px-2
                            text-yellow-400
                            font-black
                            text-lg
                        "
                    >
                        VS
                    </div>


                    {/* Away team */}

                    <div className="flex-1">

                        <div
                            className="
                                w-14
                                h-14
                                mx-auto
                                mb-3
                                rounded-full
                                bg-gray-950
                                border
                                border-white/10
                                flex
                                items-center
                                justify-center
                                text-2xl
                                group-hover:scale-110
                                transition-transform
                                duration-300
                            "
                        >
                            🏆
                        </div>


                        <h2
                            className="
                                font-extrabold
                                text-lg
                                break-words
                            "
                        >
                            {awayTeam}
                        </h2>

                    </div>

                </div>

            </div>


            {/* Match information */}

            <div className="px-6 py-6">

                <div className="space-y-4">


                    {/* Stadium */}

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            text-gray-300
                        "
                    >

                        <span
                            className="
                                w-10
                                h-10
                                rounded-xl
                                bg-yellow-400/10
                                border
                                border-yellow-400/20
                                flex
                                items-center
                                justify-center
                                text-lg
                            "
                        >
                            🏟️
                        </span>


                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                                mb-1
                            ">
                                Stadium
                            </p>

                            <p className="
                                text-sm
                                font-semibold
                            ">
                                {stadium || "N/A"}
                            </p>

                        </div>

                    </div>


                    {/* Date */}

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            text-gray-300
                        "
                    >

                        <span
                            className="
                                w-10
                                h-10
                                rounded-xl
                                bg-yellow-400/10
                                border
                                border-yellow-400/20
                                flex
                                items-center
                                justify-center
                                text-lg
                            "
                        >
                            📅
                        </span>


                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                                mb-1
                            ">
                                Date
                            </p>

                            <p className="
                                text-sm
                                font-semibold
                            ">
                                {
                                    date
                                        ? new Date(
                                            date
                                        ).toLocaleDateString()
                                        : "N/A"
                                }
                            </p>

                        </div>

                    </div>


                    {/* Time */}

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            text-gray-300
                        "
                    >

                        <span
                            className="
                                w-10
                                h-10
                                rounded-xl
                                bg-yellow-400/10
                                border
                                border-yellow-400/20
                                flex
                                items-center
                                justify-center
                                text-lg
                            "
                        >
                            🕐
                        </span>


                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                                mb-1
                            ">
                                Time
                            </p>

                            <p className="
                                text-sm
                                font-semibold
                            ">
                                {
                                    date
                                        ? new Date(
                                            date
                                        ).toLocaleTimeString(
                                            [],
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            }
                                        )
                                        : "N/A"
                                }
                            </p>

                        </div>

                    </div>

                </div>


                {/* Button */}

                <Link
                    to={`/matches/${matchId}`}
                    className="
                        mt-7
                        block
                        text-center
                        bg-yellow-400
                        text-gray-950
                        font-extrabold
                        py-3
                        rounded-xl
                        hover:bg-yellow-300
                        hover:scale-[1.02]
                        transition-all
                        duration-200
                        shadow-lg
                        shadow-yellow-400/10
                    "
                >
                    View Tickets
                    <span className="
                        inline-block
                        ml-2
                        group-hover:translate-x-1
                        transition-transform
                    ">
                        →
                    </span>
                </Link>

            </div>

        </div>

    );

}


export default MatchCard;