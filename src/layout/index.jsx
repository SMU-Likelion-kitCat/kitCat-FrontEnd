import React, { useState, createContext, useContext } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import { ReactComponent as ChatBotIcon } from "../assets/ChatBotIcon.svg"

// 레이아웃에 필요한 context 설정
const FooterVisibilityContext = createContext()
const ChatbotVisibilityContext = createContext()

export const useFooterVisibility = () => useContext(FooterVisibilityContext)
export const useChatbotVisibility = () => useContext(ChatbotVisibilityContext)

const Layout = () => {
  const [showFooter, setShowFooter] = useState(true)
  const [showChatbot, setShowChatbot] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  // footer가 표시되지 않아야 하는 경로 정의
  const noFooterPaths = [
    "/",
    "/auth",
    "/auth/login",
    "/auth/register",
    "/auth/register/info",
    "/routine/ongoing",
    "/routine/ongoing:id",
    "/routine/create",
    "/chatbot",
  ]

  const footerVisible =
    showFooter && !noFooterPaths.some((path) => location.pathname === path)

  // showFooter true이고 noFooterPaths에 정의되지 않았을 때, footer가 표시
  const footerPathsWithNoFooterLayout = [
    "/",
    "/walk",
    "/auth",
    "/auth/login",
    "/auth/register",
    "/auth/register/info",
    "/routine/create",
    "/chatbot",
  ]
  const useNofooterLayout = footerPathsWithNoFooterLayout.some(
    (path) => location.pathname === path
  )

  // 챗봇 아이콘이 표시되지 않아야하는 경로 정의
  const noChatbotPaths = [
    "/",
    "/chatbot",
    "/auth",
    "/walk",
    "/walk/result",
    "/auth/login",
    "/auth/register",
    "/auth/register/info",
    "/routine/ongoing",
    "/routine/recommend",
  ]
  const chatbotVisible =
    showChatbot && !noChatbotPaths.some((path) => location.pathname === path)

  return (
    <FooterVisibilityContext.Provider value={{ showFooter, setShowFooter }}>
      <ChatbotVisibilityContext.Provider
        value={{ showChatbot, setShowChatbot }}
      >
        <div
          className={
            showFooter
              ? useNofooterLayout
                ? "nofooter-content-container"
                : "content-container"
              : "nofooter-content-container"
          }
        >
          <Outlet />
          {chatbotVisible && (
            <div
              className="chatbot-icon-container"
              onClick={() => navigate("/chatbot")}
            >
              <div className="chatbot-icon">
                <ChatBotIcon />
                챗봇
              </div>
            </div>
          )}
        </div>
        {footerVisible && (
          <footer className="footer-container">
            <Footer />
          </footer>
        )}
      </ChatbotVisibilityContext.Provider>
    </FooterVisibilityContext.Provider>
  )
}

export default Layout
