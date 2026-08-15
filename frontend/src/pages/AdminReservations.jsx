import { useEffect, useState } from "react";

import {
    getCancelledReserves
} from "../services/adminApi";


function AdminReservations(){


    const [reservations,setReservations]=useState([]);



    useEffect(()=>{

        getCancelledReserves()

            .then((response)=>{

                console.log(
                    "CANCELLED RESERVES:",
                    response.data
                );


                setReservations(
                    response.data.reserves 
                );

            })


            .catch((error) => {

                console.log(
                    "RESERVATION ERROR:",
                    error.response?.data
                );

            });


    }, []);



    return (

        <div className="min-h-screen bg-gray-100 p-10">


            <h1 className="text-3xl font-bold text-center mb-8">

                Cancelled Reservations

            </h1>



            <div className="max-w-5xl mx-auto space-y-4">


                {
                    reservations.map((reserve)=>(


                <div

                    key={reserve.reserve_id}

                    className="
                        bg-white
                        rounded-xl
                        shadow
                        p-6
                    "

                >

                    <h2 className="text-2xl font-bold">

                        {reserve.home_team}

                        {" vs "}

                        {reserve.away_team}

                    </h2>


                    <div className="mt-4 space-y-2">


                        <p>

                            Reservation ID:
                            {" "}
                            {reserve.reserve_id}

                        </p>


                        <p>

                            User:
                            {" "}
                            {reserve.first_name}

                            {" "}

                            {reserve.last_name}

                        </p>


                        <p>

                            Email:
                            {" "}
                            {reserve.email}

                        </p>


                        <p>

                            Seat:
                            {" "}
                            {reserve.row_number}

                            {" - "}

                            {reserve.seat_number}

                        </p>


                        <p>

                            Ticket ID:
                            {" "}
                            {reserve.ticket_id}

                        </p>


                        <p>

                            Price:
                            {" "}
                            {reserve.price}

                        </p>


                        <p>

                            Match Date:
                            {" "}
                            {new Date(
                                reserve.start_time
                            ).toLocaleString()}

                        </p>


                        <p>

                            Status:
                            {" "}

                            <span className="text-red-600 font-bold">

                                {reserve.status}

                            </span>

                        </p>


                    </div>

                </div>


                    ))
                }


            </div>


        </div>

    );

}


export default AdminReservations;