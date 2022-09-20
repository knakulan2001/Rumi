import React from "react";
import photo from "../../../Assets/Members/alex.jpg";

const alex = () => {
    return (
        <div>
            <div id="heading">
                <h1>
                    Alex <span className="user-info-highlight">Shirazi</span>
                </h1>
            </div>

            <div className="center">
                <img src={photo} alt="Alex Shirazi" width="100%" height="100%" />
                <h2>Frontend/Backend Developer</h2>
                <p>
                    I am a full stack developer interested in learning new technologies introduced to the computer science
                    industry and working with others to create beautiful products.
                </p>
            </div>
        </div>
    );
};

export default alex;
