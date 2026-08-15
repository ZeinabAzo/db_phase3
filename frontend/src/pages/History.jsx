import { useEffect, useState } from "react";

import { getReservationHistory } from "../services/reserveApi";


function History() {

    const [reservations, setReservations]=useState([]);

    const [loading, setLoading]=useState(true);


    useEffect(()=>{

        getReservationHistory()

            .then((response)=>{

                console.log(
                    "HISTORY:",response.data);

                setReservations(response.data.data || []);

            })

            .catch((error)=>{

                console.log(
                    "HISTORY ERROR:",error.response?.data
                );

            })

            .finally(()=>{setLoading(false);});

    }, []);


    if(loading){

        return(

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
                        Loading history...
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

            {/* code Background glow */}

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
                bg-blue-500/10
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


                {/*ghesmat Header */}

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
                            YOUR ACTIVITY
                        </p>


                        <h1 className="
                            text-4xl
                            md:text-5xl
                            font-black
                        ">
                            Reservation History
                        </h1>


                        <p className="
                            text-gray-400
                            mt-3
                            text-lg
                        ">
                            View your previous reservations and ticket activity.
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
                        📋 {reservations.length} record
                        {reservations.length  !== 1 ? "s" : ""}
                    </div>

                </div>


                {/*baraye History */}

                {
                    reservations.length >0 ?(

                        <div className="
                            space-y-5
                        ">

                            {
                                reservations.map((reserve)=>(

                                    <div
                                        key={reserve.reserve_id}
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

                                        {/*ghesmat Header */}

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
                                                        RESERVATION
                                                    </p>


                                                    <h2 className="
                                                        text-xl
                                                        md:text-2xl
                                                        font-extrabold
                                                        mt-1
                                                    ">
                                                        {reserve.home_team}

                                                        <span className="
                                                            text-yellow-400
                                                            mx-2
                                                        ">
                                                            VS
                                                        </span>

                                                        {reserve.away_team}
                                                    </h2>

                                                </div>

                                            </div>


                                            <span className="
                                                px-4
                                                py-2
                                                rounded-full
                                                bg-gray-950
                                                border
                                                border-white/10
                                                text-gray-300
                                                text-sm
                                                font-semibold
                                                w-fit
                                            ">
                                                {reserve.status}
                                            </span>

                                        </div>


                                        {/*bara Detals */}

                                        <div className="p-6 md:p-8">

                                            <div className="
                                                grid
                                                sm:grid-cols-2
                                                lg:grid-cols-4
                                                gap-4
                                            ">


                                                {/* Ticket ID ?? ino bedim ya nadim*/}

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
                                                        #{reserve.ticket_id}
                                                    </p>

                                                </div>


                                                {/* Price */}

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
                                                        ${reserve.total_price}
                                                    </p>

                                                </div>


                                                {/* Reservation ID ??? inam bedim ya na?*/}

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
                                                        Reservation ID
                                                    </p>


                                                    <p className="
                                                        font-bold
                                                        text-lg
                                                    ">
                                                        #{reserve.reserve_id}
                                                    </p>

                                                </div>


                                                {/* Status */}

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
                                                        Status
                                                    </p>


                                                    <p className="
                                                        font-bold
                                                        text-lg
                                                    ">
                                                        {reserve.status}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* Match date ok.*/}

                                            <div className="
                                                mt-6
                                                pt-6
                                                border-t
                                                border-white/10
                                                flex
                                                flex-col
                                                sm:flex-row
                                                sm:items-center
                                                sm:justify-between
                                                gap-4
                                            ">

                                                <div>

                                                    <p className="
                                                        text-gray-500
                                                        text-sm
                                                    ">
                                                        Match Date
                                                    </p>


                                                    <p className="
                                                        text-gray-300
                                                        font-semibold
                                                        mt-1
                                                    ">
                                                        {
                                                            reserve.start_time
                                                                ? new Date(
                                                                    reserve.start_time
                                                                ).toLocaleString()
                                                                : "—"
                                                        }
                                                    </p>

                                                </div>


                                                <div className="
                                                    text-gray-600
                                                    text-sm
                                                ">
                                                    TicketHub
                                                </div>

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
                                📋
                            </div>


                            <h2 className="
                                text-2xl
                                md:text-3xl
                                font-black
                                mb-3
                            ">
                                No reservation history
                            </h2>


                            <p className="
                                text-gray-500
                                max-w-md
                                mx-auto
                            ">
                                Your previous reservations will appear here.
                            </p>

                        </div>

                    )}

            </div>

        </div>

    );
}


export default History;