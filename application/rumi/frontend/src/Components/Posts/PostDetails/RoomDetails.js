import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./PostDetails.css";
import { Link } from "react-router-dom";
import MapContainer from "../../Map/MapContainer.js";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineCaretRight } from "react-icons/ai";
import configData from "../../../Configs/config.json";
import { AiOutlineCaretLeft } from "react-icons/ai";
import useFullPageLoader from "../../../Helpers/Loader/UseLoader";
import { DeleteComment } from "../Delete-Edit-Save/DeleteComment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Share from "../../../Helpers/Share/Share";

function RoomDetails() {
    let history = useHistory();
    let { id } = useParams();
    const [postObject, setPostObject] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const url = window.location.href;
    useEffect(() => {
        showLoader();
        Axios.get(configData.SERVER_URL + `posts?id=${id}`)
            .then((response) => {
                hideLoader();
                setPostObject(response.data.results);
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

        Axios.get(configData.SERVER_URL + `comments?post_id=${id}`)
            .then((response) => {
                setComments(response.data.results);
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

    const addComment = () => {
        Axios.post(configData.SERVER_URL + "comments", {
            text: newComment,
            post_id: id,
            creator_id: Cookies.get("loggedUserid"),
        })
            .then(() => {
                window.location.reload(); //comments dont update untill page is reloaded
                const commentToAdd = { text: newComment };
                setComments([...comments, commentToAdd]);
                setNewComment("");
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

    const style = { width: "37px", height: "37px" };
    return (
        <div className="room-container">
            {loader}
            <div className="back-link">
                <span className="addText">Go Back</span>
                <AiOutlineCaretLeft style={style} className="room-back-button" onClick={() => history.goBack()} />
            </div>

            {postObject.map(
                (value, key) => (
                    // eslint-disable-next-line no-sequences
                    (value.created_date = new Date(value.created_date).toDateString()),
                    (
                        <div className="room-detail-container" key={value.id}>
                            <div className="room-post-container">
                                <div className="room-post-card">
                                    <img
                                        className="room-post-image"
                                        src={configData.SERVER_URL + `files/download?name=${value.photo}`}
                                        alt="Missing"
                                    />
                                </div>
                                <div className="room-comments-container room-comments-container-resp">
                                    <div className="messages">
                                        <div className="nocomm">No Comments Yet!</div>
                                        {comments
                                            ? comments
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
                                                                  <div className="date-posted">{comment.created_date}</div>
                                                                  <div className="comment-text">- {comment.text}</div>
                                                                  {Cookies.get("token") && Cookies.get("admin") && (
                                                                      <DeleteComment commentid={comment.id} />
                                                                  )}
                                                              </div>
                                                          )
                                                      )
                                                  )
                                            : null}
                                    </div>

                                    {Cookies.get("token") && Cookies.get("username") && (
                                        <div className="enter-comments-container">
                                            <input
                                                className="comment-input"
                                                type="text"
                                                placeholder="Comment Here..."
                                                autoComplete="off"
                                                value={newComment}
                                                onChange={(event) => {
                                                    setNewComment(event.target.value);
                                                }}
                                            />

                                            <button onClick={addComment} className="comment-button">
                                                <AiOutlineCaretRight />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <label className="collapse-comments" data-tip="Filters" htmlFor="_2">
                                    Show Comments
                                </label>
                                <input id="_2" type="checkbox" />

                                <div className="room-comments-container">
                                    <div className="messages">
                                        <div className="nocomm">No Comments Yet!</div>
                                        {comments
                                            ? comments
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
                                                                  <div className="date-posted">{comment.created_date}</div>
                                                                  <div className="comment-text">- {comment.text}</div>
                                                                  {Cookies.get("token") && Cookies.get("admin") && (
                                                                      <DeleteComment commentid={comment.id} />
                                                                  )}
                                                              </div>
                                                          )
                                                      )
                                                  )
                                            : null}
                                    </div>

                                    {Cookies.get("token") && Cookies.get("username") && (
                                        <div className="enter-comments-container">
                                            <input
                                                className="comment-input"
                                                type="text"
                                                placeholder="Comment Here..."
                                                autoComplete="off"
                                                value={newComment}
                                                onChange={(event) => {
                                                    setNewComment(event.target.value);
                                                }}
                                            />

                                            <button onClick={addComment} className="comment-button">
                                                <AiOutlineCaretRight />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="room-info-container">
                                <div className="room-info-container-caption">{value.caption}</div>
                                <div className="room-info-container-desc">{value.description}</div>
                                <div className="room-info-container-price">
                                    Starting from <span className="user-info-highlight">${value.price}</span>
                                </div>
                                <div className="room-info-main-cont">
                                    <div>
                                        Posted by:{" "}
                                        <Link className="posted-by" to={`/user/${value.creator_id}`}>
                                            {value.username}
                                        </Link>
                                    </div>
                                    <div style={{ marginTop: "10px", marginBottom: "20px" }}>Posted on: {value.created_date}</div>

                                    <Share siteurl={url} />

                                    {Cookies.get("token") && Cookies.get("username") !== value.username && (
                                        <CopyToClipboard text={url}>
                                            <Link className="offer-button" to={`/chat/${value.email}`}>
                                                Offer
                                            </Link>
                                        </CopyToClipboard>
                                    )}
                                    {!Cookies.get("token") && !Cookies.get("username") && (
                                        <Link className="offer-button" to={`/chat/${value.email}`}>
                                            Offer
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="map">
                                <MapContainer location={value.location} />
                            </div>
                        </div>
                    )
                )
            )}
        </div>
    );
}

export default RoomDetails;
