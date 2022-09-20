import React from "react";
import photo from "../../../Assets/Members/anmol.png";

const anmol = () => {
    return (
        <div>
            <div id="heading">
                <h1>
                    Anmol <span className="user-info-highlight">Burmy</span>
                </h1>
            </div>

            <div className="center">
                <img src={photo} alt="Anmol Burmy" width="100%" height="100%" />
                <h2>Frontend Developer</h2>
                <p>
                    A Computer Science student at San Francisco State University who is passionate about becoming a Front-end
                    Developer. I love creating things on the web and be very detailed with them. I aspire toward a career that
                    will allow me to channel my creativity through crafting beautiful software and engaging experiences.
                </p>
            </div>
        </div>
    );
};

export default anmol;
