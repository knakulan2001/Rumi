import { React, useEffect, useState } from "react";
import Axios from "axios";
import configData from "../../../Configs/config.json";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";

export const GetFav = ({ id }) => {
    const [userFav, setUserFav] = useState([]);
    let history = useHistory();

    useEffect(() => {
        Axios.get(configData.SERVER_URL + `posts?id=${id}`)
            .then((response) => {
                setUserFav(response.data.results);
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
    }, [id]);

    const savestyle = { width: "40px", height: "40px" };

    const unsavePost = (unsaveid) => {
        const data = { post_id: unsaveid };

        Axios.delete(configData.SERVER_URL + "favorites", { data })
            .then(() => {
                console.log("unsaved");
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
        <div>
            {userFav &&
                userFav
                    .slice(0)
                    .reverse()
                    .map((value, key) => {
                        value.created_date = new Date(value.created_date).toDateString();
                        return (
                            <div key={value.id} className="post-card post-card-roommate">
                                <img
                                    className="post-image"
                                    src={configData.SERVER_URL + `files/download?name=${value.photo}`}
                                    alt="Missing"
                                    onClick={() => {
                                        history.push(`/post/${value.id}`);
                                    }}
                                />

                                <div className="post-price-container">
                                    <div className="post-price">${value.price}</div>
                                </div>

                                {Cookies.get("token") && !Cookies.get("admin") && (
                                    <div className="post-save-button2">
                                        <BsStarFill
                                            onClick={() => {
                                                unsavePost(value.id);
                                            }}
                                            style={savestyle}
                                        />
                                    </div>
                                )}
                                <div
                                    className="post-info-container"
                                    onClick={() => {
                                        // history.push(`/post/${value.id}`);
                                    }}
                                >
                                    <div className="post-caption">{value.caption}</div>
                                    <div className="post-desc">{value.description}</div>
                                    <div className="post-desc-pref">
                                        {(() => {
                                            // eslint-disable-next-line eqeqeq
                                            if (value.parking == "1") {
                                                return <div>{/* <RiParkingBoxLine style={style} /> */}</div>;
                                            } else {
                                                return <></>;
                                            }
                                        })()}
                                        {(() => {
                                            // eslint-disable-next-line eqeqeq
                                            if (value.pet == "1") {
                                                return <div>{/* <MdOutlinePets style={style} /> */}</div>;
                                            } else {
                                                return <></>;
                                            }
                                        })()}
                                        {(() => {
                                            // eslint-disable-next-line eqeqeq
                                            if (value.smoking == "1") {
                                                return <div>{/* <FaSmoking style={style} /> */}</div>;
                                            } else {
                                                return <></>;
                                            }
                                        })()}
                                    </div>

                                    <div className="post-date">{value.created_date}</div>
                                </div>
                            </div>
                        );
                    })}
        </div>
    );
};
