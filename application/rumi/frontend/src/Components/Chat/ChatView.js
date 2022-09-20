import React from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { RiSendPlaneFill } from "react-icons/ri";
import { Scrollbars } from "react-custom-scrollbars";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const style = { width: "50%", height: "50%", marginLeft: "10px", marginTop: "-5px" };
const stylebtn = { marginTop: "10px" };
const scroll = { height: "100vh" };

class ChatViewComponent extends React.Component {
    componentDidMount = () => {
        const container = document.getElementById("chatview-container");
        if (container) container.scrollIntoView({ behavior: "smooth", block: "end" });
    };
    componentDidUpdate = () => {
        const container = document.getElementById("chatview-container");
        if (container) container.scrollIntoView({ behavior: "smooth", block: "end" });
    };
    constructor() {
        super();
        this.state = {
            chatText: "",
        };
    }
    render() {
        if (this.props.chat === undefined) {
            return (
                <div className="chat-view-container chat-view-container-empty">
                    <RiQuestionAnswerLine style={style} />
                </div>
            );
        } else {
            return (
                <div className="chat-view-container">
                    <div className="chat-view-container-wrapper">
                        <Scrollbars
                            style={scroll} // This will activate auto hide
                            autoHide
                            // Hide delay in ms
                            autoHideTimeout={2000}
                            // Duration for hide animation in ms.
                            autoHideDuration={200}
                        >
                            <div id="chatview-container" className="msg">
                                {this.props.chat.messages.map((_msg, _index) => {
                                    return (
                                        <div key={_index} className={_msg.sender === this.props.user ? "sent" : "received"}>
                                            {_msg.message}
                                        </div>
                                    );
                                })}
                            </div>
                        </Scrollbars>
                    </div>

                    <div className="chat-input">
                        <input
                            placeholder="Type your message.."
                            onKeyUp={(e) => this.userTyping(e)}
                            id="chattextbox"
                            className="chat-input-send"
                            onFocus={this.userClickedInput}
                        ></input>
                        <button onClick={this.submitMessage} className="chat-btn-send">
                            <RiSendPlaneFill style={stylebtn} />
                        </button>
                    </div>
                </div>
            );
        }
    }
    userTyping = (e) => (e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value }));
    messageValid = (txt) => txt && txt.replace(/\s/g, "").length;
    userClickedInput = () => this.props.userClickedInputFn();
    submitMessage = () => {
        if (this.messageValid(this.state.chatText)) {
            this.props.submitMessageFn(this.state.chatText);
            document.getElementById("chattextbox").value = "";
        }
    };
}

export default ChatViewComponent;
