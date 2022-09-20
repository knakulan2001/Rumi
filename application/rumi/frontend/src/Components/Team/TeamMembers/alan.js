import React from "react";
import photo from "../../../Assets/Members/alan.jpg";

const alan = () => {
    return (
        <div>
            <div id="heading">
                <h1>
                    Cheng-Yu(Alan) <span className="user-info-highlight">Chuang</span>
                </h1>
            </div>

            <div className="center">
                <div>
                    <img src={photo} alt="Cheng-Yu(Alan) Chuang" width="100%" height="100%" />
                </div>
                <div>
                    <h2>Backend Developer</h2>
                    <p>I'm a backend developer and generally interested in Machine Learning and Bioinformatics.</p>
                </div>
            </div>
        </div>
    );
};

export default alan;
