import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { ReactComponent as CommunityLogo } from "../assets/footer/CommunityLogo.svg"
import { ReactComponent as CommunityLogoActive } from "../assets/footer/CommunityLogoActive.svg"

import { ReactComponent as WalkLogo } from "../assets/footer/WalkLogo.svg"
import { ReactComponent as WalkLogoActive } from "../assets/footer/WalkLogoActive.svg"

import { ReactComponent as RecordLogo } from "../assets/footer/RecordLogo.svg"
import { ReactComponent as RecordLogoActive } from "../assets/footer/RecordLogoActive.svg"

import { ReactComponent as MyPage } from "../assets/footer/MyPage.svg"
import { ReactComponent as MyPageActive } from "../assets/footer/MyPageActive.svg"

import { ReactComponent as RoutineLogo } from "../assets/footer/RoutineLogo.svg"
import { ReactComponent as RoutineLogoActive } from "../assets/footer/RoutineLogoActive.svg"

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <>
      <div className="footer-item" onClick={() => navigate("/walk")}>
        {isActive("/walk") ? <WalkLogoActive /> : <WalkLogo />}
        <div
          className={
            isActive("/walk") ? "footer-item-title active" : "footer-item-title"
          }
        >
          산책
        </div>
      </div>
      <div className="footer-item" onClick={() => navigate("/routine")}>
        {isActive("/routine") ? <RoutineLogoActive /> : <RoutineLogo />}
        <div
          className={
            isActive("/routine")
              ? "footer-item-title active"
              : "footer-item-title"
          }
        >
          루틴
        </div>
      </div>
      <div className="footer-item" onClick={() => navigate("/record")}>
        {isActive("/record") ? <RecordLogoActive /> : <RecordLogo />}

        <div
          className={
            isActive("/record")
              ? "footer-item-title active"
              : "footer-item-title"
          }
        >
          기록
        </div>
      </div>

      <div className="footer-item" onClick={() => navigate("/community")}>
        {isActive("/community") ? <CommunityLogoActive /> : <CommunityLogo />}
        <div
          className={
            isActive("/community")
              ? "footer-item-title active"
              : "footer-item-title"
          }
        >
          커뮤니티
        </div>
      </div>
      <div className="footer-item" onClick={() => navigate("/mypage")}>
        {isActive("/mypage") ? <MyPageActive /> : <MyPage />}
        <div
          className={
            isActive("/mypage")
              ? "footer-item-title active"
              : "footer-item-title"
          }
        >
          활동
        </div>
      </div>
    </>
  )
}

export default Footer
