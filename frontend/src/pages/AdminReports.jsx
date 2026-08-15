import { useEffect, useState } from "react";

import {
    getTicketReports,
    getReserveReports
} from "../services/adminApi";


function AdminReports() {

    const [ticketReports,setTicketReports]=useState([]);

    const [reserveReports,setReserveReports]=useState([]);

    const [loading, setLoading]=useState(true);


    useEffect(()=>{

        Promise.all([

            getTicketReports(),getReserveReports()

        ])

            .then(([ticketResponse, reserveResponse])=>{

                console.log(
                    "TICKET REPORTS:",
                    ticketResponse.data
                );

                console.log(
                    "RESERVE REPORTS:",
                    reserveResponse.data
                );


                setTicketReports(
                    ticketResponse.data.reports || []
                );


                setReserveReports(
                    reserveResponse.data.reports || []
                );

            })

            .catch((error)=>{

                console.log(
                    "REPORT ERROR:",
                    error.response?.data
                );

            })

            .finally(()=>{

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

                    <p className="text-gray-400">
                        Loading reports...
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



                <div className="mb-10">

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
                        Reports
                    </h1>


                    <p className="
                        text-gray-400
                        mt-3
                        text-lg
                    ">
                        Review ticket and reservation reports.
                    </p>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-5
                    mb-10
                ">


                    <div className="
                        bg-gray-900
                        border
                        border-white/10
                        rounded-2xl
                        p-6
                        shadow-lg
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-gray-500
                                    text-sm
                                ">
                                    Ticket Reports
                                </p>


                                <p className="
                                    text-4xl
                                    font-black
                                    mt-2
                                ">
                                    {ticketReports.length}
                                </p>

                            </div>


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

                        </div>

                    </div>


                    <div className="
                        bg-gray-900
                        border
                        border-white/10
                        rounded-2xl
                        p-6
                        shadow-lg
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-gray-500
                                    text-sm
                                ">
                                    Reservation Reports
                                </p>


                                <p className="
                                    text-4xl
                                    font-black
                                    mt-2
                                ">
                                    {reserveReports.length}
                                </p>

                            </div>


                            <div className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-blue-400/10
                                border
                                border-blue-400/20
                                flex
                                items-center
                                justify-center
                                text-2xl
                            ">
                                📋
                            </div>

                        </div>

                    </div>

                </div>



                <section className="mb-10">

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-6
                    ">

                        <div>

                            <p className="
                                text-yellow-400
                                text-sm
                                font-bold
                                tracking-widest
                                mb-2
                            ">
                                TICKET REPORTS
                            </p>


                            <h2 className="
                                text-2xl
                                md:text-3xl
                                font-extrabold
                            ">
                                Ticket Issues
                            </h2>

                        </div>


                        <span className="
                            hidden
                            sm:block
                            px-3
                            py-1
                            rounded-full
                            bg-gray-900
                            border
                            border-white/10
                            text-gray-400
                            text-sm
                        ">
                            {ticketReports.length} reports
                        </span>

                    </div>


                    {ticketReports.length > 0 ? (

                        <div className="
                            grid
                            md:grid-cols-2
                            gap-6
                        ">

                            {
                                ticketReports.map((report) => (

                                    <div
                                        key={report.report_id}
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


                                        <div className="
                                            bg-gradient-to-r
                                            from-gray-800
                                            to-gray-950
                                            px-6
                                            py-5
                                            flex
                                            items-center
                                            justify-between
                                            border-b
                                            border-white/10
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-4
                                            ">

                                                <div className="
                                                    w-11
                                                    h-11
                                                    rounded-xl
                                                    bg-yellow-400/10
                                                    border
                                                    border-yellow-400/20
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-xl
                                                ">
                                                    🎟️
                                                </div>


                                                <div>

                                                    <p className="
                                                        text-gray-500
                                                        text-xs
                                                    ">
                                                        REPORT
                                                    </p>


                                                    <h3 className="
                                                        font-bold
                                                    ">
                                                        #{report.report_id}
                                                    </h3>

                                                </div>

                                            </div>


                                            <span className="
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-yellow-400/10
                                                border
                                                border-yellow-400/20
                                                text-yellow-400
                                                text-xs
                                                font-semibold
                                            ">
                                                {report.status}
                                            </span>

                                        </div>


                                        <div className="p-6 space-y-5">


                                            <div>

                                                <p className="
                                                    text-gray-500
                                                    text-xs
                                                    mb-1
                                                ">
                                                    Reporter
                                                </p>

                                                <p className="
                                                    font-semibold
                                                ">
                                                    {report.reporter_name}
                                                    {" "}
                                                    {report.reporter_last_name}
                                                </p>

                                            </div>


                                            <div className="
                                                flex
                                                justify-between
                                                gap-4
                                            ">

                                                <div>

                                                    <p className="
                                                        text-gray-500
                                                        text-xs
                                                        mb-1
                                                    ">
                                                        Ticket ID
                                                    </p>

                                                    <p className="
                                                        font-semibold
                                                    ">
                                                        {report.ticket_id}
                                                    </p>

                                                </div>


                                                <div>

                                                    <p className="
                                                        text-gray-500
                                                        text-xs
                                                        mb-1
                                                    ">
                                                        Status
                                                    </p>

                                                    <p className="
                                                        font-semibold
                                                    ">
                                                        {report.status}
                                                    </p>

                                                </div>

                                            </div>


                                            <div>

                                                <p className="
                                                    text-gray-500
                                                    text-xs
                                                    mb-2
                                                ">
                                                    Description
                                                </p>

                                                <div className="
                                                    bg-gray-950
                                                    border
                                                    border-white/5
                                                    rounded-xl
                                                    p-4
                                                    text-gray-300
                                                    leading-6
                                                ">
                                                    {report.description}
                                                </div>

                                            </div>


                                            <div>

                                                <p className="
                                                    text-gray-500
                                                    text-xs
                                                    mb-2
                                                ">
                                                    Admin Response
                                                </p>

                                                <div className={`
                                                    rounded-xl
                                                    p-4
                                                    leading-6
                                                    ${
                                                        report.respond
                                                            ? `
                                                                bg-green-400/5
                                                                border
                                                                border-green-400/10
                                                                text-gray-300
                                                            `
                                                            : `
                                                                bg-gray-950
                                                                border
                                                                border-white/5
                                                                text-gray-500
                                                            `
                                                    }
                                                `}>
                                                    {report.respond ||
                                                        "No response yet"}
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
                            p-12
                            text-center
                        ">

                            <div className="text-5xl mb-4">
                                🎟️
                            </div>


                            <h3 className="
                                text-xl
                                font-bold
                                mb-2
                            ">
                                No ticket reports
                            </h3>


                            <p className="text-gray-500">
                                There are currently no ticket reports.
                            </p>

                        </div>

                    )}

                </section>



                <section>

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-6
                    ">

                        <div>

                            <p className="
                                text-blue-400
                                text-sm
                                font-bold
                                tracking-widest
                                mb-2
                            ">
                                RESERVATION REPORTS
                            </p>


                            <h2 className="
                                text-2xl
                                md:text-3xl
                                font-extrabold
                            ">
                                Reservation Issues
                            </h2>

                        </div>


                        <span className="
                            hidden
                            sm:block
                            px-3
                            py-1
                            rounded-full
                            bg-gray-900
                            border
                            border-white/10
                            text-gray-400
                            text-sm
                        ">
                            {reserveReports.length} reports
                        </span>

                    </div>


                    {reserveReports.length > 0 ? (

                        <div className="
                            grid
                            md:grid-cols-2
                            gap-6
                        ">

                            {
                                reserveReports.map((report) => (

                                    <div
                                        key={report.report_id}
                                        className="
                                            group
                                            bg-gray-900
                                            border
                                            border-white/10
                                            rounded-3xl
                                            overflow-hidden
                                            shadow-xl
                                            hover:-translate-y-1
                                            hover:border-blue-400/30
                                            transition-all
                                            duration-300
                                        "
                                    >

                                        <div className="
                                            bg-gradient-to-r
                                            from-gray-800
                                            to-gray-950
                                            px-6
                                            py-5
                                            flex
                                            items-center
                                            justify-between
                                            border-b
                                            border-white/10
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-4
                                            ">

                                                <div className="
                                                    w-11
                                                    h-11
                                                    rounded-xl
                                                    bg-blue-400/10
                                                    border
                                                    border-blue-400/20
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-xl
                                                ">
                                                    📋
                                                </div>


                                                <div>

                                                    <p className="
                                                        text-gray-500
                                                        text-xs
                                                    ">
                                                        REPORT
                                                    </p>


                                                    <h3 className="
                                                        font-bold
                                                    ">
                                                        #{report.report_id}
                                                    </h3>

                                                </div>

                                            </div>


                                            <span className="
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-blue-400/10
                                                border
                                                border-blue-400/20
                                                text-blue-400
                                                text-xs
                                                font-semibold
                                            ">
                                                {report.status}
                                            </span>

                                        </div>


                                        <div className="p-6 space-y-5">


                                            <div>

                                                <p className="
                                                    text-gray-500
                                                    text-xs
                                                    mb-1
                                                ">
                                                    Reporter
                                                </p>

                                                <p className="
                                                    font-semibold
                                                ">
                                                    {report.reporter_name}
                                                    {" "}
                                                    {report.reporter_last_name}
                                                </p>

                                            </div>


                                            <div>

                                                <p className="
                                                    text-gray-500
                                                    text-xs
                                                    mb-1
                                                ">
                                                    Email
                                                </p>

                                                <p className="
                                                    font-semibold
                                                    text-gray-300
                                                    break-all
                                                ">
                                                    {report.reporter_email}
                                                </p>

                                            </div>


                                            <div>

                                                <p className="
                                                    text-gray-500
                                                    text-xs
                                                    mb-1
                                                ">
                                                    Reservation ID
                                                </p>

                                                <p className="
                                                    font-semibold
                                                ">
                                                    {report.reserve_id}
                                                </p>

                                            </div>


                                            <div>

                                                <p className="
                                                    text-gray-500
                                                    text-xs
                                                    mb-2
                                                ">
                                                    Description
                                                </p>

                                                <div className="
                                                    bg-gray-950
                                                    border
                                                    border-white/5
                                                    rounded-xl
                                                    p-4
                                                    text-gray-300
                                                    leading-6
                                                ">
                                                    {report.description}
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
                            p-12
                            text-center
                        ">

                            <div className="text-5xl mb-4">
                                📋
                            </div>


                            <h3 className="
                                text-xl
                                font-bold
                                mb-2
                            ">
                                No reservation reports
                            </h3>


                            <p className="text-gray-500">
                                There are currently no reservation reports.
                            </p>

                        </div>

                    )}

                </section>

            </div>

        </div>

    );
}


export default AdminReports;