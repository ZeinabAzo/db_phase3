import { useEffect, useState } from "react";

import { getAllPayments } from "../services/adminApi";


function AdminPayments() {

    const [payments,setPayments]=useState([]);

    const [loading,setLoading]=useState(true);


    useEffect(()=>{

        getAllPayments()

            .then((response)=>{

                console.log(
                    "PAYMENTS:",response.data);

                setPayments(response.data.payments || []);

            })

            .catch((error)=>{

                console.log(
                    "PAYMENT ERROR:",error.response?.data
                );

            })

            .finally(()=>{

                setLoading(false);

            });

    }, []);


    if(loading){

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

                    <p className="text-gray-400 text-lg">
                        Loading payments...
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
                bg-green-400/10
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
                            ADMIN PANEL
                        </p>


                        <h1 className="
                            text-4xl
                            md:text-5xl
                            font-black
                        ">
                            Payments
                        </h1>


                        <p className="
                            text-gray-400
                            mt-3
                            text-lg
                        ">
                            View all payment transactions.
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
                        💳 {payments.length} payment
                        {payments.length !== 1 ? "s" : ""}
                    </div>

                </div>


                {/* Payments */}

                {
                    payments.length >0 ? (

                        <div className="
                            grid
                            md:grid-cols-2
                            gap-6
                        ">

                            {
                                payments.map((payment)=>(

                                    <div
                                        key={payment.payment_id}
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
                                                    bg-green-400/10
                                                    border
                                                    border-green-400/20
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-2xl
                                                ">
                                                    💳
                                                </div>


                                                <div>

                                                    <p className="
                                                        text-gray-500
                                                        text-xs
                                                        tracking-widest
                                                        font-semibold
                                                    ">
                                                        PAYMENT
                                                    </p>


                                                    <h2 className="
                                                        text-xl
                                                        font-extrabold
                                                    ">
                                                        #{payment.payment_id}
                                                    </h2>

                                                </div>

                                            </div>


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
                                                {payment.payment_status}
                                            </span>

                                        </div>



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
                                                        mb-1
                                                    ">
                                                        User ID
                                                    </p>

                                                    <p className="font-bold">
                                                        #{payment.user_id}
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
                                                        Reservation ID
                                                    </p>

                                                    <p className="font-bold">
                                                        #{payment.reservation_id}
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
                                                        Ticket ID
                                                    </p>

                                                    <p className="font-bold">
                                                        #{payment.ticket_id}
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
                                                        Amount
                                                    </p>

                                                    <p className="
                                                        font-bold
                                                        text-yellow-400
                                                    ">
                                                        ${payment.amount}
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
                                                        Payment Method
                                                    </p>

                                                    <p className="
                                                        font-semibold
                                                        text-gray-300
                                                    ">
                                                        {payment.payment_method}
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
                                                        Paid At
                                                    </p>

                                                    <p className="
                                                        font-semibold
                                                        text-gray-300
                                                        text-sm
                                                    ">
                                                        {
                                                            payment.paid_at
                                                                ? new Date(
                                                                    payment.paid_at
                                                                ).toLocaleString()
                                                                : "—"
                                                        }
                                                    </p>

                                                </div>

                                            </div>


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
                                                    Transaction ID
                                                </p>


                                                <p className="
                                                    font-mono
                                                    text-sm
                                                    text-gray-300
                                                    break-all
                                                ">
                                                    {payment.transaction_id || "—"}
                                                </p>

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
                                bg-green-400/10
                                border
                                border-green-400/20
                                flex
                                items-center
                                justify-center
                                text-5xl
                            ">
                                💳
                            </div>


                            <h2 className="
                                text-2xl
                                md:text-3xl
                                font-black
                                mb-3
                            ">
                                No payments found
                            </h2>


                            <p className="
                                text-gray-500
                                max-w-md
                                mx-auto
                            ">
                                There are currently no payment transactions.
                            </p>

                        </div>

                    )}

            </div>

        </div>

    );
}


export default AdminPayments;