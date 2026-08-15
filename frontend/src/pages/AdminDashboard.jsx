import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getDashboardStats
} from "../services/adminApi";


function AdminDashboard(){

    const [stats,setStats]=useState({

        total_users: 0,

        total_matches: 0,

        total_reservations: 0,

        total_revenue: 0

    });

    const [loading,setLoading]=useState(true);


    useEffect(()=>{

        getDashboardStats()

            .then((response)=>{

                console.log(
                    "STATS:",
                    response.data
                );

                setStats(
                    response.data.data
                );

            })

            .catch((error) => {

                console.log(
                    "STATS ERROR:",error.response?.data
                );

            })

            .finally(()=>{

                setLoading(false);

            });

    }, []);


    if (loading){

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
                        Loading dashboard...
                    </p>

                </div>

            </div>

        );

    }


    const statCards=[

        {
            title: "Total Users",
            value: stats.total_users,
            icon: "👥",
            description: "Registered users",
            color: "blue"
        },

        {
            title: "Total Matches",
            value: stats.total_matches,
            icon: "🏟️",
            description: "Available matches",
            color: "green"
        },

        {
            title: "Reservations",
            value: stats.total_reservations,
            icon: "🎟️",
            description: "Total reservations",
            color: "yellow"
        },

        {
            title: "Revenue",
            value: stats.total_revenue,
            icon: "💰",
            description: "Total revenue",
            color: "purple"
        }

    ];


    const menuItems=[

        {
            title: "Payments",
            description: "View and manage payment transactions.",
            icon: "💳",
            to: "/admin/payments"
        },

        {
            title: "Reservations",
            description: "Manage user reservations.",
            icon: "🎟️",
            to: "/admin/reservations"
        },

        {
            title: "Reports",
            description: "Review ticket and reservation reports.",
            icon: "📊",
            to: "/admin/reports"
        },

        {
            title: "Matches Management",
            description: "Create and update sports matches.",
            icon: "🏆",
            to: "/admin/matches"
        }

    ];


    return(

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
                max-w-7xl
                mx-auto
                animate-[fadeIn_0.7s_ease-out]
            ">


                <div className="
                    mb-10
                    flex
                    flex-col
                    md:flex-row
                    md:items-end
                    md:justify-between
                    gap-6
                ">

                    <div>

                        <p className="
                            text-yellow-400
                            text-sm
                            font-bold
                            tracking-[0.25em]
                            mb-3
                        ">
                            TICKETHUB ADMIN
                        </p>


                        <h1 className="
                            text-4xl
                            md:text-5xl
                            font-black
                        ">
                            Dashboard
                        </h1>


                        <p className="
                            text-gray-400
                            mt-3
                            text-lg
                        ">
                            Manage your sports ticketing platform.
                        </p>

                    </div>


                    <div className="
                        px-5
                        py-3
                        rounded-2xl
                        bg-gray-900
                        border
                        border-white/10
                        flex
                        items-center
                        gap-3
                    ">

                        <span className="
                            w-3
                            h-3
                            rounded-full
                            bg-green-400
                            animate-pulse
                        " />

                        <span className="
                            text-gray-300
                            text-sm
                            font-semibold
                        ">
                            System Online
                        </span>

                    </div>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                    mb-12
                ">

                    {
                        statCards.map((stat)=>(

                            <div
                                key={stat.title}
                                className="
                                    group
                                    bg-gray-900
                                    border
                                    border-white/10
                                    rounded-3xl
                                    p-6
                                    shadow-xl
                                    hover:-translate-y-1
                                    hover:border-yellow-400/20
                                    transition-all
                                    duration-300
                                "
                            >

                                <div className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                ">

                                    <div>

                                        <p className="
                                            text-gray-500
                                            text-sm
                                            font-medium
                                        ">
                                            {stat.title}
                                        </p>


                                        <p className="
                                            text-3xl
                                            md:text-4xl
                                            font-black
                                            mt-3
                                        ">
                                            {stat.value}
                                        </p>


                                        <p className="
                                            text-gray-600
                                            text-xs
                                            mt-2
                                        ">
                                            {stat.description}
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
                                        group-hover:scale-110
                                        transition-transform
                                        duration-300
                                    ">
                                        {stat.icon}
                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>


                <div className="mb-6">

                    <p className="
                        text-yellow-400
                        text-sm
                        font-bold
                        tracking-widest
                        mb-2
                    ">
                        MANAGEMENT
                    </p>


                    <h2 className="
                        text-2xl
                        md:text-3xl
                        font-extrabold
                    ">
                        Admin Tools
                    </h2>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-6
                ">

                    {
                        menuItems.map((item)=>(

                            <Link
                                key={item.title}
                                to={item.to}
                                className="
                                    group
                                    bg-gray-900
                                    border
                                    border-white/10
                                    rounded-3xl
                                    p-7
                                    shadow-xl
                                    hover:-translate-y-1
                                    hover:border-yellow-400/30
                                    hover:bg-gray-900/90
                                    transition-all
                                    duration-300
                                "
                            >

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-5
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        gap-5
                                    ">

                                        <div className="
                                            w-16
                                            h-16
                                            rounded-2xl
                                            bg-yellow-400/10
                                            border
                                            border-yellow-400/20
                                            flex
                                            items-center
                                            justify-center
                                            text-3xl
                                            group-hover:scale-110
                                            transition-transform
                                            duration-300
                                        ">
                                            {item.icon}
                                        </div>


                                        <div>

                                            <h3 className="
                                                text-xl
                                                font-extrabold
                                            ">
                                                {item.title}
                                            </h3>


                                            <p className="
                                                text-gray-500
                                                mt-2
                                                text-sm
                                                leading-6
                                            ">
                                                {item.description}
                                            </p>

                                        </div>

                                    </div>


                                    <span className="
                                        text-yellow-400
                                        text-2xl
                                        group-hover:translate-x-1
                                        transition-transform
                                    ">
                                        →
                                    </span>

                                </div>

                            </Link>

                        ))
                    }

                </div>

            </div>

        </div>

    );
}


export default AdminDashboard;