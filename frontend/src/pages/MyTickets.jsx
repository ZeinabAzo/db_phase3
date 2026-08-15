import { useEffect, useState } from "react";

import {
    getPurchasedTickets,
    cancelTicket,
    getCancellationPenalty
} from "../services/reserveApi";


function MyTickets() {

    const [tickets, setTickets] = useState([]);

    const [loading, setLoading] = useState(true);

    const [cancellingId, setCancellingId] = useState(null);


    function loadTickets() {

        setLoading(true);

        getPurchasedTickets()

            .then((response) => {

                console.log(
                    "MY TICKETS:",
                    response.data
                );

                setTickets(
                    response.data.data || []
                );

            })

            .catch((error) => {

                console.log(
                    "TICKETS ERROR:",
                    error.response?.data
                );

            })

            .finally(() => {

                setLoading(false);

            });

    }


    useEffect(() => {

        loadTickets();

    }, []);


    function handleCancel(reserve_id) {

        setCancellingId(reserve_id);


        getCancellationPenalty(reserve_id)

            .then((response) => {

                console.log(
                    "PENALTY:",
                    response.data
                );


                const data =
                    response.data.data;


                const confirmCancel =
                    window.confirm(

                        `Cancellation details:

Total price: ${data.total_price}

Penalty:
${data.penalty_percentage}%

Penalty amount:
${data.penalty_amount}

Refund amount:
${data.refund_amount}

Do you want to continue?`

                    );


                if (!confirmCancel) {

                    setCancellingId(null);

                    return null;

                }


                return cancelTicket(
                    reserve_id
                );

            })

            .then((response) => {

                if (!response) {

                    return null;

                }


                console.log(
                    "CANCEL:",
                    response.data
                );


                alert(
                    response.data.message ||
                    "Ticket cancelled successfully"
                );


                return getPurchasedTickets();

            })

            .then((response) => {

                if (response) {

                    setTickets(
                        response.data.data || []
                    );

                }

            })

            .catch((error) => {

                console.log(
                    "CANCEL ERROR:",
                    error.response?.data
                );


                alert(

                    error.response?.data?.detail ||

                    error.response?.data?.message ||

                    "Cancel failed"

                );

            })

            .finally(() => {

                setCancellingId(null);

            });

    }


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
                        Loading your tickets...
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
            " />

            <div className="
                absolute
                -bottom-40
                -left-40
                w-96
                h-96
                bg-red-500/10
                rounded-full
                blur-3xl
            " />


            <div className="
                relative
                z-10
                max-w-5xl
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
                            MY PURCHASES
                        </p>


                        <h1 className="
                            text-4xl
                            md:text-5xl
                            font-black
                        ">
                            My Tickets
                        </h1>


                        <p className="
                            text-gray-400
                            mt-3
                            text-lg
                        ">
                            Manage your purchased tickets and reservations.
                        </p>

                    </div>


                    <div className="
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
                        🎟️ {tickets.length} ticket
                        {tickets.length !== 1 ? "s" : ""}
                    </div>

                </div>


                {/* Tickets */}

                {
                    tickets.length > 0 ? (

                        <div className="
                            space-y-6
                        ">

                            {
                                tickets.map((ticket) => (

                                    <div
                                        key={ticket.ticket_id}
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

                                        {/* Header */}

                                        <div className="
                                            bg-gradient-to-r
                                            from-gray-800
                                            to-gray-950
                                            px-6
                                            md:px-8
                                            py-6
                                            border-b
                                            border-white/10
                                            flex
                                            flex-col
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-between
                                            gap-4
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
                                                    🎟️
                                                </div>


                                                <div>

                                                    <p className="
                                                        text-gray-500
                                                        text-xs
                                                        font-semibold
                                                        tracking-widest
                                                    ">
                                                        MATCH
                                                    </p>


                                                    <h2 className="
                                                        text-xl
                                                        md:text-2xl
                                                        font-extrabold
                                                        mt-1
                                                    ">
                                                        {ticket.home_team}

                                                        <span className="
                                                            text-yellow-400
                                                            mx-2
                                                        ">
                                                            VS
                                                        </span>

                                                        {ticket.away_team}
                                                    </h2>

                                                </div>

                                            </div>


                                            <span className="
                                                px-4
                                                py-2
                                                rounded-full
                                                bg-green-400/10
                                                border
                                                border-green-400/20
                                                text-green-400
                                                text-sm
                                                font-semibold
                                                w-fit
                                            ">
                                                Purchased
                                            </span>

                                        </div>


                                        {/* Details */}

                                        <div className="p-6 md:p-8">


                                            <div className="
                                                grid
                                                sm:grid-cols-2
                                                lg:grid-cols-4
                                                gap-4
                                            ">


                                                <div className="
                                                    bg-gray-950
                                                    rounded-2xl
                                                    p-5
                                                    border
                                                    border-white/5
                                                ">

                                                    <p className="
                                                        text-gray-500
                                                        text-sm
                                                        mb-2
                                                    ">
                                                        Ticket ID
                                                    </p>


                                                    <p className="
                                                        font-bold
                                                        text-lg
                                                    ">
                                                        #{ticket.ticket_id}
                                                    </p>

                                                </div>


                                                <div className="
                                                    bg-gray-950
                                                    rounded-2xl
                                                    p-5
                                                    border
                                                    border-white/5
                                                ">

                                                    <p className="
                                                        text-gray-500
                                                        text-sm
                                                        mb-2
                                                    ">
                                                        Price
                                                    </p>


                                                    <p className="
                                                        font-bold
                                                        text-lg
                                                        text-yellow-400
                                                    ">
                                                        ${ticket.total_price}
                                                    </p>

                                                </div>


                                                <div className="
                                                    bg-gray-950
                                                    rounded-2xl
                                                    p-5
                                                    border
                                                    border-white/5
                                                ">

                                                    <p className="
                                                        text-gray-500
                                                        text-sm
                                                        mb-2
                                                    ">
                                                        Reservation
                                                    </p>


                                                    <p className="
                                                        font-bold
                                                        text-lg
                                                    ">
                                                        #{ticket.reserve_id}
                                                    </p>

                                                </div>


                                                <div className="
                                                    bg-gray-950
                                                    rounded-2xl
                                                    p-5
                                                    border
                                                    border-white/5
                                                ">

                                                    <p className="
                                                        text-gray-500
                                                        text-sm
                                                        mb-2
                                                    ">
                                                        Match Date
                                                    </p>


                                                    <p className="
                                                        font-bold
                                                        text-sm
                                                        text-gray-300
                                                    ">
                                                        {
                                                            ticket.start_time
                                                                ? new Date(
                                                                    ticket.start_time
                                                                ).toLocaleString()
                                                                : "—"
                                                        }
                                                    </p>

                                                </div>

                                            </div>


                                            {/* Cancel */}

                                            <div className="
                                                mt-7
                                                pt-6
                                                border-t
                                                border-white/10
                                                flex
                                                flex-col
                                                sm:flex-row
                                                sm:items-center
                                                sm:justify-between
                                                gap-5
                                            ">

                                                <div>

                                                    <p className="
                                                        text-gray-500
                                                        text-sm
                                                    ">
                                                        Need to cancel?
                                                    </p>


                                                    <p className="
                                                        text-gray-400
                                                        text-sm
                                                        mt-1
                                                    ">
                                                        The cancellation penalty will be calculated before confirmation.
                                                    </p>

                                                </div>


                                                <button
                                                    onClick={() =>
                                                        handleCancel(
                                                            ticket.reserve_id
                                                        )
                                                    }
                                                    disabled={
                                                        cancellingId ===
                                                        ticket.reserve_id
                                                    }
                                                    className={`
                                                        px-7
                                                        py-3
                                                        rounded-xl
                                                        font-bold
                                                        transition-all
                                                        duration-300
                                                        ${
                                                            cancellingId ===
                                                            ticket.reserve_id
                                                                ? `
                                                                    bg-gray-800
                                                                    text-gray-600
                                                                    cursor-wait
                                                                `
                                                                : `
                                                                    border
                                                                    border-red-400/30
                                                                    bg-red-500/10
                                                                    text-red-300
                                                                    hover:bg-red-500/20
                                                                    hover:text-red-200
                                                                    hover:border-red-400/50
                                                                `
                                                        }
                                                    `}
                                                >

                                                    {
                                                        cancellingId ===
                                                        ticket.reserve_id
                                                            ? "Cancelling..."
                                                            : "Cancel Ticket"
                                                    }

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
                                animate-pulse
                            ">
                                🎟️
                            </div>


                            <h2 className="
                                text-2xl
                                md:text-3xl
                                font-black
                                mb-3
                            ">
                                No purchased tickets
                            </h2>


                            <p className="
                                text-gray-500
                                max-w-md
                                mx-auto
                            ">
                                Your purchased tickets will appear here.
                            </p>

                        </div>

                    )}

            </div>

        </div>

    );
}


export default MyTickets;