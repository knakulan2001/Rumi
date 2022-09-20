import React from "react";
import Axios from "axios";
import configData from "../../../Configs/config.json";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";

export const DeleteComment = ({ commentid }) => {
    const deleteComment = (commentid) => {
        const data = { id: commentid };
        Axios.delete(configData.SERVER_URL + `comments`, { data })
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
        <UseAnimations
            animation={trash2}
            size={35}
            className="comment-delete-button"
            onClick={() => {
                deleteComment(commentid);
            }}
        />
    );
};
