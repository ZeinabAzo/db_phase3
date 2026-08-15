import { useEffect, useState } from "react";
import { searchTickets } from "../services/ticketApi";
import { reserveTicket } from "../services/reserveApi";
import { getLocations } from "../services/locationApi";

function SearchTickets() {

    const [filters, setFilters] = useState({
        city: "",
        sport_type: "",
        venue: "",
        home_team: "",
        away_team: "",
        date: "",
        ticket_type: "",
        min_price: "",
        max_price: ""
    });

    const [tickets, setTickets] = useState([]);
    const [cities, setCities] = useState([]);
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        getLocations()

            .then((response) => {

                console.log(
                    "LOCATIONS:",
                    response.data
                );

                setCities(response.data.cities);
                setVenues(response.data.venues);

            })

            .catch((error) => {

                console.log(error);

            });

    }, []);


    function handleChange(event) {

        setFilters({
            ...filters,
            [event.target.name]:
                event.target.value
        });

    }


    function handleSearch(event) {

        event.preventDefault();

        setLoading(true);

        searchTickets(filters)

            .then((response) => {

                console.log(
                    "SEARCH:",
                    response.data
                );

                setTickets(response.data);

            })

            .catch((error) => {

                console.log(
                    "SEARCH ERROR:",
                    error.response?.data
                );

            })

            .finally(() => {

                setLoading(false);

            });

    }


    function handleReserve(ticket_id) {

        reserveTicket(ticket_id)

            .then((response) => {

                console.log(
                    "RESERVE:",
                    response.data
                );

                alert(
                    response.data.message
                );

            })

            .catch((error) => {

                console.log(
                    "RESERVE ERROR:",
                    error.response?.data
                );

                alert(
                    error.response?.data?.detail ||
                    "Reservation failed"
                );

            });

    }


    function inputClass() {

        return `
            w-full
            bg-gray-950
            border border-white/10
            text-white
            rounded-xl
            px-4
            py-3
            outline-none
            transition-all
            duration-300
            focus:border-yellow-400
            focus:ring-1
            focus:ring-yellow-400
            hover:border-white/20
            placeholder:text-gray-600
        `;

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
                -left-40
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
                -right-40
                w-96
                h-96
                bg-blue-500/10
                rounded-full
                blur-3xl
                animate-pulse
            " />


            <div className="
                relative
                z-10
                max-w-7xl
                mx-auto
                animate-[fadeIn_0.7s_ease-out]
            ">


                {/* Header */}

                <div className="
                    text-center
                    mb-12
                ">

                    <div className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-full
                        bg-yellow-400/10
                        border
                        border-yellow-400/20
                        text-yellow-400
                        text-sm
                        font-bold
                        tracking-widest
                        mb-5
                    ">

                        <span className="
                            w-2
                            h-2
                            bg-green-400
                            rounded-full
                            animate-pulse
                        " />

                        FIND YOUR SEAT

                    </div>


                    <h1 className="
                        text-4xl
                        md:text-6xl
                        font-black
                        mb-4
                    ">
                        Search Tickets
                    </h1>


                    <p className="
                        text-gray-400
                        max-w-2xl
                        mx-auto
                        text-lg
                        leading-7
                    ">
                        Find the perfect ticket using teams,
                        location, sport, date and price filters.
                    </p>

                </div>


                {/* Search Panel */}

                <form
                    onSubmit={handleSearch}
                    className="
                        bg-gray-900
                        border
                        border-white/10
                        rounded-3xl
                        p-6
                        md:p-8
                        shadow-2xl
                        hover:border-yellow-400/20
                        transition-all
                        duration-500
                    "
                >

                    <div className="
                        flex
                        items-center
                        gap-3
                        mb-7
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
                            🔎
                        </div>


                        <div>

                            <h2 className="
                                text-xl
                                font-bold
                            ">
                                Search Filters
                            </h2>

                            <p className="
                                text-gray-500
                                text-sm
                            ">
                                Narrow down your ticket search
                            </p>

                        </div>

                    </div>


                    <div className="
                        grid
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-5
                    ">


                        {/* City */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                City
                            </label>

                            <select
                                name="city"
                                value={filters.city}
                                onChange={handleChange}
                                className={inputClass()}
                            >

                                <option value="">
                                    All Cities
                                </option>

                                {cities.map((city) => (

                                    <option
                                        key={city.name}
                                        value={city.name}
                                    >
                                        {city.name}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Venue */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Venue
                            </label>

                            <select
                                name="venue"
                                value={filters.venue}
                                onChange={handleChange}
                                className={inputClass()}
                            >

                                <option value="">
                                    All Venues
                                </option>

                                {venues.map((venue) => (

                                    <option
                                        key={venue.name}
                                        value={venue.name}
                                    >
                                        {venue.name}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Sport */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Sport
                            </label>

                            <input
                                name="sport_type"
                                value={filters.sport_type}
                                onChange={handleChange}
                                placeholder="e.g. Football"
                                className={inputClass()}
                            />

                        </div>


                        {/* Home Team */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Home Team
                            </label>

                            <input
                                name="home_team"
                                value={filters.home_team}
                                onChange={handleChange}
                                placeholder="Home team"
                                className={inputClass()}
                            />

                        </div>


                        {/* Away Team */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Away Team
                            </label>

                            <input
                                name="away_team"
                                value={filters.away_team}
                                onChange={handleChange}
                                placeholder="Away team"
                                className={inputClass()}
                            />

                        </div>


                        {/* Date */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Match Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={filters.date}
                                onChange={handleChange}
                                className={inputClass()}
                            />

                        </div>


                        {/* Ticket Type */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Ticket Type
                            </label>

                            <input
                                name="ticket_type"
                                value={filters.ticket_type}
                                onChange={handleChange}
                                placeholder="e.g. VIP"
                                className={inputClass()}
                            />

                        </div>


                        {/* Min Price */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Minimum Price
                            </label>

                            <input
                                type="number"
                                name="min_price"
                                value={filters.min_price}
                                onChange={handleChange}
                                placeholder="Min price"
                                className={inputClass()}
                            />

                        </div>


                        {/* Max Price */}

                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-400
                                mb-2
                            ">
                                Maximum Price
                            </label>

                            <input
                                type="number"
                                name="max_price"
                                value={filters.max_price}
                                onChange={handleChange}
                                placeholder="Max price"
                                className={inputClass()}
                            />

                        </div>

                    </div>


                    {/* Search Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            group
                            mt-7
                            w-full
                            py-4
                            rounded-xl
                            bg-yellow-400
                            text-gray-950
                            font-extrabold
                            text-lg
                            hover:bg-yellow-300
                            hover:scale-[1.01]
                            hover:shadow-xl
                            hover:shadow-yellow-400/20
                            disabled:bg-gray-700
                            disabled:text-gray-500
                            disabled:scale-100
                            transition-all
                            duration-300
                        "
                    >

                        {loading ? (

                            <span className="
                                inline-flex
                                items-center
                                justify-center
                                gap-3
                            ">

                                <span className="
                                    w-5
                                    h-5
                                    border-2
                                    border-gray-700
                                    border-t-gray-950
                                    rounded-full
                                    animate-spin
                                " />

                                Searching...

                            </span>

                        ) : (

                            <span>
                                🔍 Search Tickets
                                <span className="
                                    inline-block
                                    ml-2
                                    group-hover:translate-x-1
                                    transition-transform
                                ">
                                    →
                                </span>
                            </span>

                        )}

                    </button>

                </form>


                {/* Results */}

                <div className="mt-14">

                    <div className="
                        flex
                        items-end
                        justify-between
                        mb-7
                    ">

                        <div>

                            <p className="
                                text-yellow-400
                                text-sm
                                font-bold
                                tracking-widest
                                mb-2
                            ">
                                RESULTS
                            </p>

                            <h2 className="
                                text-3xl
                                font-black
                            ">
                                Available Tickets
                            </h2>

                        </div>


                        <span className="
                            px-4
                            py-2
                            rounded-full
                            bg-white/5
                            border
                            border-white/10
                            text-gray-400
                            text-sm
                        ">
                            {tickets.length} found
                        </span>

                    </div>


                    {tickets.length > 0 ? (

                        <div className="
                            grid
                            md:grid-cols-2
                            lg:grid-cols-3
                            gap-6
                        ">

                            {tickets.map(
                                (ticket, index) => (

                                    <div
                                        key={ticket.ticket_id}
                                        className="
                                            group
                                            bg-gray-900
                                            border
                                            border-white/10
                                            rounded-3xl
                                            overflow-hidden
                                            shadow-lg
                                            hover:-translate-y-2
                                            hover:border-yellow-400/30
                                            hover:shadow-yellow-400/5
                                            transition-all
                                            duration-500
                                            animate-[fadeIn_0.6s_ease-out]
                                        "
                                        style={{
                                            animationDelay:
                                                `${index * 80}ms`
                                        }}
                                    >

                                        {/* Match Header */}

                                        <div className="
                                            relative
                                            bg-gradient-to-r
                                            from-gray-800
                                            to-gray-900
                                            px-6
                                            py-6
                                            overflow-hidden
                                        ">

                                            <div className="
                                                absolute
                                                -right-10
                                                -top-10
                                                w-28
                                                h-28
                                                bg-yellow-400/10
                                                rounded-full
                                                blur-2xl
                                                group-hover:bg-yellow-400/20
                                                transition-all
                                            " />


                                            <div className="
                                                relative
                                                z-10
                                                flex
                                                justify-between
                                                items-center
                                            ">

                                                <span className="
                                                    text-yellow-400
                                                    text-xs
                                                    font-bold
                                                    tracking-widest
                                                ">
                                                    MATCH
                                                </span>


                                                <span className="
                                                    text-2xl
                                                    group-hover:scale-125
                                                    group-hover:rotate-6
                                                    transition-all
                                                ">
                                                    ⚽
                                                </span>

                                            </div>


                                            <h3 className="
                                                relative
                                                z-10
                                                text-xl
                                                font-black
                                                mt-5
                                            ">

                                                {ticket.home_team_name}

                                                <span className="
                                                    text-yellow-400
                                                    mx-2
                                                ">
                                                    VS
                                                </span>

                                                {ticket.away_team_name}

                                            </h3>

                                        </div>


                                        {/* Details */}

                                        <div className="
                                            p-6
                                            space-y-4
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                            ">

                                                <span className="
                                                    text-yellow-400
                                                ">
                                                    🏟️
                                                </span>

                                                <span className="
                                                    text-gray-300
                                                    text-sm
                                                ">
                                                    {ticket.stadium_name}
                                                </span>

                                            </div>


                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                            ">

                                                <span className="
                                                    text-yellow-400
                                                ">
                                                    📍
                                                </span>

                                                <span className="
                                                    text-gray-300
                                                    text-sm
                                                ">
                                                    {ticket.city_name}
                                                </span>

                                            </div>


                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                            ">

                                                <span className="
                                                    text-yellow-400
                                                ">
                                                    🎟️
                                                </span>

                                                <span className="
                                                    text-gray-300
                                                    text-sm
                                                ">
                                                    {ticket.ticket_type}
                                                </span>

                                            </div>


                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                            ">

                                                <span className="
                                                    text-yellow-400
                                                ">
                                                    📅
                                                </span>

                                                <span className="
                                                    text-gray-300
                                                    text-sm
                                                ">
                                                    {new Date(
                                                        ticket.start_time
                                                    ).toLocaleString()}
                                                </span>

                                            </div>


                                            {/* Price */}

                                            <div className="
                                                pt-5
                                                mt-5
                                                border-t
                                                border-white/10
                                                flex
                                                justify-between
                                                items-end
                                            ">

                                                <div>

                                                    <p className="
                                                        text-gray-500
                                                        text-sm
                                                    ">
                                                        Price
                                                    </p>

                                                    <p className="
                                                        text-3xl
                                                        font-black
                                                        text-yellow-400
                                                    ">
                                                        ${ticket.price}
                                                    </p>

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
                                                    {ticket.status}
                                                </span>

                                            </div>


                                            {/* Reserve */}

                                            <button
                                                onClick={() =>
                                                    handleReserve(
                                                        ticket.ticket_id
                                                    )
                                                }
                                                disabled={
                                                    ticket.status !==
                                                    "available"
                                                }
                                                className="
                                                    group/button
                                                    mt-2
                                                    w-full
                                                    py-3.5
                                                    rounded-xl
                                                    bg-yellow-400
                                                    text-gray-950
                                                    font-extrabold
                                                    hover:bg-yellow-300
                                                    hover:scale-[1.02]
                                                    hover:shadow-lg
                                                    hover:shadow-yellow-400/20
                                                    disabled:bg-gray-700
                                                    disabled:text-gray-500
                                                    disabled:cursor-not-allowed
                                                    disabled:scale-100
                                                    transition-all
                                                    duration-300
                                                "
                                            >

                                                {ticket.status ===
                                                "available" ? (

                                                    <span>
                                                        Reserve Ticket

                                                        <span className="
                                                            inline-block
                                                            ml-2
                                                            group-hover/button:translate-x-1
                                                            transition-transform
                                                        ">
                                                            →
                                                        </span>
                                                    </span>

                                                ) : (
                                                    "Unavailable"
                                                )}

                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

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
                                mb-7
                                rounded-3xl
                                bg-yellow-400/10
                                border
                                border-yellow-400/20
                                flex
                                items-center
                                justify-center
                                text-5xl
                                animate-bounce
                            ">
                                🎟️
                            </div>


                            <h3 className="
                                text-2xl
                                md:text-3xl
                                font-black
                                mb-3
                            ">
                                No tickets found
                            </h3>


                            <p className="
                                text-gray-400
                            ">
                                Try changing your search filters.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default SearchTickets;

