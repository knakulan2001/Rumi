import { React, useEffect, useState } from "react";
import Axios from "axios";
import configData from "../../../../Configs/config.json";
import Cookies from "js-cookie";
import { FaSmoking } from "react-icons/fa";
import { RiParkingBoxLine } from "react-icons/ri";
import { MdOutlinePets } from "react-icons/md";
import { SaveRoom } from "../../Delete-Edit-Save/SaveRoom";
import { useHistory } from "react-router-dom";
import "./Suggested.css";

const Suggested = () => {
    const [suggested, setSuggested] = useState([]);
    let history = useHistory();
    useEffect(() => {
        Axios.get(configData.SERVER_URL + `posts/suggest`)
            .then((response) => {
                setSuggested(response.data.results);
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
    }, []);

    const style = { width: "32px", height: "32px" };
    return (
        <div className="post-listings-suggested">
            <div className="post-container-suggested">
                {suggested &&
                    suggested
                        .slice(0, 4)
                        .reverse()
                        .map((value, key) => {
                            value.created_date = new Date(value.created_date).toDateString();
                            return (
                                <div key={value.id}>
                                    {Cookies.get("token") && Cookies.get("username") !== `${value.username}` && (
                                        <div className="post-card-suggested-cont">
                                            <div className="post-suggest-container">
                                                <div className="post-suggest">Suggested</div>
                                            </div>
                                            <div key={value.id} className="post-card-suggested">
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

                                                {Cookies.get("token") && !Cookies.get("admin") && <SaveRoom id={value.id} />}
                                                <div
                                                    className="post-info-container"
                                                    onClick={() => {
                                                        history.push(`/post/${value.id}`);
                                                    }}
                                                >
                                                    <div className="post-caption">{value.caption}</div>
                                                    <div className="post-desc">{value.description}</div>
                                                    <div className="post-desc-pref">
                                                        {(() => {
                                                            // eslint-disable-next-line eqeqeq
                                                            if (value.parking == "1") {
                                                                return (
                                                                    <div>
                                                                        <RiParkingBoxLine style={style} />
                                                                    </div>
                                                                );
                                                            } else {
                                                                return <></>;
                                                            }
                                                        })()}
                                                        {(() => {
                                                            // eslint-disable-next-line eqeqeq
                                                            if (value.pet == "1") {
                                                                return (
                                                                    <div>
                                                                        <MdOutlinePets style={style} />
                                                                    </div>
                                                                );
                                                            } else {
                                                                return <></>;
                                                            }
                                                        })()}
                                                        {(() => {
                                                            // eslint-disable-next-line eqeqeq
                                                            if (value.smoking == "1") {
                                                                return (
                                                                    <div>
                                                                        <FaSmoking style={style} />
                                                                    </div>
                                                                );
                                                            } else {
                                                                return <></>;
                                                            }
                                                        })()}
                                                    </div>

                                                    <div className="post-date">{value.created_date}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
            </div>
        </div>
    );
};

export default Suggested;
