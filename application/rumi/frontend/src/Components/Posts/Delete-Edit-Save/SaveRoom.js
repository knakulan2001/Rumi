import React from "react";
import { BsStarFill } from "react-icons/bs";
import Axios from "axios";
import configData from "../../../Configs/config.json";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SaveRoom = ({ id }) => {
    const savePost = (id) => {
        const data = { post_id: id, saved_by: Cookies.get("loggedUserid") };

        Axios.post(configData.SERVER_URL + "favorites", data)
            .then(() => {
                toast.success(`Post Saved!`, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                    progress: 0,
                });
            })
            .catch((error) => {
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
    };

    const savestyle = { width: "40px", height: "40px" };
    return (
        <div className="post-save-button">
            <BsStarFill
                onClick={() => {
                    savePost(id);
                }}
                style={savestyle}
            />
        </div>
    );
};
