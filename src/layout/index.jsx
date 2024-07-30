import React, { useState, createContext, useContext } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Footer from "./Footer"

// footer 표시를 위한 컨텍스트 생성
const FooterVisibilityContext = createContext()

export const useFooterVisibility = () => useContext(FooterVisibilityContext)

const Layout = () => {
  const [showFooter, setShowFooter] = useState(true)
  const location = useLocation()

  // footer가 표시되지 않아야 하는 경로 정의
  const noFooterPaths = [
    "/",
    "/auth",
    "/auth/login",
    "/auth/register",
    "/auth/register/info",
    "/routine/ongoing",
    "/routine/ongoing:id",
  ]

  // showFooter true이고 noFooterPaths에 정의되지 않았을 때, footer가 표시
  const footerVisible =
    showFooter && !noFooterPaths.some((path) => location.pathname === path)

  // const useNofooterRoutineLayout = "/routine/".some((path) =>
  //   path.include(location.pathname)
  // )

  // nofooter-content-container로 표시되어야 하는 경로 정의
  const footerPathsWithNoFooterLayout = [
    "/",
    "/walk",
    "/auth",
    "/auth/login",
    "/auth/register",
    "/auth/register/info",
  ]
  const useNofooterLayout = footerPathsWithNoFooterLayout.some(
    (path) => location.pathname === path
  )

  return (
    <FooterVisibilityContext.Provider value={{ showFooter, setShowFooter }}>
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
      </div>
      {footerVisible && (
        <footer className="footer-container">
          <Footer />
        </footer>
      )}
    </FooterVisibilityContext.Provider>
  )
}

export default Layout
