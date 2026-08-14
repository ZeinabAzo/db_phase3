import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMatchById } from "../services/matchApi";
import { getTicketsByMatch } from "../services/ticketApi";

import TicketCard from "../components/TicketCard";

function MatchDetails() {
    const { match_id } = useParams();

    const [match, setMatch] = useState(null);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getMatchById(match_id)
            .then((response) => {
                setMatch(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getTicketsByMatch(match_id)
            .then((response) => {
                console.log(response.data);
                setTickets(response.data.tickets);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [match_id]);

    if (!match) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">

                    <div className="relative w-16 h-16 mx-auto mb-6">

                        <div className="absolute inset-0 rounded-full border-4 border-gray-800" />

                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 animate-spin" />

                        <div className="absolute inset-3 rounded-full bg-yellow-400/10 flex items-center justify-center">
                            ⚽
                        </div>

                    </div>

                    <p className="text-gray-300 text-lg animate-pulse">
                        Loading match...
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-950 text-white px-6 py-12 overflow-hidden">

            {/* Background glow */}
            <div className="absolute top-20 -left-40 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />

            <div className="absolute bottom-20 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />


            <div className="relative z-10 max-w-5xl mx-auto">

                {/* Match Header */}
                <div
                    className="
                        relative
                        bg-gradient-to-br
                        from-gray-900
                        via-gray-900
                        to-gray-800
                        border
                        border-white/10
                        rounded-3xl
                        overflow-hidden
                        shadow-2xl
                        animate-[fadeIn_0.7s_ease-out]
                    "
                >

                    {/* Decorative glow */}
                    <div className="
                        absolute
                        -top-32
                        left-1/2
                        -translate-x-1/2
                        w-96
                        h-96
                        bg-yellow-400/10
                        rounded-full
                        blur-3xl
                    " />

                    <div className="relative px-6 md:px-10 py-10">

                        {/* Title */}
                        <div className="text-center mb-10">

                            <span className="
                                inline-flex
                                items-center
                                gap-2
                                text-yellow-400
                                text-sm
                                font-bold
                                tracking-widest
                                mb-5
                                px-4
                                py-2
                                rounded-full
                                bg-yellow-400/10
                                border
                                border-yellow-400/20
                            ">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                MATCH DETAILS
                            </span>

                            <h1 className="
                                text-3xl
                                md:text-5xl
                                font-black
                                leading-tight
                            ">
                                {match.home_team}

                                <span className="
                                    text-yellow-400
                                    mx-3
                                ">
                                    VS
                                </span>

                                {match.away_team}
                            </h1>

                        </div>


                        {/* Match Info */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

                            {/* Sport */}
                            <div className="
                                group
                                bg-gray-950/70
                                rounded-2xl
                                p-5
                                border
                                border-white/5
                                hover:border-yellow-400/30
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            ">

                                <p className="text-gray-500 text-sm mb-2">
                                    Sport
                                </p>

                                <p className="font-semibold text-gray-200">
                                    ⚽ {match.sport_type}
                                </p>

                            </div>


                            {/* Stadium */}
                            <div className="
                                group
                                bg-gray-950/70
                                rounded-2xl
                                p-5
                                border
                                border-white/5
                                hover:border-yellow-400/30
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            ">

                                <p className="text-gray-500 text-sm mb-2">
                                    Stadium
                                </p>

                                <p className="font-semibold text-gray-200">
                                    🏟️ {match.stadium}
                                </p>

                            </div>


                            {/* Date */}
                            <div className="
                                group
                                bg-gray-950/70
                                rounded-2xl
                                p-5
                                border
                                border-white/5
                                hover:border-yellow-400/30
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            ">

                                <p className="text-gray-500 text-sm mb-2">
                                    Date
                                </p>

                                <p className="font-semibold text-gray-200">
                                    📅{" "}
                                    {new Date(
                                        match.start_time
                                    ).toLocaleDateString()}
                                </p>

                            </div>


                            {/* Time */}
                            <div className="
                                group
                                bg-gray-950/70
                                rounded-2xl
                                p-5
                                border
                                border-white/5
                                hover:border-yellow-400/30
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            ">

                                <p className="text-gray-500 text-sm mb-2">
                                    Kick-off
                                </p>

                                <p className="font-semibold text-gray-200">
                                    🕐{" "}
                                    {new Date(
                                        match.start_time
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </p>

                            </div>

                        </div>


                        {/* Status */}
                        <div className="mt-7 flex justify-center">

                            <span className="
                                inline-flex
                                items-center
                                gap-2
                                px-5
                                py-2
                                rounded-full
                                bg-green-400/10
                                border
                                border-green-400/30
                                text-green-400
                                text-sm
                                font-semibold
                            ">

                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                                {match.status}

                            </span>

                        </div>


                        {/* Description */}
                        {match.desc && (
                            <div className="mt-8 pt-7 border-t border-white/10">

                                <h2 className="font-bold text-lg mb-3">
                                    About this match
                                </h2>

                                <p className="text-gray-400 leading-7">
                                    {match.desc}
                                </p>

                            </div>
                        )}

                    </div>
                </div>


                {/* Tickets */}
                <div className="mt-14">

                    <div className="flex items-end justify-between mb-7">

                        <div>

                            <p className="text-yellow-400 text-sm font-bold tracking-widest mb-2">
                                🎟️ GET YOUR SEAT
                            </p>

                            <h2 className="text-3xl md:text-4xl font-extrabold">
                                Available Tickets
                            </h2>

                        </div>

                        <span className="hidden sm:block text-gray-400">
                            {tickets.length} ticket
                            {tickets.length !== 1 ? "s" : ""}
                        </span>

                    </div>


                    {tickets.length > 0 ? (

                        <div className="grid md:grid-cols-2 gap-6">

                            {tickets.map((ticket, index) => (

                                <div
                                    key={ticket.ticket_id}
                                    className="
                                        animate-[fadeIn_0.6s_ease-out]
                                        hover:-translate-y-1
                                        transition-transform
                                        duration-300
                                    "
                                    style={{
                                        animationDelay: `${index * 100}ms`
                                    }}
                                >

                                    <TicketCard
                                        ticket={ticket}
                                    />

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="
                            bg-gray-900
                            border
                            border-white/10
                            rounded-3xl
                            p-14
                            text-center
                        ">

                            <div className="text-6xl mb-6 animate-bounce">
                                🎟️
                            </div>

                            <h3 className="text-2xl font-bold mb-3">
                                No tickets available
                            </h3>

                            <p className="text-gray-400">
                                There are currently no available
                                tickets for this match.
                            </p>

                        </div>

                    )}

                </div>

            </div>
        </div>
    );
}

export default MatchDetails;