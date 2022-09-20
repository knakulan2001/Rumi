import React from "react";
import Avatar from "react-avatar";
import { VscBellDot } from "react-icons/vsc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
import "./Chat.css";
const stylenoti = { marginTop: "10px", width: "35px", height: "35px", color: "#1da699" };
const customId = " ";
class ChatListComponent extends React.Component {
    iconstyle = {
        padding: "15px 20px 15px 20px",
        width: "60px",
        height: "60px",
    };

    iconstyle2 = {
        padding: "15px 20px 15px 20px",
        width: "60px",
        height: "60px",
    };
    render() {
        if (this.props.chats.length > 0) {
            return (
                <div>
                    <div onClick={this.newChat} className="chat-btn-resp" data-tip="New Message">
                        <lord-icon
                            src="https://cdn.lordicon.com/zpxybbhl.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#ffffff"
                            stroke="100"
                            style={this.iconstyle2}
                        ></lord-icon>
                    </div>
                    <div className="chatList-container-cont">
                        <div onClick={this.newChat} className="chat-btn" data-tip="New Message">
                            <lord-icon
                                src="https://cdn.lordicon.com/zpxybbhl.json"
                                trigger="hover"
                                colors="primary:#ffffff,secondary:#ffffff"
                                stroke="100"
                                style={this.iconstyle}
                            ></lord-icon>
                        </div>
                        <ReactTooltip className="tooltip" place="bottom" type="dark" effect="solid" />
                        <div className="chatlist-container">
                            <ul id="chat-list">
                                {this.props.chats.map((_chat, _index) => {
                                    return (
                                        <div key={_index}>
                                            <li
                                                onClick={() => this.selectChat(_index)}
                                                className={`segmentsList${
                                                    this.props.selectedChatIndex === _index ? " selected" : ""
                                                }`}
                                            >
                                                <div>
                                                    <Avatar
                                                        className="menu-profile"
                                                        name={
                                                            _chat.users
                                                                .filter((_user) => _user !== this.props.userEmail)[0]
                                                                .split("")[0]
                                                        }
                                                        round
                                                        size="60px"
                                                        color="white"
                                                    />
                                                </div>
                                                <div>
                                                    <div>{_chat.users.filter((_user) => _user !== this.props.userEmail)[0]}</div>
                                                </div>
                                                {_chat.receiverHasRead === false && !this.userIsSender(_chat) ? (
                                                    <div>
                                                        <VscBellDot style={stylenoti} />
                                                        {toast.info(`You Have Unread Messages`, {
                                                            position: "top-right",
                                                            autoClose: 4000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            closeButton: false,
                                                            progress: 0,
                                                            toastId: customId,
                                                        })}
                                                    </div>
                                                ) : null}
                                            </li>
                                        </div>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="">
                    <button variant="contained" fullWidth color="primary" onClick={this.newChat} className="chat-btn">
                        New Message
                    </button>
                </div>
            );
        }
    }
    userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
    newChat = () => this.props.newChatBtnFn();
    selectChat = (index) => this.props.selectChatFn(index);
}

export default ChatListComponent;
