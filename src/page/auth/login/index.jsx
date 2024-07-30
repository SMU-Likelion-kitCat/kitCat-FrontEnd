// import React, { useState } from "react"
// import { ReactComponent as LostArrow } from "../../../assets/auth/LostArrow.svg"
// import { useNavigate } from "react-router-dom"
// import { loginUser } from "../../../api"

// const Login = () => {
//   const [loginInput, setLoginInput] = useState({
//     email: "",
//     password: "",
//   })
//   const [buttonActive, setButtonActive] = useState(false)

//   const onChangeInput = (e) => {
//   const {name, value}= e.target
//     [name]:value
//   }

//   const buttonActiveState = async () => {
//     setButtonActive(!buttonActive)
//     const accessToken = await loginUser()
//   }

//   const navigete = useNavigate()
//   return (
//     <div className="auth-login-container">
//       <div className="auth-login-logo-container">
//         <div className="auth-login-logo" />
//       </div>
//       <h1 className="auth-login-title">
//         우리 강아지와 함께
//         <br />
//         달려보세요!
//       </h1>
//       <div className="auth-login-input-container">
//         <input
//           className="auth-login-input"
//           type="email"
//           name="email"
//           placeholder="아이디 (이메일) 입력"
//         />
//         <input
//           className="auth-login-input"
//           type="password"
//           name="password"
//           placeholder="비밀번호 입력"
//         />

//         <p className="auth-login-lost-p">
//           비밀번호를 잊어버리셨나요?
//           <div className="auth-login-lost-logo-background">
//             <LostArrow />
//           </div>
//         </p>
//       </div>
//       <button
//         className={`auth-login-button ${buttonActive ? "active" : ""}`}
//         onClick={buttonActiveState}
//       >
//         로그인
//       </button>
//       <button
//         className="auth-login-navigate-register-button"
//         onClick={() => navigete("/auth/register")}
//       >
//         이메일 회원가입
//       </button>
//     </div>
//   )
// }

// export default Login

import React, { useState } from "react"
import { ReactComponent as LostArrow } from "../../../assets/auth/LostArrow.svg"
import { ReactComponent as TitleLogo } from "../../../assets/TitleLogo.svg"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "../../../api"
import { setToken } from "../../../redux/auth"

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  })
  const [buttonActive, setButtonActive] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setLoginInput((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleLogin = async () => {
    setButtonActive((prev) => !prev)

    if (!buttonActive) return

    try {
      const accessToken = await loginUser(loginInput)
      dispatch(setToken(accessToken))
      navigate("/walk")
      console.error("로그인 성공")
    } catch (e) {
      console.error("로그인 실패", e)
    }
  }

  return (
    <div className="auth-login-container">
      <div className="auth-login-logo-container">
        <div className="auth-login-logo">
          <TitleLogo />
        </div>
        <></>
      </div>
      <h1 className="auth-login-title">
        우리 강아지와 함께
        <br />
        달려보세요!
      </h1>
      <div className="auth-login-input-container">
        <input
          className="auth-login-input"
          type="email"
          name="email"
          placeholder="아이디 (이메일) 입력"
          value={loginInput.email}
          onChange={onChangeInput}
        />
        <input
          className="auth-login-input"
          type="password"
          name="password"
          placeholder="비밀번호 입력"
          value={loginInput.password}
          onChange={onChangeInput}
        />

        <p className="auth-login-lost-p">
          비밀번호를 잊어버리셨나요?
          <div className="auth-login-lost-logo-background">
            <LostArrow />
          </div>
        </p>
      </div>
      <button
        className={`auth-login-button ${buttonActive ? "active" : ""}`}
        onClick={handleLogin}
        // disabled={!buttonActive}
      >
        로그인
      </button>
      <button
        className="auth-login-navigate-register-button"
        onClick={() => navigate("/auth/register")}
      >
        이메일 회원가입
      </button>
    </div>
  )
}

export default Login
