import { reserveTicket } from "../services/reserveApi";

function TicketCard({ ticket }) {
    function handleReserve() {
        reserveTicket(ticket.ticket_id)
            .then((response) => {
                console.log(response.data);

                if (response.data.success) {
                    alert("Ticket reserved successfully");
                    window.location.reload();
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Reservation failed");
            });
    }

    const isAvailable = ticket.status === "available";

    return (
        <div
            className="
                group
                relative
                bg-gray-900
                border
                border-white/10
                rounded-3xl
                overflow-hidden
                shadow-xl
                hover:-translate-y-2
                hover:border-yellow-400/40
                hover:shadow-yellow-400/10
                transition-all
                duration-500
            "
        >

            {/* Top glow */}
            <div
                className="
                    absolute
                    -top-24
                    -right-24
                    w-48
                    h-48
                    bg-yellow-400/10
                    rounded-full
                    blur-3xl
                    group-hover:bg-yellow-400/20
                    transition-all
                    duration-500
                "
            />

            {/* Header */}
            <div
                className="
                    relative
                    px-6
                    py-6
                    bg-gradient-to-br
                    from-gray-800
                    via-gray-900
                    to-gray-950
                    border-b
                    border-white/10
                "
            >

                <div className="flex items-center justify-between">

                    <div>

                        <p className="
                            text-yellow-400
                            text-xs
                            font-bold
                            tracking-[0.2em]
                            mb-2
                        ">
                            TICKET
                        </p>

                        <h3 className="
                            text-xl
                            font-extrabold
                            text-white
                        ">
                            Seat {ticket.row_number}
                            {" - "}
                            {ticket.seat_number}
                        </h3>

                    </div>


                    <div
                        className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-yellow-400/10
                            border
                            border-yellow-400/20
                            flex
                            items-center
                            justify-center
                            text-2xl
                            group-hover:rotate-6
                            group-hover:scale-110
                            transition-all
                            duration-300
                        "
                    >
                        🎟️
                    </div>

                </div>

            </div>


            {/* Details */}
            <div className="relative px-6 py-6">

                <div className="space-y-3">

                    {/* Section */}
                    <div
                        className="
                            flex
                            justify-between
                            items-center
                            p-3
                            rounded-xl
                            bg-gray-950/60
                            border
                            border-white/5
                        "
                    >

                        <span className="text-gray-500 text-sm">
                            Section
                        </span>

                        <span className="font-semibold text-gray-200">
                            {ticket.section_name || "N/A"}
                        </span>

                    </div>


                    {/* Seat */}
                    <div
                        className="
                            flex
                            justify-between
                            items-center
                            p-3
                            rounded-xl
                            bg-gray-950/60
                            border
                            border-white/5
                        "
                    >

                        <span className="text-gray-500 text-sm">
                            Seat
                        </span>

                        <span className="font-semibold text-gray-200">
                            {ticket.row_number}
                            {" / "}
                            {ticket.seat_number}
                        </span>

                    </div>


                    {/* Status */}
                    <div
                        className="
                            flex
                            justify-between
                            items-center
                            p-3
                            rounded-xl
                            bg-gray-950/60
                            border
                            border-white/5
                        "
                    >

                        <span className="text-gray-500 text-sm">
                            Status
                        </span>

                        <span
                            className={`
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-bold
                                ${
                                    isAvailable
                                        ? "bg-green-400/10 text-green-400 border border-green-400/20"
                                        : "bg-red-400/10 text-red-400 border border-red-400/20"
                                }
                            `}
                        >

                            <span className="mr-1">
                                {isAvailable ? "●" : "●"}
                            </span>

                            {isAvailable
                                ? "Available"
                                : "Unavailable"}

                        </span>

                    </div>

                </div>


                {/* Price */}
                <div
                    className="
                        mt-6
                        pt-6
                        border-t
                        border-white/10
                        flex
                        items-end
                        justify-between
                    "
                >

                    <div>

                        <p className="text-gray-500 text-sm mb-1">
                            Price
                        </p>

                        <p className="
                            text-3xl
                            font-black
                            text-yellow-400
                            group-hover:scale-105
                            origin-left
                            transition-transform
                            duration-300
                        ">
                            ${ticket.price}
                        </p>

                    </div>

                    <span className="text-gray-500 text-sm mb-1">
                        per ticket
                    </span>

                </div>


                {/* Reserve button */}
                <button
                    onClick={handleReserve}
                    disabled={!isAvailable}
                    className={`
                        relative
                        mt-6
                        w-full
                        py-3.5
                        rounded-xl
                        font-extrabold
                        overflow-hidden
                        transition-all
                        duration-300
                        ${
                            isAvailable
                                ? `
                                    bg-yellow-400
                                    text-gray-950
                                    hover:bg-yellow-300
                                    hover:scale-[1.02]
                                    hover:shadow-lg
                                    hover:shadow-yellow-400/20
                                `
                                : `
                                    bg-gray-800
                                    text-gray-500
                                    border
                                    border-white/5
                                    cursor-not-allowed
                                `
                        }
                    `}
                >

                    <span className="relative z-10">

                        {isAvailable
                            ? "Reserve Ticket →"
                            : "Unavailable"}

                    </span>

                </button>

            </div>

        </div>
    );
}

export default TicketCard;