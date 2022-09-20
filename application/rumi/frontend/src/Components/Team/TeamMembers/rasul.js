import React from "react";
import photo from "../../../Assets/Members/rasul.jpg";

const rasul = () => {
    return (
        <div>
            <div id="heading">
                <h1>
                    Rasul <span className="user-info-highlight">Imanov</span>
                </h1>
            </div>

            <div className="center">
                <img src={photo} alt="Rasul Imanov" width="100%" height="100%" />
                <h2>Frontend/Backend Developer</h2>
                <p>
                    Proactive and results-driven full-stack developer actively learning new technology stacks and taking on
                    challenging tasks in order to produce the most optimal code for the given circumstance.
                </p>
            </div>
        </div>
    );
};

export default rasul;
