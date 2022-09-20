import React from "react";
import "./Team.css";

import { Link, useRouteMatch } from "react-router-dom";

const Team = () => {
    const { url } = useRouteMatch();

    return (
        <div>
            <div id="heading">
                <p>Software Engineering SFSU</p>
                <p>Fall 2021</p>
                <p>Section 02</p>
                <p>Team 01</p>
            </div>

            <div id="team">
                <div className="member">
                    <Link to={`${url}/alex`}>
                        <p>
                            Alex <span className="user-info-highlight">Shirazi</span>
                        </p>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/nakulan`}>
                        <p>
                            Nakulan <span className="user-info-highlight">Karthikeyan</span>
                        </p>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/jasmine`}>
                        <p>
                            Jasmine <span className="user-info-highlight">Kilani</span>
                        </p>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/josh`}>
                        <p>
                            Joshua <span className="user-info-highlight">Miranda</span>
                        </p>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/anmol`}>
                        <p>
                            Anmol <span className="user-info-highlight">Burmy</span>
                        </p>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/alan`}>
                        <p>
                            Cheng-Yu(Alan) <span className="user-info-highlight">Chuang</span>
                        </p>
                    </Link>
                </div>

                <div className="member">
                    <Link to={`${url}/rasul`}>
                        <p>
                            Rasul <span className="user-info-highlight">Imanov</span>
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Team;
