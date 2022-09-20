import React from "react";
import photo from "../../../Assets/Members/Nakulan.jfif";

const nakulan = () => {
    return (
        <div>
            <div id="heading">
                <h1>
                    Nakulan <span className="user-info-highlight">Karthikeyan</span>
                </h1>
            </div>

            <div className="center">
                <img src={photo} alt="Nakulan Karthikeyan" width="100%" height="100%" />
                <h2>Frontend Developer</h2>
                <p>
                    Hey guys! My name is Nakulan and I am a Third-Year Computer Science student at San Francisco State University.
                    I am passionate about application and web development, and I enjoy developing new products that cater to a
                    wide range of consumer interests. I am interested in learning new technologies and being at the forefront of
                    new discoveries/breakthroughs in the field of Computer Science. In my free-time, I enjoy reading, playing
                    badminton, working out, playing video games, and coding.
                </p>
            </div>
        </div>
    );
};

export default nakulan;
