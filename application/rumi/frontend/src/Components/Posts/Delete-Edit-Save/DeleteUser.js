import React from "react";
import Axios from "axios";
import configData from "../../../Configs/config.json";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";

export const DeleteUser = ({ id }) => {
    const deleteUser = (userid) => {
        const data = { id: userid };
        Axios.delete(configData.SERVER_URL + `users`, { data })
            .then(() => {
                window.location.reload();
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
    return (
        <div className="export-btn">
            <UseAnimations
                animation={trash2}
                size={35}
                className="user-delete-button"
                onClick={() => {
                    deleteUser(id);
                }}
            />
        </div>
    );
};
