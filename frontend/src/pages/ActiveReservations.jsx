import { useEffect, useState } from "react";


import { 
    getActiveReservations,
} from "../services/reserveApi";
import {
    requestPayment,
    paymentCallback
} from "../services/paymentApi";

function ActiveReservations(){

    const [reservations,setReservations]=useState([]);

    const [loading,setLoading] =useState(true);
    const [currentTime,setCurrentTime] =useState(Date.now());

    useEffect(()=>{

        getActiveReservations()

            .then((response)=>{

                console.log(
                    "RESERVATIONS:",response.data
                );

                setReservations(response.data.data || []);

            })

            .catch((error)=>{

                console.log("RESERVATIONS ERROR:",error.response?.data);})

            .finally(()=>{setLoading(false);});

    }, []);


    useEffect(()=>{

        const interval=setInterval(()=>{

            setCurrentTime(Date.now());

        }, 1000);

        return ()=>clearInterval(interval);

    }, []);

    function handlePayment(reserve_id) {

        requestPayment(reserve_id)

            .then((response)=>{

                console.log("PAYMENT:",response.data);

                return paymentCallback(response.data.transaction_id);

            })

            .then((response)=>{

                console.log("CALLBACK:",response.data);

                alert("Payment completed successfully");

                getActiveReservations()

                    .then((response)=>{

                        setReservations(response.data.data);

                    });

            })

            .catch((error)=>{

                console.log(
                    "PAYMENT ERROR:",error.response?.data);

                alert(
                    error.response?.data?.detail ||"Payment failed");

            });

    }

    function getRemainingTime(expireAt) {

        const diff = new Date(expireAt) - currentTime;

        if (diff<=0) {
            return "Expired";
        }

        const minutes=Math.floor(diff / 60000);

        const seconds=Math.floor((diff % 60000) / 1000);

        return `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;

    }


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
                        Loading reservations...
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
                bg-blue-500/10
                rounded-full
                blur-3xl
            " />

            <div className="
                absolute
                -bottom-40
                -left-40
                w-96
                h-96
                bg-yellow-400/10
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
                            Active Reservations
                        </p>


                        <h1 className="
                            text-4xl
                            md:text-5xl
                            font-black
                        ">
                            Reservations
                        </h1>


                        <p className="
                            text-gray-400
                            mt-3
                            text-lg
                        ">
                            View and manage all reservations.
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
                        🎟️ {reservations.length} reservation
                        {reservations.length !== 1 ? "s" : ""}
                    </div>

                </div>



                {
                    reservations.length>0? (

                        <div className="
                            grid
                            md:grid-cols-2
                            gap-6
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



                                        <div className="
                                            bg-gradient-to-r
                                            from-gray-800
                                            to-gray-950
                                            px-6
                                            py-5
                                            border-b
                                            border-white/10
                                            flex
                                            items-center
                                            justify-between
                                            gap-4
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-4
                                            ">

                                                <div className="
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
                                                ">
                                                    🎟️
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
                                                font-bold
                                            ">
                                                {reserve.status}
                                            </span>

                                        </div>



                                        <div className="p-6">



                                            <div className="
                                                mb-6
                                                pb-5
                                                border-b
                                                border-white/10
                                            ">

                                                <p className="
                                                    text-gray-500
                                                    text-xs
                                                    mb-2
                                                ">
                                                    Match
                                                </p>


                                                <h3 className="
                                                    text-xl
                                                    font-extrabold
                                                ">

                                                    {reserve.home_team}

                                                    <span className="
                                                        text-yellow-400
                                                        mx-2
                                                    ">
                                                        VS
                                                    </span>

                                                    {reserve.away_team}

                                                </h3>

                                            </div>


                                            <div className="
                                                grid
                                                grid-cols-2
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
                                                        mb-1
                                                    ">
                                                        Total Price
                                                    </p>

                                                    <p className="
                                                        font-bold
                                                        text-yellow-400
                                                    ">
                                                        ${reserve.total_price}
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
                                                        mb-1
                                                    ">
                                                        Status
                                                    </p>

                                                    <p className="
                                                        font-bold
                                                    ">
                                                        {reserve.status}
                                                    </p>

                                                </div>

                                            </div>



                                            <div className="
                                                mt-5
                                                space-y-3
                                            ">

                                                <div className="
                                                    flex
                                                    justify-between
                                                    gap-4
                                                    text-sm
                                                ">

                                                    <span className="
                                                        text-gray-500
                                                    ">
                                                        Match Date
                                                    </span>


                                                    <span className="
                                                        text-gray-300
                                                        text-right
                                                    ">
                                                        {
                                                            reserve.start_time
                                                                ? new Date(
                                                                    reserve.start_time
                                                                ).toLocaleString()
                                                                : "—"
                                                        }
                                                    </span>

                                                </div>


                                                <div className="
                                                    flex
                                                    justify-between
                                                    gap-4
                                                    text-sm
                                                ">

                                                    <p>

                                                        Expires in:
                                                        {" "}
                                                        {getRemainingTime(reserve.expire_at)}

                                                    </p>

                                                    <button

                                                        onClick={() => handlePayment(reserve.reserve_id)}

                                                        className="
                                                        mt-4
                                                        w-full
                                                        bg-green-600
                                                        text-white
                                                        py-2
                                                        rounded-lg
                                                        hover:bg-green-700
                                                        "

                                                    >

                                                        Pay Now

                                                    </button>

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
                            ">
                                🎟️
                            </div>


                            <h2 className="
                                text-2xl
                                md:text-3xl
                                font-black
                                mb-3
                            ">
                                No reservations found
                            </h2>


                            <p className="
                                text-gray-500
                                max-w-md
                                mx-auto
                            ">
                                There are currently no reservations in the system.
                            </p>

                        </div>

                    )}

            </div>

        </div>

    );
}


export default ActiveReservations;
