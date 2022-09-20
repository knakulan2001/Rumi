import React from "react";
import { Facebook, Twitter, Email, Pinterest, Reddit } from "react-sharingbuttons";
import "react-sharingbuttons/dist/main.css";

const Share = ({ siteurl }) => {
    const shareText = "Take a look at this Room I have just found. ";

    return (
        <div>
            <Facebook text=" " url={siteurl} />
            <Twitter text=" " url={siteurl} shareText={shareText} />
            <Email text=" " url={siteurl} subject={"Found a Room!"} />
            <Pinterest text=" " url={siteurl} />
            <Reddit text=" " url={siteurl} shareText={shareText} />
        </div>
    );
};

export default Share;
