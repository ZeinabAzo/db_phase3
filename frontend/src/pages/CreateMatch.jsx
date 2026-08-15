import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createMatch } from "../services/matchApi";


function CreateMatch() {

    const navigate = useNavigate();


    const [form, setForm] = useState({

        match_data: "",
        start_time: "",
        status: "scheduled",
        desc: "",
        sport_type_id: "",
        home_team_id: "",
        away_team_id: "",
        stadium_id: ""

    });


    const [loading, setLoading] = useState(false);


    function handleChange(event) {

        setForm({

            ...form,

            [event.target.name]:
                event.target.value

        });

    }


    function handleSubmit(event) {

        event.preventDefault();

        setLoading(true);


        createMatch(form)

            .then((response) => {

                console.log(
                    "MATCH CREATED:",
                    response.data
                );

                alert(
                    "Match created successfully"
                );

                navigate(
                    "/admin/matches"
                );

            })

            .catch((error) => {

                console.log(
                    "CREATE MATCH ERROR:",
                    error.response?.data
                );

                alert(
                    error.response?.data?.detail ||
                    "Failed to create match"
                );

            })

            .finally(() => {

                setLoading(false);

            });

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
                max-w-3xl
                mx-auto
                animate-[fadeIn_0.7s_ease-out]
            ">


                {/* Header */}

                <div className="mb-8">

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
                        Create Match
                    </h1>


                    <p className="
                        text-gray-400
                        mt-3
                        text-lg
                    ">
                        Add a new sports match to TicketHub.
                    </p>

                </div>


                {/* Form Card */}

                <div className="
                    bg-gray-900
                    border
                    border-white/10
                    rounded-3xl
                    shadow-2xl
                    overflow-hidden
                ">


                    {/* Card header */}

                    <div className="
                        bg-gradient-to-r
                        from-gray-800
                        to-gray-950
                        px-8
                        py-6
                        border-b
                        border-white/10
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
                            text-3xl
                        ">
                            🏟️
                        </div>


                        <div>

                            <h2 className="
                                text-xl
                                font-extrabold
                            ">
                                Match Information
                            </h2>

                            <p className="
                                text-gray-500
                                text-sm
                                mt-1
                            ">
                                Enter the match details below.
                            </p>

                        </div>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="
                            p-8
                            space-y-6
                        "
                    >


                        {/* Match title */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                text-gray-400
                                mb-2
                            ">
                                Match Title
                            </label>


                            <input
                                type="text"
                                name="match_data"
                                placeholder="e.g. Real Madrid vs Barcelona"
                                value={form.match_data}
                                onChange={handleChange}
                                required
                                className="
                                    w-full
                                    bg-gray-950
                                    border
                                    border-white/10
                                    text-white
                                    px-4
                                    py-3
                                    rounded-xl
                                    outline-none
                                    placeholder:text-gray-600
                                    focus:border-yellow-400
                                    focus:ring-1
                                    focus:ring-yellow-400
                                    transition
                                "
                            />

                        </div>


                        {/* Date */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                text-gray-400
                                mb-2
                            ">
                                Match Date & Time
                            </label>


                            <input
                                type="datetime-local"
                                name="start_time"
                                value={form.start_time}
                                onChange={handleChange}
                                required
                                className="
                                    w-full
                                    bg-gray-950
                                    border
                                    border-white/10
                                    text-white
                                    px-4
                                    py-3
                                    rounded-xl
                                    outline-none
                                    focus:border-yellow-400
                                    focus:ring-1
                                    focus:ring-yellow-400
                                    transition
                                "
                            />

                        </div>


                        {/* Status */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                text-gray-400
                                mb-2
                            ">
                                Status
                            </label>


                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="
                                    w-full
                                    bg-gray-950
                                    border
                                    border-white/10
                                    text-white
                                    px-4
                                    py-3
                                    rounded-xl
                                    outline-none
                                    focus:border-yellow-400
                                    focus:ring-1
                                    focus:ring-yellow-400
                                    transition
                                "
                            >

                                <option value="scheduled">
                                    Scheduled
                                </option>

                                <option value="live">
                                    Live
                                </option>

                                <option value="finished">
                                    Finished
                                </option>

                                <option value="cancelled">
                                    Cancelled
                                </option>

                            </select>

                        </div>


                        {/* Description */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                text-gray-400
                                mb-2
                            ">
                                Description
                            </label>


                            <textarea
                                name="desc"
                                placeholder="Add a short description about the match..."
                                value={form.desc}
                                onChange={handleChange}
                                rows="4"
                                className="
                                    w-full
                                    bg-gray-950
                                    border
                                    border-white/10
                                    text-white
                                    px-4
                                    py-3
                                    rounded-xl
                                    outline-none
                                    resize-none
                                    placeholder:text-gray-600
                                    focus:border-yellow-400
                                    focus:ring-1
                                    focus:ring-yellow-400
                                    transition
                                "
                            />

                        </div>


                        {/* IDs */}

                        <div>

                            <div className="
                                flex
                                items-center
                                gap-2
                                mb-4
                            ">

                                <span className="text-yellow-400">
                                    ⚙️
                                </span>

                                <h3 className="
                                    font-bold
                                    text-lg
                                ">
                                    Match Configuration
                                </h3>

                            </div>


                            <div className="
                                grid
                                sm:grid-cols-2
                                gap-4
                            ">


                                {/* Sport */}

                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-gray-400
                                        mb-2
                                    ">
                                        Sport Type ID
                                    </label>


                                    <input
                                        type="number"
                                        name="sport_type_id"
                                        placeholder="e.g. 1"
                                        value={form.sport_type_id}
                                        onChange={handleChange}
                                        required
                                        className="
                                            w-full
                                            bg-gray-950
                                            border
                                            border-white/10
                                            text-white
                                            px-4
                                            py-3
                                            rounded-xl
                                            outline-none
                                            focus:border-yellow-400
                                            focus:ring-1
                                            focus:ring-yellow-400
                                        "
                                    />

                                </div>


                                {/* Stadium */}

                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-gray-400
                                        mb-2
                                    ">
                                        Stadium ID
                                    </label>


                                    <input
                                        type="number"
                                        name="stadium_id"
                                        placeholder="e.g. 1"
                                        value={form.stadium_id}
                                        onChange={handleChange}
                                        required
                                        className="
                                            w-full
                                            bg-gray-950
                                            border
                                            border-white/10
                                            text-white
                                            px-4
                                            py-3
                                            rounded-xl
                                            outline-none
                                            focus:border-yellow-400
                                            focus:ring-1
                                            focus:ring-yellow-400
                                        "
                                    />

                                </div>


                                {/* Home team */}

                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-gray-400
                                        mb-2
                                    ">
                                        Home Team ID
                                    </label>


                                    <input
                                        type="number"
                                        name="home_team_id"
                                        placeholder="e.g. 1"
                                        value={form.home_team_id}
                                        onChange={handleChange}
                                        required
                                        className="
                                            w-full
                                            bg-gray-950
                                            border
                                            border-white/10
                                            text-white
                                            px-4
                                            py-3
                                            rounded-xl
                                            outline-none
                                            focus:border-yellow-400
                                            focus:ring-1
                                            focus:ring-yellow-400
                                        "
                                    />

                                </div>


                                {/* Away team */}

                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-gray-400
                                        mb-2
                                    ">
                                        Away Team ID
                                    </label>


                                    <input
                                        type="number"
                                        name="away_team_id"
                                        placeholder="e.g. 2"
                                        value={form.away_team_id}
                                        onChange={handleChange}
                                        required
                                        className="
                                            w-full
                                            bg-gray-950
                                            border
                                            border-white/10
                                            text-white
                                            px-4
                                            py-3
                                            rounded-xl
                                            outline-none
                                            focus:border-yellow-400
                                            focus:ring-1
                                            focus:ring-yellow-400
                                        "
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Buttons */}

                        <div className="
                            pt-6
                            border-t
                            border-white/10
                            flex
                            flex-col-reverse
                            sm:flex-row
                            gap-3
                        ">


                            <button
                                type="button"
                                onClick={() => navigate("/admin/matches")}
                                className="
                                    flex-1
                                    py-3
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-gray-800
                                    text-gray-300
                                    font-bold
                                    hover:bg-gray-700
                                    hover:text-white
                                    transition
                                "
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    flex-1
                                    py-3
                                    rounded-xl
                                    bg-yellow-400
                                    text-gray-950
                                    font-extrabold
                                    hover:bg-yellow-300
                                    disabled:bg-gray-700
                                    disabled:text-gray-500
                                    disabled:cursor-not-allowed
                                    transition
                                "
                            >

                                {loading ? (

                                    <span className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-3
                                    ">

                                        <span className="
                                            w-5
                                            h-5
                                            border-2
                                            border-gray-950/30
                                            border-t-gray-950
                                            rounded-full
                                            animate-spin
                                        " />

                                        Creating...

                                    </span>

                                ) : (

                                    "🏟️ Create Match"

                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
}


export default CreateMatch;