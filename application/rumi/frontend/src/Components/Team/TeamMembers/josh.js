import React from "react";
import photo from "../../../Assets/Members/josh.png";

const josh = () => {
    return (
        <div>
            <div id="heading">
                <h1>
                    Joshua <span className="user-info-highlight">Miranda</span>
                </h1>
            </div>

            <div className="center">
                <img src={photo} alt="Joshua Miranda" width="100%" height="100%" />
                <h2>Frontend/Backend Developer</h2>
                <p>
                    Hey guys, my name is Josh! I am a fourth year Computer Science student at SFSU where I enjoy learning all of
                    the technicalities that has to do with software engineering. I thrive in the situations where both my peers
                    and I can combine our knowledge and learn new things off one another to help reach outstanding final products.
                </p>
            </div>
        </div>
    );
};

export default josh;
