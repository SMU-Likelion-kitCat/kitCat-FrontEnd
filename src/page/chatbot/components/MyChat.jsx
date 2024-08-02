import React from "react";

const MyChat = ({time, message}) => {
    return (
        <div className="chat-my-bubble">
            <div className="chat-my-time">{time}</div>
            <div className="chat-my-text">{message}</div>
        </div>
    );
};

export default MyChat;