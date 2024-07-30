import React, { useEffect, useState } from "react"
import { ReactComponent as DownArrow } from "../../../../../assets/auth/register/DownArrow.svg"
import { ReactComponent as CloseIcon } from "../../../../../assets/auth/register/CloseIcon.svg"
import { registerPet } from "../../../../../api"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const InfoStepThree = ({
  petInfoInput,
  petInfos,
  onChangePetInfoInput,
  onSubmitPetInfo,
  removePet,
  handleClick,
  closeModal,
  isModalOpen,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.accessToken) {
      alert("auth가 없습니다.")
      navigate("/auth/register")
    }
  }, [auth, navigate])

  const isFormValid =
    petInfoInput.name && petInfoInput.weight && petInfoInput.petState

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (isFormValid && !isSubmitting) {
      setIsSubmitting(true)
      try {
        await onSubmitPetInfo(e)

        const petInfoToRegister = {
          dto: [
            {
              name: petInfoInput.name,
              weight: parseFloat(petInfoInput.weight),
              // growthStatus: petInfoInput.petState,
            },
            ...petInfos,
          ],
        }

        const formData = new FormData()
        formData.append(
          "dto",
          new Blob([JSON.stringify(petInfoToRegister.dto)], {
            type: "application/json",
          })
        )

        if (selectedFile) {
          formData.append("files", selectedFile)
        }

        console.log(
          "FormData",
          formData.get("dto"),
          formData.get("files"),
          formData
        )

        const res = await registerPet(formData, auth.accessToken)
        console.log("반려견 등록 완료", res)
      } catch (e) {
        console.error(e)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  return (
    <>
      <div className="auth-register-info-pet-title">
        <div className="auth-register-info-pet-content">
          <span className="auth-register-info-pet-name">반려견</span>의
          <br />
          정보를 알려주세요
        </div>
        <div className="intro-circle">
          <form>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
          </form>
        </div>
      </div>

      <div className="auth-register-info-pet-list-container">
        {petInfos.map((pet, index) => (
          <div className="auth-register-info-pet-list-item" key={index}>
            {pet.name}
            <CloseIcon onClick={() => removePet(index)} />
          </div>
        ))}
      </div>

      <form
        className="auth-register-info-pet-container"
        onSubmit={handleFormSubmit}
      >
        <div className="auth-register-info-pet-input-container">
          <div className="auth-register-info-pet-input-title">반려견 이름</div>
          <div className="auth-register-info-pet-input">
            <input
              type="text"
              name="name"
              placeholder="반려견 이름 입력"
              value={petInfoInput.name}
              onChange={onChangePetInfoInput}
            />
          </div>
        </div>
        <div className="auth-register-info-pet-input-container">
          <div className="auth-register-info-pet-input-title">몸무게 (kg)</div>
          <div className="auth-register-info-pet-input">
            <input
              type="text"
              name="weight"
              placeholder="몸무게 (kg) 입력"
              value={petInfoInput.weight}
              onChange={onChangePetInfoInput}
            />
          </div>
        </div>
        <div className="auth-register-info-pet-input-container">
          <div className="auth-register-info-pet-input-title">반려견 상태</div>
          <div className="auth-register-info-pet-modal" onClick={handleClick}>
            {petInfoInput.petName || "반려견 상태 선택"}
            <DownArrow />
          </div>
        </div>
        <div className="auth-register-info-pet-save-button-container">
          <button
            type="submit"
            className={`auth-register-info-pet-save-button ${
              isFormValid ? "active" : ""
            }`}
            disabled={!isFormValid || isSubmitting}
          >
            저장
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div
          className="register-modal-container"
          onClick={() => closeModal(null)}
        >
          <div
            className="register-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>반려견 상태</h2>
            <ul>
              <li
                onClick={() =>
                  closeModal(
                    "성장기 (4개월 미만)",
                    "GROWING_UP_LESS_FOUR_MONTH"
                  )
                }
              >
                성장기 (4개월 미만)
              </li>
              <li
                onClick={() =>
                  closeModal(
                    "성장기 (4~12개월)",
                    "GROWING_UP_LESS_TWELVE_MONTH"
                  )
                }
              >
                성장기 (4~12개월)
              </li>
              <li onClick={() => closeModal("미중성 성견", "UNNEUTERED_ADULT")}>
                미중성 성견
              </li>
              <li
                onClick={() => closeModal("중성화 완료 성견", "NEUTERED_ADULT")}
              >
                중성화 완료 성견
              </li>
              <li
                onClick={() =>
                  closeModal("체중 감량 필요 성견", "NEEDS_WEIGHT_LOSS")
                }
              >
                체중 감량 필요 성견
              </li>
              <li
                onClick={() =>
                  closeModal("체중 증량 필요 성견", "NEEDS_WEIGHT_GAIN")
                }
              >
                체중 증량 필요 성견
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default InfoStepThree
