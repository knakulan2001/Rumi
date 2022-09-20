import { React, useRef, useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import Avatar from "react-avatar";
import configData from "../../Configs/config.json";
import Axios from "axios";

const Navbar = () => {
    let history = useHistory();
    let logged = Cookies.get("logged");
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const [userObject, setUserObject] = useState([]);

    useEffect(() => {
        const getPhoto = async () => {
            await Axios.get(configData.SERVER_URL + `users?id=${Cookies.get("loggedUserid")}`)
                .then((response) => {
                    setUserObject(response.data.results);
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
        getPhoto();
    }, []);

    const onClick = () => setIsActive(!isActive);

    const logout = () => {
        history.push("/");
        window.location.reload();
        firebase.auth().signOut();
        Cookies.remove("username");
        Cookies.remove("loggedUserid");
        Cookies.remove("logged");
        Cookies.remove("admin");
        Cookies.remove("token");
        Cookies.remove("csid");
    };
    const style = { width: "30px", height: "30px", marginLeft: "10px", marginTop: "-5px" };
    const iconstyle = {
        padding: "0px 0px 10px 0px",
        width: "42px",
        height: "42px",
    };
    return (
        <div>
            <div>
                <div className="demo-only">SFSU Software Engineering Project CSC 648-848, Fall 2021. For Demonstration Only</div>
                <div className="navbar">
                    <div id="resp-nav-links">
                        <Link className="nav-links" to="/">
                            Home
                        </Link>
                        <Link className="nav-links" to="/team">
                            About
                        </Link>
                    </div>
                    <div className="logo-div">
                        <Link to="/">
                            <div className="logo"></div>
                            RUMI
                        </Link>
                    </div>
                    <div className="resp-nav-links2">
                        {logged ? (
                            <>
                                <Link id="resp-nav-links" className="nav-links" to="/createpost">
                                    Create
                                </Link>
                                <div id="nav" className="nav-links-margin">
                                    <div className="menu-container">
                                        <button onClick={onClick} className="menu-trigger">
                                            {userObject &&
                                                userObject.map((value, key) => {
                                                    return (
                                                        <div key={value.id}>
                                                            <Avatar
                                                                className="menu-profile"
                                                                name={Cookies.get("username")[0].split("")[0]}
                                                                round
                                                                size="65px"
                                                                color="white"
                                                                src={configData.SERVER_URL + `files/download?name=${value.photo}`}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                        </button>
                                        <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                                            <ul>
                                                <li className="username-nav">
                                                    <span>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/dxjqoygy.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff,secondary:#ffffff"
                                                            stroke="100"
                                                            scale="50"
                                                            style={iconstyle}
                                                        />
                                                        {Cookies.get("username")}
                                                    </span>
                                                </li>
                                                <li>
                                                    <Link to={`/user/${Cookies.get("loggedUserid")}`} className="nav-links">
                                                        <div className="menu-trigger-option">
                                                            Dashboard
                                                            <BiUser style={style} />
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={`/chat`} className="nav-links">
                                                        <div className="menu-trigger-option">
                                                            Chat
                                                            <RiQuestionAnswerLine style={style} />
                                                        </div>
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link to="/" className="nav-links" onClick={logout}>
                                                        <div className="menu-trigger-option">
                                                            Logout
                                                            <MdOutlineLogout style={style} />
                                                        </div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link id="register-link" className="nav-links" to="/register">
                                    SignUp
                                </Link>
                                <Link id="login-link" className="nav-links" to="/login">
                                    LogIn
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
