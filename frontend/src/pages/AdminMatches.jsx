import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMatches } from "../services/matchApi";


function AdminMatches() {

    const [matches, setMatches] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        getMatches()

            .then((response) => {

                console.log(
                    "MATCHES:",
                    response.data
                );

                setMatches(
                    response.data.items || []
                );

            })

            .catch((error) => {

                console.log(
                    "MATCHES ERROR:",
                    error.response?.data
                );

            })

            .finally(() => {

                setLoading(false);

            });

    }, []);


    if (loading) {

        return (

            <div className="
                min-h-screen
                bg-gray-950
                text-white
                flex
                items-center
                justify-center
            ">

                <div className="text-center">

                    <div className="
                        w-14
                        h-14
                        border-4
                        border-gray-700
                        border-t-yellow-400
                        rounded-full
                        animate-spin
                        mx-auto
                        mb-5
                    " />

                    <p className="
                        text-gray-400
                        text-lg
                    ">
                        Loading matches...
                    </p>

                </div>

            </div>

        );

    }


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
            " />


            <div className="
                relative
                z-10
                max-w-6xl
                mx-auto
                animate-[fadeIn_0.7s_ease-out]
            ">


                {/* Header */}

                <div className="
                    mb-10
                    flex
                    flex-col
                    md:flex-row
                    md:items-end
                    md:justify-between
                    gap-5
                ">

                    <div>

                        <p className="
                            text-yellow-400
                            text-sm
                            font-bold
                            tracking-[0.25em]
                            mb-3
                        ">
                            ADMIN PANEL
                        </p>


                        <h1 className="
                            text-4xl
                            md:text-5xl
                            font-black
                        ">
                            Matches Management
                        </h1>


                        <p className="
                            text-gray-400
                            mt-3
                            text-lg
                        ">
                            Create, view and update sports matches.
                        </p>

                    </div>


                    <Link
                        to="/admin/matches/create"
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
                            transition-all
                            duration-300
                            w-fit
                        "
                    >

                        <span className="
                            text-xl
                            group-hover:rotate-90
                            transition-transform
                            duration-300
                        ">
                            +
                        </span>

                        Create New Match

                    </Link>

                </div>


                {/* Match count */}

                <div className="
                    mb-6
                    px-4
                    py-2
                    rounded-full
                    bg-gray-900
                    border
                    border-white/10
                    text-gray-400
                    text-sm
                    font-semibold
                    w-fit
                ">
                    🏟️ {matches.length} match
                    {matches.length !== 1 ? "es" : ""}
                </div>


                {/* Matches */}

                {
                    matches.length > 0 ? (

                        <div className="
                            grid
                            lg:grid-cols-2
                            gap-6
                        ">

                            {
                                matches.map((match) => (

                                    <div
                                        key={match.match_id}
                                        className="
                                            group
                                            bg-gray-900
                                            border
                                            border-white/10
                                            rounded-3xl
                                            overflow-hidden
                                            shadow-xl
                                            hover:-translate-y-1
                                            hover:border-yellow-400/30
                                            transition-all
                                            duration-300
                                        "
                                    >


                                        {/* Match header */}

                                        <div className="
                                            bg-gradient-to-r
                                            from-gray-800
                                            to-gray-950
                                            px-6
                                            py-6
                                            border-b
                                            border-white/10
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                justify-between
                                                gap-4
                                                mb-5
                                            ">

                                                <span className="
                                                    text-yellow-400
                                                    text-xs
                                                    font-bold
                                                    tracking-widest
                                                ">
                                                    MATCH #{match.match_id}
                                                </span>


                                                <span className="
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    bg-green-400/10
                                                    border
                                                    border-green-400/20
                                                    text-green-400
                                                    text-xs
                                                    font-bold
                                                ">
                                                    {match.status}
                                                </span>

                                            </div>


                                            <div className="
                                                flex
                                                items-center
                                                justify-center
                                                gap-4
                                                text-center
                                            ">

                                                <div className="
                                                    flex-1
                                                ">

                                                    <div className="
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
                                                    ">
                                                        🏠
                                                    </div>


                                                    <h2 className="
                                                        font-extrabold
                                                        text-lg
                                                        break-words
                                                    ">
                                                        {match.home_team}
                                                    </h2>

                                                </div>


                                                <span className="
                                                    text-yellow-400
                                                    font-black
                                                    text-lg
                                                ">
                                                    VS
                                                </span>


                                                <div className="
                                                    flex-1
                                                ">

                                                    <div className="
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
                                                    ">
                                                        🏆
                                                    </div>


                                                    <h2 className="
                                                        font-extrabold
                                                        text-lg
                                                        break-words
                                                    ">
                                                        {match.away_team}
                                                    </h2>

                                                </div>

                                            </div>

                                        </div>


                                        {/* Match details */}

                                        <div className="p-6">


                                            <div className="
                                                grid
                                                sm:grid-cols-2
                                                gap-4
                                            ">


                                                <div className="
                                                    bg-gray-950
                                                    rounded-2xl
                                                    p-4
                                                    border
                                                    border-white/5
                                                ">

                                                    <p className="
                                                        text-gray-500
                                                        text-xs
                                                        mb-2
                                                    ">
                                                        Sport
                                                    </p>

                                                    <p className="
                                                        font-semibold
                                                    ">
                                                        ⚽ {match.sport_type}
                                                    </p>

                                                </div>


                                                <div className="
                                                    bg-gray-950
                                                    rounded-2xl
                                                    p-4
                                                    border
                                                    border-white/5
                                                ">

                                                    <p className="
                                                        text-gray-500
                                                        text-xs
                                                        mb-2
                                                    ">
                                                        Stadium
                                                    </p>

                                                    <p className="
                                                        font-semibold
                                                    ">
                                                        🏟️ {match.stadium}
                                                    </p>

                                                </div>


                                                <div className="
                                                    bg-gray-950
                                                    rounded-2xl
                                                    p-4
                                                    border
                                                    border-white/5
                                                    sm:col-span-2
                                                ">

                                                    <p className="
                                                        text-gray-500
                                                        text-xs
                                                        mb-2
                                                    ">
                                                        Date & Time
                                                    </p>

                                                    <p className="
                                                        font-semibold
                                                        text-gray-300
                                                    ">
                                                        📅{" "}
                                                        {
                                                            match.start_time
                                                                ? new Date(
                                                                    match.start_time
                                                                ).toLocaleString()
                                                                : "—"
                                                        }
                                                    </p>

                                                </div>

                                            </div>


                                            {/* Description */}

                                            {
                                                match.desc && (

                                                    <div className="
                                                        mt-5
                                                        bg-gray-950
                                                        rounded-2xl
                                                        p-4
                                                        border
                                                        border-white/5
                                                    ">

                                                        <p className="
                                                            text-gray-500
                                                            text-xs
                                                            mb-2
                                                        ">
                                                            Description
                                                        </p>


                                                        <p className="
                                                            text-gray-300
                                                            text-sm
                                                            leading-6
                                                        ">
                                                            {match.desc}
                                                        </p>

                                                    </div>

                                                )
                                            }


                                            {/* Actions */}

                                            <div className="
                                                flex
                                                flex-col
                                                sm:flex-row
                                                gap-3
                                                mt-6
                                                pt-5
                                                border-t
                                                border-white/10
                                            ">


                                                <Link
                                                    to={`/admin/matches/${match.match_id}/edit`}
                                                    className="
                                                        flex-1
                                                        text-center
                                                        bg-blue-500/10
                                                        border
                                                        border-blue-400/20
                                                        text-blue-300
                                                        font-bold
                                                        py-3
                                                        rounded-xl
                                                        hover:bg-blue-500/20
                                                        hover:border-blue-400/40
                                                        transition-all
                                                        duration-200
                                                    "
                                                >
                                                    ✏️ Edit Match
                                                </Link>


                                                <button
                                                    type="button"
                                                    className="
                                                        flex-1
                                                        text-center
                                                        bg-green-500/10
                                                        border
                                                        border-green-400/20
                                                        text-green-300
                                                        font-bold
                                                        py-3
                                                        rounded-xl
                                                        hover:bg-green-500/20
                                                        hover:border-green-400/40
                                                        transition-all
                                                        duration-200
                                                    "
                                                >
                                                    🎟️ Create Ticket
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    ) : (

                        <div className="
                            bg-gray-900
                            border
                            border-white/10
                            rounded-3xl
                            p-16
                            text-center
                            shadow-2xl
                        ">

                            <div className="
                                w-24
                                h-24
                                mx-auto
                                mb-6
                                rounded-3xl
                                bg-yellow-400/10
                                border
                                border-yellow-400/20
                                flex
                                items-center
                                justify-center
                                text-5xl
                            ">
                                🏟️
                            </div>


                            <h2 className="
                                text-2xl
                                md:text-3xl
                                font-black
                                mb-3
                            ">
                                No matches found
                            </h2>


                            <p className="
                                text-gray-500
                                max-w-md
                                mx-auto
                                mb-7
                            ">
                                There are currently no matches in the system.
                            </p>


                            <Link
                                to="/admin/matches/create"
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-yellow-400
                                    text-gray-950
                                    font-bold
                                    hover:bg-yellow-300
                                    transition
                                "
                            >
                                + Create First Match
                            </Link>

                        </div>

                    )}

            </div>

        </div>

    );
}


export default AdminMatches;