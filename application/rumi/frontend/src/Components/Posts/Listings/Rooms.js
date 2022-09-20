import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Listings.css";
import Location from "./CategoryLists/Location";
import Gender from "./CategoryLists/Gender";
import RoomPref from "./CategoryLists/RoomPref";
import configData from "../../../Configs/config.json";
import Cookies from "js-cookie";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import { FaSmoking } from "react-icons/fa";
import { RiParkingBoxLine } from "react-icons/ri";
import { MdOutlinePets } from "react-icons/md";
import { SaveRoom } from "../Delete-Edit-Save/SaveRoom";
import { DeleteRoom } from "../Delete-Edit-Save/DeleteRoom";
import useFullPageLoader from "../../../Helpers/Loader/UseLoader";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import GetNoti from "../../../Helpers/Notification/GetNoti";
import "animate.css";
import Suggested from "./Suggested/Suggested";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Rooms() {
    const [listOfPosts, setListOfPosts] = useState([]);

    //searchTerm
    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    //start price
    const [price1, setPrice1] = useState("");
    const [startPrice, setStartPrice] = useState("");

    //end price
    const [price2, setPrice2] = useState("");
    const [endPrice, setEndPrice] = useState("");

    const [location, setLocation] = useState([]);
    const [parking, setParking] = useState("");
    const [smoking, setSmoking] = useState("");
    const [pet, setPet] = useState("");
    const [gender, setGender] = useState("");

    const [loader, showLoader, hideLoader] = useFullPageLoader();

    let history = useHistory();

    useEffect(() => {
        async function getPosts() {
            showLoader();
            Axios.get(
                configData.SERVER_URL +
                    `posts?search=${searchTerm}&location=${location}&pricefrom=${startPrice}&priceto=${endPrice}&parking=${parking}&smoking=${smoking}&pet=${pet}&gender=${gender}`
            )
                .then((response) => {
                    hideLoader();
                    setListOfPosts(response.data.results);
                })
                .catch((error) => {
                    // Error
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the
                        // browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                });
        }
        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, location, startPrice, endPrice, parking, smoking, pet, gender]);

    const submit = (e) => {
        e.preventDefault();
        setSearchTerm(search);
        setStartPrice(price1);
        setEndPrice(price2);
    };
    const style = { width: "32px", height: "32px" };
    const iconstyle = {
        padding: "9px 16px 0px 16px",
        width: "42px",
        height: "42px",
    };
    return (
        <div>
            {Cookies.get("token") && !Cookies.get("admin") && <GetNoti />}

            <div className="home">
                <Link data-tip="Look for Roommates" className="search-icon-resp" to="/roommates">
                    <lord-icon
                        src="https://cdn.lordicon.com/gmzxduhd.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#ffffff"
                        stroke="100"
                        style={iconstyle}
                    ></lord-icon>
                </Link>
                <form className="search" onSubmit={submit}>
                    <Link data-tip="Look for Roommates" className="search-icon" to="/roommates">
                        <lord-icon
                            src="https://cdn.lordicon.com/gmzxduhd.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#ffffff"
                            stroke="100"
                            style={iconstyle}
                        ></lord-icon>
                    </Link>

                    <div className="filter-toggle">
                        <label className="collapse" data-tip="Filters" htmlFor="_2">
                            <UseAnimations animation={menu4} size={45} className="filter-icon" />
                        </label>
                        <input id="_2" type="checkbox" />

                        <div className="filter-container">
                            <div className="search-text-price-resp">
                                <div className="filter-heading">Select Price</div>
                                <input
                                    className="search-price"
                                    type="number"
                                    placeholder="Start Price ($)"
                                    value={price1}
                                    onChange={(e) => setPrice1(e.target.value)}
                                />
                                <input
                                    className="search-price"
                                    type="number"
                                    placeholder="End Price ($)"
                                    value={price2}
                                    onChange={(e) => setPrice2(e.target.value)}
                                />
                            </div>
                            <div className="filter-location">
                                <div className="filter-heading">Select Location</div>
                                <Location location={setLocation} />
                            </div>
                            <div className="filter-location">
                                <div className="filter-heading">Select Gender</div>
                                <Gender gender={setGender} />
                            </div>
                            <div className="">
                                <div className="filter-heading">Select Preferences</div>
                                <RoomPref parking={setParking} pet={setPet} smoking={setSmoking} />
                            </div>
                        </div>
                    </div>
                    <ReactTooltip className="tooltip" place="bottom" type="dark" effect="solid" />

                    <input
                        type="text"
                        className="search-text"
                        placeholder="Search a Room . . . "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="search-text-price">
                        <input
                            className="search-price"
                            type="number"
                            placeholder="Start Price ($)"
                            value={price1}
                            onChange={(e) => setPrice1(e.target.value)}
                        />
                        <input
                            className="search-price"
                            type="number"
                            placeholder="End Price ($)"
                            value={price2}
                            onChange={(e) => setPrice2(e.target.value)}
                        />
                    </div>
                    <input className="search-button" type="submit" value="Search" />
                </form>

                {Cookies.get("token") && Cookies.get("username") && <Suggested />}

                <div className="post-listings">
                    <div className="post-container">
                        {loader}
                        {listOfPosts &&
                            listOfPosts
                                .slice(0)
                                .reverse()
                                .map((value, key) => {
                                    value.created_date = new Date(value.created_date).toDateString();
                                    return (
                                        <div key={value.id} className="post-card">
                                            <LazyLoadImage
                                                alt={"Missing"}
                                                className="post-image"
                                                src={configData.SERVER_URL + `files/download?name=${value.photo}`}
                                                onClick={() => {
                                                    history.push(`/post/${value.id}`);
                                                }}
                                            />

                                            <div className="post-price-container">
                                                <div className="post-price">${value.price}</div>
                                            </div>
                                            {/* only admin can delete any posts */}
                                            {Cookies.get("token") && Cookies.get("admin") && <DeleteRoom id={value.id} />}
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
                                    );
                                })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rooms;
