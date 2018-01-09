import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import socket from '../Socket.jsx';
import {connect} from 'react-redux';
import receiveMessage from '../store/actions.jsx';

class ChatMessage extends React.Component {
    render() {
        return (
            <li className="chat-message">{this.props.message}</li>
        );
    }
}

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
        this.handleChatMessage = this.handleChatMessage.bind(this);
        this.onMessageSent = this.onMessageSent.bind(this);

        socket.io.on('message_sent', this.onMessageSent);
    }

    onMessageSent(message) {
        this.props.dispatch(receiveMessage(message))
    }

    handleChatMessage(event) {
        event.preventDefault();
        socket.send_chat_message(this.state.message);
        this.setState({message: ''});
    }

    handleChatMessageChange(event) {
        this.setState({message: event.target.value});
    }

    render() {
        const chatMessages = this.props.messages.map((message, index) => <ChatMessage key={index} message={message}/>);

        return (
            <div id="chat">
                <ul id="messages">
                    {chatMessages}
                </ul>
                <div id="chat-form" className="fl">
                    <form onSubmit={this.handleChatMessage} className="chat-form">
                        <TextField hintText="Message" value={this.state.message} onChange={this.handleChatMessageChange}
                                   className="fl-grow"/>
                        <IconButton onClick={this.handleChatMessage}><FontIcon
                            className="material-icons">send</FontIcon></IconButton>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {messages: state.messages};
};

export default Chat = connect(mapStateToProps)(Chat);