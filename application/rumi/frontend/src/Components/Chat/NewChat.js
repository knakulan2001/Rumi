import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

class NewChatComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            message: null,
        };
    }

    render() {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.username = this.props.id;
        return (
            <div className="">
                <div className="login-card">
                    <form className="form" noValidate>
                        <p className="form-heading">Send A Message!</p>
                        <input
                            className="form-input"
                            type="text"
                            name="username"
                            value={this.props.id}
                            placeholder="Enter Your Friend's Email"
                            onChange={(e) => this.userTyping("username", e)}
                            id="new-chat-username"
                        />

                        <textarea
                            className="form-input"
                            type="text"
                            name="password"
                            placeholder="Enter Your Message"
                            onChange={(e) => this.userTyping("message", e)}
                            id="new-chat-message"
                        />
                        <button className="form-input-btn" onClick={(e) => this.submitNewChat(e)} type="button">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    componentWillMount() {
        if (!firebase.auth().currentUser) this.props.history.push("/login");
    }

    userTyping = (inputType, e) => {
        switch (inputType) {
            case "username":
                this.setState({ username: e.target.value });
                break;

            case "message":
                this.setState({ message: e.target.value });
                break;

            default:
                break;
        }
    };

    submitNewChat = async (e) => {
        e.preventDefault();
        const userExists = await this.userExists();
        if (userExists) {
            const chatExists = await this.chatExists();
            chatExists ? this.goToChat() : this.createChat();
        } else {
            alert("this user doesn't exist.");
        }
    };

    buildDocKey = () => [firebase.auth().currentUser.email, this.state.username].sort().join(":");

    createChat = () => {
        this.props.newChatSubmitFn({
            sendTo: this.state.username,
            message: this.state.message,
        });
    };

    goToChat = () => this.props.goToChatFn(this.buildDocKey(), this.state.message);

    chatExists = async () => {
        const docKey = this.buildDocKey();
        const chat = await firebase.firestore().collection("chats").doc(docKey).get();

        return chat.exists;
    };
    userExists = async () => {
        const usersSnapshot = await firebase.firestore().collection("users").get();
        const exists = usersSnapshot.docs.map((_doc) => _doc.data().email).includes(this.state.username);
        this.setState({ serverError: !exists });
        return exists;
    };
}

export default NewChatComponent;
