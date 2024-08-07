import React, { useState, useRef } from "react"
import axios from "axios"
import Send from "../../assets/chatbot/Send.svg"
import { ReactComponent as BackArrow } from "../../assets/auth/register/BackArrow.svg"
import { useNavigate } from "react-router-dom"
import MyChat from "./components/MyChat"
import PromptChat from "./components/PromptChat"
import Loading from "../../assets/chatbot/Loading.gif"

const Chatbot = () => {
  const navigate = useNavigate()

  const inputRef = useRef()
  const [loading, setLoading] = useState(false)
  const [promptList, setPromptList] = useState([])

  const sendPrompt = () => {
    const prompt = inputRef.current.value
    inputRef.current.value = ""

    setLoading(true)
    setPromptList((_prompt_list) => [
      ..._prompt_list,
      { prompt: prompt, sender: "my" },
    ])

    bedrockChatBot(prompt)
  }

  const bedrockChatBot = async (prompt) => {
    try {
      const res = await axios.post(
        "https://1tkp46p8s0.execute-api.ap-northeast-2.amazonaws.com/default/bedrock-chatbot",
        {
          prompt: prompt,
        }
      )

      setPromptList((_prompt_list) => [
        ..._prompt_list,
        { prompt: res.data.body, sender: "bot" },
      ])
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-padding">
        <div className="chat-header">
          <BackArrow className="chat-backarrow" onClick={() => navigate(-1)} />
          <div className="chat-title">챗봇</div>
        </div>
        {promptList?.map((prompt, index) => (
          <div>
            {prompt.sender === "bot" ? (
              <PromptChat
                key={index}
                time={"오후 05:26"}
                message={prompt.prompt}
              ></PromptChat>
            ) : (
              <MyChat
                key={index}
                time={"오후 05:26"}
                message={prompt.prompt}
              ></MyChat>
            )}
          </div>
        ))}
      </div>
      <div className="chat-bottom">
        <div className="chat-input-box">
          <div className="chat-flex">
            <input className="chat-input" ref={inputRef}></input>
            <img
              className="chat-send-image"
              src={Send}
              onClick={() => sendPrompt()}
            ></img>
          </div>
        </div>
      </div>
      {loading && (
        <div className="chat-loading-box">
          <div className="chat-loading-content">
            <img className="chat-loading-dot" src={Loading}></img>
            <div className="chat-loading-message">
              열심히 대답을 적고 있어요
              <br />
              조금만 기다려 주세요
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot
