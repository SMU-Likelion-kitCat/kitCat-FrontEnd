import React from "react"
import { useNavigate } from "react-router-dom"
import { registerUser, registerPet } from "../../../../../api"
import { useDispatch, useSelector } from "react-redux"
import { setToken } from "../../../../../redux/auth"

const InfoNextButton = ({ step, nextStep, signupInfo }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const handleNextStep = async () => {
    if (step === 5) {
      console.log(signupInfo)
      try {
        const userInfo = {
          nickname: signupInfo.nickname,
          email: signupInfo.email,
          password: signupInfo.password,
          height: signupInfo.height,
          weight: signupInfo.weight,
          bmi: signupInfo.bmi,
        }
        const accessToken = await registerUser(userInfo)
        console.log("회원가입 완료, 토큰:", accessToken)
        dispatch(setToken(accessToken))
        nextStep()
      } catch (e) {
        console.error(e)
      }
    } else if (step === 6) {
      try {
        const petInfoToRegister = signupInfo.petInfos.map((pet) => ({
          name: pet.name,
          weight: parseFloat(pet.weight),
          growthStatus: pet.petState,
        }))

        const formData = new FormData()
        formData.append(
          "dto",
          new Blob([JSON.stringify(petInfoToRegister)], {
            type: "application/json",
          })
        )

        signupInfo.petInfos.forEach((pet) => {
          if (pet.file) {
            formData.append("files", pet.file)
          }
        })

        console.log("FormData의 dto", formData.get("dto"))
        console.log("FormData의 files", formData.getAll("files"))

        const res = await registerPet(formData, auth.accessToken)
        console.log("반려견 등록 완료", res)
        navigate("/routine")
      } catch (e) {
        console.error("반려견 등록 실패", e.response || e)
      }
    } else {
      nextStep()
    }
  }

  const isNextButtonActive =
    step === 5
      ? signupInfo.height && signupInfo.weight
      : step === 6
      ? signupInfo.petInfos && signupInfo.petInfos.length > 0
      : true

  return (
    <button
      className={`auth-register-info-next-button ${
        isNextButtonActive ? "active" : ""
      }`}
      onClick={handleNextStep}
      disabled={!isNextButtonActive}
    >
      {step === 4 ? "계속하기" : step === 5 ? "다음" : "완료"}
    </button>
  )
}

export default InfoNextButton
