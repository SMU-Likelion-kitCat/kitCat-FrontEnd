import React from "react";
import ChatBot from "../../../assets/chatbot/ChatBot.svg"

const PromptChat = ({time, message}) => {
    return (
        <div className="chat-prompt-bubble">
            <img className="chat-prompt-image" src={ChatBot}></img>
            <div className="chat-prompt-text">{message}</div>
            <div className="chat-prompt-time">{time}</div>
        </div>
    );
}

export default PromptChat;