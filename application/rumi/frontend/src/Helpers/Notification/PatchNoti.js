import React, { useEffect } from "react";
import Axios from "axios";
import configData from "../../Configs/config.json";

const PatchNoti = () => {
    useEffect(() => {
        Axios.patch(configData.SERVER_URL + `notifications/readAll`).catch((error) => {
            // Error
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
    }, []);

    return <div></div>;
};

export default PatchNoti;
