import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import video from "../assets/videos/background.mp4";

import "../notfound.css";


function NotFound() {

    return (

        <main className="notfound-page">

            <video
                className="background-video"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
            >

                <source
                    src={video}
                    type="video/mp4"
                />

            </video>


            {/* Dark overlay */}

            <div className="notfound-overlay" />


            {/* Logo */}

            <header
                className="logo-wrapper"
                aria-label="TicketHub"
            >

                <Link to="/">

                    <img
                        src={logo}
                        alt="TicketHub"
                    />

                </Link>

            </header>


            {/* Content */}

            <section className="notfound-content">

                <div className="notfound-badge">

                    PAGE NOT FOUND

                </div>


                <h1>

                    4<span>0</span>4

                </h1>


                <div className="divider" />


                <h2>

                    Looks like this ticket doesn't exist.

                </h2>


                <p>

                    The page you're looking for may have moved,
                    disappeared, or never existed.

                </p>


                <Link
                    to="/"
                    className="back-home-button"
                >

                    <span>←</span>

                    Back to TicketHub

                </Link>

            </section>


            {/* Decorative elements */}

            <div className="notfound-glow glow-one" />

            <div className="notfound-glow glow-two" />

        </main>

    );

}


export default NotFound;