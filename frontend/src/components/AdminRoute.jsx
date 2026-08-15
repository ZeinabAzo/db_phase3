import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getMyProfile } from "../services/userApi";
function AdminRoute({ children }) {

    const [loading,setLoading]=useState(true);

    const [isAdmin,setIsAdmin]=useState(false);


    useEffect(()=>{

        getMyProfile()

            .then((response)=>{

                if (response.data.role ==="admin") {

                    setIsAdmin(true);

                }

            })

            .catch((error)=>{

                console.log(
                    "ADMIN ERROR:",
                    error.response?.data
                );

            })

            .finally(()=>{

                setLoading(false);

            });

    }, []);


    if (loading){

        return <h1>Loading...</h1>;

    }


    if (!isAdmin){

        return <Navigate to="/" />;

    }


    return children;

}

export default AdminRoute;