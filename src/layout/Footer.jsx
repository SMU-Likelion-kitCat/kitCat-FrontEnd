import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { ReactComponent as CommunityLogo } from "../assets/footer/CommunityLogo.svg"

import { ReactComponent as HomeLogoActive } from "../assets/footer/HomeLogoActive.svg"

import { ReactComponent as RecordLogo } from "../assets/footer/RecordLogo.svg"
import { ReactComponent as RecordLogoActive } from "../assets/footer/RecordLogoActive.svg"
import { ReactComponent as RoutineLogo } from "../assets/footer/RoutineLogo.svg"

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <>
      <div className="footer-item" onClick={() => navigate("/routine")}>
        {isActive("/routine") ? <RoutineLogo /> : <RoutineLogo />}
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
      <div className="footer-item" onClick={() => navigate("/walk")}>
        {isActive("/walk") ? <HomeLogoActive /> : <HomeLogoActive />}
        <div
          className={
            isActive("/walk") ? "footer-item-title active" : "footer-item-title"
          }
        >
          산책
        </div>
      </div>
      <div className="footer-item" onClick={() => navigate("/community")}>
        {isActive("/community") ? <CommunityLogo /> : <CommunityLogo />}
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
        {isActive("/mypage") ? <RecordLogoActive /> : <RecordLogo />}
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
