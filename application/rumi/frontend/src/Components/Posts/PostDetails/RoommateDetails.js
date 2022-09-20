import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import configData from "../../../Configs/config.json";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCaretLeft } from "react-icons/ai";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Avatar from "react-avatar";
import useFullPageLoader from "../../../Helpers/Loader/UseLoader";
import { GetFav } from "./GetFav";
import { DeleteComment } from "../Delete-Edit-Save/DeleteComment";
import { DeleteRoom } from "../Delete-Edit-Save/DeleteRoom";
import { Link } from "react-router-dom";
import Notification from "../../../Helpers/Notification/Notification";
import GetNoti from "../../../Helpers/Notification/GetNoti";
import EditProfile from "../Delete-Edit-Save/EditProfile";

function RoommateDetails() {
    let { id } = useParams();
    let history = useHistory();
    const [userObject, setUserObject] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [postCount, setPostCount] = useState([]);

    const [userComments, setUserComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState([]);

    const [userFav, setUserFav] = useState([]);
    const [favCount, setFavCount] = useState([]);

    const [loader, showLoader, hideLoader] = useFullPageLoader();

    useEffect(() => {
        showLoader();
        Axios.get(configData.SERVER_URL + `users?id=${id}`)
            .then((response) => {
                hideLoader();
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

        Axios.get(configData.SERVER_URL + `posts?creator_id=${id}`)
            .then((response) => {
                hideLoader();
                setUserPosts(response.data.results);
                setPostCount(response.data.message);
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

        Axios.get(configData.SERVER_URL + `comments?creator_id=${id}`)
            .then((response) => {
                hideLoader();
                setUserComments(response.data.results);
                setCommentsCount(response.data.message);
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

        Axios.get(configData.SERVER_URL + `favorites?saved_by=${id}`)
            .then((response) => {
                hideLoader();
                setUserFav(response.data.results);
                setFavCount(response.data.message);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const style = { width: "37px", height: "37px" };
    return (
        <div>
            {Cookies.get("token") && !Cookies.get("admin") && <GetNoti />}
            <div className="roommate-container">
                <div className="roommate-loading">{loader}</div>

                {userObject.map(
                    (value, key) => (
                        // eslint-disable-next-line no-sequences
                        (value.created_date = new Date(value.created_date).toDateString()),
                        (
                            <div key={value.id} className="user-container">
                                <div className="user-info-plus-back">
                                    <div className="back-link">
                                        <span className="addText">Go Back</span>
                                        <AiOutlineCaretLeft
                                            style={style}
                                            className="room-back-button"
                                            onClick={() => history.goBack()}
                                        />
                                    </div>
                                    <div className="user-info-container">
                                        <div className="user-info-main">
                                            <Avatar
                                                className="user-info-profile"
                                                name={value.username[0].split("")[0]}
                                                round
                                                size="240px"
                                                color="white"
                                                src={configData.SERVER_URL + `files/download?name=${value.photo}`}
                                            />
                                            <div className="user-info-main-main">
                                                {value.username} <span className="user-info-highlight">{value.last_name}</span>
                                            </div>
                                            <div className="user-info-main-desc">{value.description}</div>
                                        </div>
                                        <ul className="user-info-sub">
                                            <li className="user-info-sub-sub">
                                                Goes to <span className="user-info-highlight">{value.school}</span>.
                                            </li>
                                            <div className="user-filter-pref">
                                                {(() => {
                                                    // eslint-disable-next-line eqeqeq
                                                    if (value.pets == "1") {
                                                        return (
                                                            <li className="user-info-sub-sub">
                                                                Has a <span className="user-info-highlight">Pet</span>.
                                                            </li>
                                                        );
                                                    } else {
                                                        return <></>;
                                                    }
                                                })()}
                                                {(() => {
                                                    // eslint-disable-next-line eqeqeq
                                                    if (value.smoker == "1") {
                                                        return (
                                                            <li className="user-info-sub-sub">
                                                                Is a <span className="user-info-highlight">Smoker</span>.
                                                            </li>
                                                        );
                                                    } else {
                                                        return <></>;
                                                    }
                                                })()}
                                            </div>
                                        </ul>
                                        {Cookies.get("token") && Cookies.get("admin") && <Notification />}

                                        {Cookies.get("token") && Cookies.get("username") !== value.username && (
                                            <div className="user-info-main-cont">
                                                <Link className="offer-button" to={`/chat/${value.email}`}>
                                                    Contact
                                                </Link>
                                            </div>
                                        )}

                                        {!Cookies.get("token") && !Cookies.get("username") && (
                                            <div className="user-info-main-cont">
                                                <Link className="offer-button" to={`/chat/${value.email}`}>
                                                    Contact
                                                </Link>
                                            </div>
                                        )}

                                        <div>
                                            {Cookies.get("token") && Cookies.get("username") === value.username && (
                                                <EditProfile />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="user-info-posts-container">
                                    <div className="user-info-posts-heading">{value.username}'s </div>
                                    <Tabs>
                                        <TabList>
                                            <Tab>Posts</Tab>
                                            <Tab>Comments</Tab>
                                            {Cookies.get("token") && Cookies.get("username") === value.username && (
                                                <Tab>Favorites</Tab>
                                            )}
                                        </TabList>

                                        <TabPanel>
                                            <div>{postCount}</div>
                                            <div className="post-listings">
                                                <div className="user-info-container-posts">
                                                    {userPosts &&
                                                        userPosts
                                                            .slice(0)
                                                            .reverse()
                                                            .map((value, key) => {
                                                                value.created_date = new Date(value.created_date).toDateString();
                                                                return (
                                                                    <div key={value.id} className="post-card post-card-roommate">
                                                                        <img
                                                                            className="post-image"
                                                                            src={
                                                                                configData.SERVER_URL +
                                                                                `files/download?name=${value.photo}`
                                                                            }
                                                                            alt="Missing"
                                                                            onClick={() => {
                                                                                history.push(`/post/${value.id}`);
                                                                            }}
                                                                        />

                                                                        <div className="post-price-container">
                                                                            <div className="post-price">${value.price}</div>
                                                                        </div>
                                                                        {/* only logged in user can delete their posts */}
                                                                        {Cookies.get("token") &&
                                                                            Cookies.get("username") === value.username && (
                                                                                <DeleteRoom id={value.id} />
                                                                            )}
                                                                        <div
                                                                            className="post-info-container"
                                                                            onClick={() => {
                                                                                history.push(`/post/${value.id}`);
                                                                            }}
                                                                        >
                                                                            <div className="post-caption">{value.caption}</div>
                                                                            <div className="post-desc">{value.description}</div>
                                                                            <div className="post-date">{value.created_date}</div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div style={{ marginBottom: `50px` }}>{commentsCount}</div>
                                            {loader}
                                            <div>
                                                {userComments
                                                    ? userComments
                                                          .slice(0)
                                                          .reverse()
                                                          .map(
                                                              (comment, key) => (
                                                                  // eslint-disable-next-line no-sequences
                                                                  (comment.created_date = new Date(
                                                                      comment.created_date
                                                                      // eslint-disable-next-line no-sequences
                                                                  ).toDateString()),
                                                                  (
                                                                      <div id="message-" key={key}>
                                                                          <div className="author-text">@{comment.username}</div>
                                                                          <div className="date-posted">
                                                                              {comment.created_date}
                                                                          </div>
                                                                          <div
                                                                              className="comment-text"
                                                                              onClick={() => {
                                                                                  history.push(`/post/${comment.post_id}`);
                                                                              }}
                                                                              style={{ cursor: `pointer` }}
                                                                          >
                                                                              - {comment.text}
                                                                          </div>
                                                                          {Cookies.get("token") &&
                                                                              Cookies.get("username") === value.username && (
                                                                                  <DeleteComment commentid={comment.id} />
                                                                              )}
                                                                      </div>
                                                                  )
                                                              )
                                                          )
                                                    : null}
                                            </div>
                                        </TabPanel>
                                        {Cookies.get("token") && Cookies.get("username") === value.username && (
                                            <TabPanel>
                                                <div>{favCount}</div>
                                                <div className="user-info-container-posts">
                                                    {userFav &&
                                                        userFav
                                                            .slice(0)
                                                            .reverse()
                                                            .map((value, key) => {
                                                                value.created_date = new Date(value.created_date).toDateString();
                                                                return (
                                                                    <div key={value.id}>
                                                                        <GetFav key={key} id={value.post_id} />
                                                                    </div>
                                                                );
                                                            })}
                                                </div>
                                            </TabPanel>
                                        )}
                                    </Tabs>
                                </div>
                            </div>
                        )
                    )
                )}
            </div>
        </div>
    );
}

export default RoommateDetails;
