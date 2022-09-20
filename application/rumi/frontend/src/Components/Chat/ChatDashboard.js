import React from "react";
import NewChatComponent from "./NewChat";
import ChatListComponent from "./ChatList";
import ChatViewComponent from "./ChatView";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import ScaleLoader from "react-spinners/ScaleLoader";

class DashboardComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            friends: [],
            chats: [],
            id: null,
        };
    }
    render() {
        if (this.state.email) {
            const id = this.props.match.params.id;
            if (id) {
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.id = id;
            }

            return (
                <div className="chat-dashboard-container" id="dashboard-container">
                    <ChatListComponent
                        history={this.props.history}
                        userEmail={this.state.email}
                        selectChatFn={this.selectChat}
                        chats={this.state.chats}
                        selectedChatIndex={this.state.selectedChat}
                        newChatBtnFn={this.newChatBtnClicked}
                    ></ChatListComponent>
                    {this.state.id || this.state.newChatFormVisible ? null : (
                        <ChatViewComponent
                            user={this.state.email}
                            chat={this.state.chats[this.state.selectedChat]}
                            userClickedInputFn={this.messageRead}
                            submitMessageFn={this.submitMessage}
                        ></ChatViewComponent>
                    )}
                    {this.state.newChatFormVisible || this.state.id ? (
                        <NewChatComponent
                            goToChatFn={this.goToChat}
                            newChatSubmitFn={this.newChatSubmit}
                            id={this.state.id}
                        ></NewChatComponent>
                    ) : null}
                </div>
            );
        } else {
            return (
                <div className="chat-loading">
                    <ScaleLoader height={50} width={8} radius={0} margin={2} color="#1da699" speedMultiplier={1.7} />
                    <div>Loading...</div>
                </div>
            );
        }
    }

    submitMessage = (msg) => {
        const docKey = this.buildDocKey(
            this.state.chats[this.state.selectedChat].users.filter((_usr) => _usr !== this.state.email)[0]
        );
        firebase
            .firestore()
            .collection("chats")
            .doc(docKey)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: this.state.email,
                    message: msg,
                    timestamp: Date.now(),
                }),
                receiverHasRead: false,
            });
    };

    // Always in alphabetical order:
    // 'user1:user2'
    buildDocKey = (friend) => [this.state.email, friend].sort().join(":");

    newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null });

    newChatSubmit = async (chatObj) => {
        const docKey = this.buildDocKey(chatObj.sendTo);
        await firebase
            .firestore()
            .collection("chats")
            .doc(docKey)
            .set({
                messages: [
                    {
                        message: chatObj.message,
                        sender: this.state.email,
                    },
                ],
                users: [this.state.email, chatObj.sendTo],
                receiverHasRead: false,
            });
        this.setState({ newChatFormVisible: false });
        this.selectChat(this.state.chats.length - 1);
    };

    selectChat = async (chatIndex) => {
        // eslint-disable-next-line no-useless-concat
        window.history.replaceState({}, document.title, "/" + "chat");
        this.props.match.params.id = null;
        await this.setState({ selectedChat: chatIndex, newChatFormVisible: false, id: null });
        this.messageRead();
    };

    goToChat = async (docKey, msg) => {
        const usersInChat = docKey.split(":");
        const chat = this.state.chats.find((_chat) => usersInChat.every((_user) => _chat.users.includes(_user)));
        this.setState({ newChatFormVisible: false });
        await this.selectChat(this.state.chats.indexOf(chat));
        this.submitMessage(msg);
    };

    messageRead = () => {
        const chatIndex = this.state.selectedChat;
        const docKey = this.buildDocKey(this.state.chats[chatIndex].users.filter((_usr) => _usr !== this.state.email)[0]);
        if (this.clickedMessageWhereNotSender(chatIndex)) {
            firebase.firestore().collection("chats").doc(docKey).update({ receiverHasRead: true });
        } else {
            console.log("Clicked message where the user was the sender");
        }
    };

    clickedMessageWhereNotSender = (chatIndex) =>
        this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async (_usr) => {
            if (!_usr) this.props.history.push("/login");
            else {
                await firebase
                    .firestore()
                    .collection("chats")
                    .where("users", "array-contains", _usr.email)
                    .onSnapshot(async (res) => {
                        const chats = res.docs.map((_doc) => _doc.data());
                        await this.setState({
                            email: _usr.email,
                            chats: chats,
                            friends: [],
                        });
                    });
            }
        });
    };
}

export default DashboardComponent;
