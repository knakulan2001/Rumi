import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "animate.css";

const Home = () => {
    return (
        <div>
            <div className="right-half">
                <div className="heading">Welcome Home.</div>
                <div className="sub-heading">
                    Introducing a new way to find Rooms and Roommates around San Francisco Bay Area.
                </div>
                <div className="find">
                    <Link to="/rooms">
                        <p className="find-room">
                            Find a <span className="highlight">Room</span>
                        </p>
                    </Link>
                    <Link to="/roommates">
                        <p className="find-roommate">
                            Find a <span className="highlight">Roommate</span>
                        </p>
                    </Link>
                </div>
            </div>

            <div className="left-half"></div>
        </div>
    );
};

export default Home;
