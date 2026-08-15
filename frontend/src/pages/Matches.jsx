import { useEffect, useState } from "react";
import { getMatches } from "../services/matchApi";
import MatchCard from "../components/MatchCard";

function Matches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMatches()
            .then((response) => {
                console.log(response.data);
                setMatches(response.data.items);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">

                    <div className="relative w-16 h-16 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>

                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 animate-spin"></div>

                        <div className="absolute inset-3 rounded-full bg-yellow-400/10 flex items-center justify-center">
                            ⚽
                        </div>
                    </div>

                    <p className="text-gray-300 text-lg animate-pulse">
                        Loading matches...
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-950 text-white px-6 py-12 overflow-hidden">

            {/* Background effects */}
            <div className="absolute top-20 -left-40 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>


            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-12">

                    <p className="text-yellow-400 font-bold tracking-[0.25em] text-sm mb-3">
                        ⚡ LIVE THE GAME
                    </p>

                    <h1 className="text-4xl md:text-6xl font-black mb-5">
                        Available
                        <span className="text-yellow-400">
                            {" "}Matches
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg max-w-2xl">
                        Find your next match, choose your seat,
                        and experience the game live.
                    </p>

                </div>


                {/* Match count */}
                <div className="flex items-center justify-between mb-7">

                    <div className="flex items-center gap-3">

                        <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>

                        <p className="text-gray-400">
                            {matches.length} match
                            {matches.length !== 1 ? "es" : ""} available
                        </p>

                    </div>

                </div>


                {/* Matches */}
                {matches.length > 0 ? (

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

                        {matches.map((match, index) => (

                            <div
                                key={match.match_id}
                                className="
                                    animate-[fadeIn_0.6s_ease-out]
                                    hover:-translate-y-2
                                    transition-transform
                                    duration-300
                                "
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >

                                <MatchCard
                                    matchId={match.match_id}
                                    homeTeam={match.home_team}
                                    awayTeam={match.away_team}
                                    stadium={match.stadium}
                                    date={match.start_time}
                                />

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="
                        bg-gray-900
                        border border-white/10
                        rounded-3xl
                        p-16
                        text-center
                        shadow-2xl
                    ">

                        <div className="text-6xl mb-6 animate-bounce">
                            🏟️
                        </div>

                        <h2 className="text-2xl font-bold mb-3">
                            No matches available
                        </h2>

                        <p className="text-gray-400">
                            There are currently no available matches.
                        </p>

                    </div>

                )}

            </div>
        </div>
    );
}

export default Matches;