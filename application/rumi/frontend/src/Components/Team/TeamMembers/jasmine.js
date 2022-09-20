import React from "react";
import photo from "../../../Assets/Members/jasmine.png";

const jasmine = () => {
    return (
        <div>
            <div id="heading">
                <h1>
                    Jasmine <span className="user-info-highlight">Kilani</span>
                </h1>
            </div>

            <div className="center">
                <img src={photo} alt="Jasmine Kilani" width="100%" height="100%" />
                <h2>GitHub Lead</h2>
                <p>
                    Hey there 👋 I'm Jasmine, a software engineering & math student at SFSU passionate about technology driven
                    change.
                    <br />
                    <br />
                    As a technologist, I'm fueled by an affinity for learning and a conviction that technology is here to serve
                    people, not manipulate them nor monotize their attention. I'm driven to building products and designing
                    solutions that serve people and communitites on a global scale. <br />
                    <br />
                    I'm constantly intrested in new ideas and looking for ways I could be helpful. Currently, I'm reading
                    <em> Give & Take</em>, <em>Atomic Habits</em>, and <em>the War of Art</em>. Say hello at anytime
                    <a href="mailto: hello@yasmine.dev"> hello@yasmine.dev</a>
                </p>
            </div>
        </div>
    );
};

export default jasmine;
