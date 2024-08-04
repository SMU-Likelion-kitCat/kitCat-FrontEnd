import React, { useState, useEffect } from "react"
import { loginUserInfo, petInfo } from "../../../api"
import { ReactComponent as PetChange } from "../../../assets/mypage/PetChange.svg"
import { ReactComponent as Bell } from "../../../assets/mypage/Bell.svg"
import { ReactComponent as Notice } from "../../../assets/mypage/Notice.svg"
import { ReactComponent as Person } from "../../../assets/mypage/Person.svg"
import { ReactComponent as More } from "../../../assets/mypage/More.svg"
import { ReactComponent as Next } from "../../../assets/mypage/Next.svg"
import { ReactComponent as QuestionMark } from "../../../assets/mypage/QuestionMark.svg"
import { useNavigate } from "react-router-dom"

const MyPageMain = () => {
  const [userInfo, setUserInfo] = useState({})
  const [petInfos, setPetInfos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 유저 정보 가져오기
        const userRes = await loginUserInfo()
        console.log("유저 정보", userRes)
        setUserInfo(userRes)
      } catch (error) {
        console.error("유저 정보를 가져오는 데 실패했습니다.", error)
      }
    }

    const fetchPetInfo = async () => {
      try {
        // 펫 정보 가져오기
        const petRes = await petInfo()
        console.log("펫 정보", petRes)
        setPetInfos(petRes)
      } catch (error) {
        console.error("펫 정보를 가져오는 데 실패했습니다.", error)
      }
    }

    fetchUserInfo()
    fetchPetInfo()
  }, [])

  return (
    <>
      <div className="mypage-content-container">
        <div className="mypage-content-header">
          <h1 className="mypage-content-title">
            {userInfo.nickname}님
            <br />
            안녕하세요!
          </h1>
          <button
            className="mypage-content-title-button"
            onClick={() => navigate("/mypage/edit")}
          >
            프로필 수정
          </button>
        </div>

        <div className="mypage-content-bmi-container">
          나의 체질량 지수 (BMI)
          <div className="mypage-content-bmi-text">
            표준 <span>{userInfo.bmi}</span>
          </div>
        </div>

        <div className="mypage-content-pet-container">
          <div className="mypage-content-pet-header">
            <div className="mypage-content-pet-text">
              우리 아이<span>{petInfos.length}</span>
            </div>
            <span>
              <PetChange
                onClick={() => navigate("/mypage/pet", { state: { petInfos } })}
              />
            </span>
          </div>

          <div className="mypage-content-pet-body-wrapper">
            {petInfos.length > 0 ? (
              petInfos.map((pet, index) => (
                <div key={index} className="mypage-content-pet-body">
                  <div className="mypage-content-pet-image">
                    <img
                      src={`${process.env.REACT_APP_S3_URL}/${pet.image}`}
                      alt={pet.name}
                    />
                  </div>
                  <div className="mypage-content-pet-text">
                    <p className="mypage-content-pet-name">{pet.name}</p>
                    <p className="mypage-content-pet-weight">{pet.weight}kg</p>
                  </div>
                </div>
              ))
            ) : (
              <div>강아지 정보가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
      <hr />

      <ul className="mypage-menu-container">
        <li>
          <p>
            <Person />
            회원 정보 설정
          </p>
          <Next />
        </li>
        <li>
          <p>
            <Bell />
            알림 설정
          </p>
          <Next />
        </li>
        <li>
          <p>
            <Notice />
            공지사항
          </p>
          <Next />
        </li>
        <li>
          <p>
            <QuestionMark />
            자주 묻는 질문
          </p>
          <Next />
        </li>
        <li>
          <p>
            <More />
            약관 및 정책
          </p>
          <Next />
        </li>
      </ul>
    </>
  )
}

export default MyPageMain
