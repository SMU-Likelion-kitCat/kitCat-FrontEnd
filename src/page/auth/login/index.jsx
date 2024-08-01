import React, { useEffect, useState } from "react"
import { ReactComponent as LostArrow } from "../../../assets/auth/LostArrow.svg"
import { ReactComponent as TitleLogo } from "../../../assets/TitleLogo.svg"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../../api"
import { logout, resetAuthState, setToken } from "../../../redux/auth"
import { resetLocationState } from "../../../redux/location"

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  })
  const [buttonActive, setButtonActive] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const location = useSelector((state) => state.location)

  useEffect(() => {
    if (auth.nickname !== "" || location.longitude !== null) {
      dispatch(logout())
      dispatch(resetAuthState())
      dispatch(resetLocationState())
      dispatch({ type: "RESET_ALL_STATE" }) // 전체 상태 초기화
      console.log("상태 초기화 완료", auth, location)
    }
  }, [dispatch, auth.nickname, location.longitude])

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setLoginInput((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleLogin = async () => {
    try {
      const accessToken = await loginUser(loginInput)

      setButtonActive(true)
      dispatch(setToken(accessToken))
      navigate("/walk")
      console.log("로그인 성공")
    } catch (e) {
      console.error("로그인 실패", e)
      setButtonActive(true)

      setTimeout(() => {
        setButtonActive(false) // 0.5초 동안 활성화 되었다가 다시 비활성화
      }, 500)
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

        <div className="auth-login-lost-p">
          비밀번호를 잊어버리셨나요?
          <div className="auth-login-lost-logo-background">
            <LostArrow />
          </div>
        </div>
      </div>
      <button
        className={`auth-login-button ${buttonActive ? "active" : ""}`}
        onClick={handleLogin}
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
