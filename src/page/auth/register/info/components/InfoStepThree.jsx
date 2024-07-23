// import { useNavigate } from "react-router-dom"
// import React, { useState } from "react"
// import { ReactComponent as DownArrow } from "../../../../../assets/auth/register/DownArrow.svg"

// const InfoStepThree = () => {
//   const petName = "반려견"
//   const navigate = useNavigate()
//   const [isModalOpen, setModalOpen] = useState(false)

//   const handleClick = (event) => {
//     event.preventDefault()
//     setModalOpen(true)
//   }

//   const closeModal = () => {
//     setModalOpen(false)
//   }

//   return (
//     <>
//       <div className="auth-register-info-pet-title">
//         <div className="auth-register-info-pet-content">
//           <span className="auth-register-info-pet-name">{petName}</span>의{" "}
//           <br />
//           정보를 알려주세요
//         </div>
//         <div className="intro-circle"></div>
//       </div>

//       <form className="auth-register-info-pet-container">
//         <div className="auth-register-info-pet-input-container">
//           <div className="auth-register-info-pet-input-title">반려견 이름</div>
//           <div className="auth-register-info-pet-input">
//             <input type="text" placeholder="반려견 이름 입력" />
//           </div>
//         </div>
//         <div className="auth-register-info-pet-input-container">
//           <div className="auth-register-info-pet-input-title">몸무게 (kg)</div>
//           <div className="auth-register-info-pet-input">
//             <input type="text" placeholder="몸무게 (kg) 입력" />
//           </div>
//         </div>
//         <div className="auth-register-info-pet-input-container">
//           <div className="auth-register-info-pet-input-title">반려견 상태</div>
//           <div className="auth-register-info-pet-modal" onClick={handleClick}>
//             반려견 상태 선택
//             <DownArrow />
//           </div>
//         </div>
//         <div className="auth-register-info-pet-save-button-container">
//           <button className="auth-register-info-pet-save-button">저장</button>
//         </div>
//       </form>
//       <button className="pet-next-button">다음</button>

//       {isModalOpen && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h2>반려견 상태</h2>
//             <ul>
//               <li onClick={closeModal}>성장기 (4개월 미만)</li>
//               <li onClick={closeModal}>성장기 (4~12개월)</li>
//               <li onClick={closeModal}>미중성 성견</li>
//               <li onClick={closeModal}>중성화 완료 성견</li>
//               <li onClick={closeModal}>체중 감량 필요 성견</li>
//               <li onClick={closeModal}>체중 증량 필요 성견</li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default InfoStepThree

// import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { ReactComponent as DownArrow } from "../../../../../assets/auth/register/DownArrow.svg"

// const InfoStepThree = () => {
//   const petName = "반려견"
//   const navigate = useNavigate()
//   const [isModalOpen, setModalOpen] = useState(false)
//   // const [petNameInput, setPetNameInput] = useState("")
//   // const [petWeightInput, setPetWeightInput] = useState("")
//   // const [selectedPetState, setSelectedPetState] = useState("")
//   const [petInfoInput, setPetInfoInput] = useState({
//     name: "",
//     weight: "",
//     petState: "",
//   })
//   const [petWeightInput, setPetWeightInput] = useState("")
//   const [selectedPetState, setSelectedPetState] = useState("")
//   const [petInfos, setPetInfos] = useState([])

//   const handleClick = (event) => {
//     event.preventDefault()
//     setModalOpen(true)
//   }

//   const closeModal = (state) => {
//     setSelectedPetState(state)
//     setModalOpen(false)
//   }

//   const onChangeInput = (e) => {
//     const { name, value } = e.target
//     const newInput = {
//       ...petInfoInput,
//       [name]: value,
//     }
//     setPetInfoInput(newInput)
//   }

//   // const handlePetNameChange = (event) => {
//   //   setPetNameInput(event.target.value)
//   // }

//   // const handlePetWeightChange = (event) => {
//   //   setPetWeightInput(event.target.value)
//   // }

//   const onSubmitPetInfo = (e) => {
//     e.preventDefault()

//     setPetInfos()
//   }

//   const isFormValid = petNameInput && petWeightInput && selectedPetState

//   return (
//     <>
//       <div className="auth-register-info-pet-title">
//         <div className="auth-register-info-pet-content">
//           <span className="auth-register-info-pet-name">{petName}</span>의{" "}
//           <br />
//           정보를 알려주세요
//         </div>
//         <div className="intro-circle"></div>
//       </div>

//       <form
//         className="auth-register-info-pet-container"
//         onSubmit={onSubmitPetInfo}
//       >
//         <div className="auth-register-info-pet-input-container">
//           <div className="auth-register-info-pet-input-title">반려견 이름</div>
//           <div className="auth-register-info-pet-input">
//             <input
//               type="text"
//               placeholder="반려견 이름 입력"
//               value={petNameInput}
//               onChange={handlePetNameChange}
//             />
//           </div>
//         </div>
//         <div className="auth-register-info-pet-input-container">
//           <div className="auth-register-info-pet-input-title">몸무게 (kg)</div>
//           <div className="auth-register-info-pet-input">
//             <input
//               type="text"
//               placeholder="몸무게 (kg) 입력"
//               value={petWeightInput}
//               onChange={handlePetWeightChange}
//             />
//           </div>
//         </div>
//         <div className="auth-register-info-pet-input-container">
//           <div className="auth-register-info-pet-input-title">반려견 상태</div>
//           <div className="auth-register-info-pet-modal" onClick={handleClick}>
//             {selectedPetState || "반려견 상태 선택"}
//             <DownArrow />
//           </div>
//         </div>
//         <div className="auth-register-info-pet-save-button-container">
//           <button
//             type="submit"
//             className={`auth-register-info-pet-save-button ${
//               isFormValid ? "active" : ""
//             }`}
//             disabled={!isFormValid}
//           >
//             저장
//           </button>
//         </div>
//       </form>
//       <button className="pet-next-button">다음</button>

//       {isModalOpen && (
//         <div className="modal-overlay" onClick={() => closeModal(null)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h2>반려견 상태</h2>
//             <ul>
//               <li onClick={() => closeModal("성장기 (4개월 미만)")}>
//                 성장기 (4개월 미만)
//               </li>
//               <li onClick={() => closeModal("성장기 (4~12개월)")}>
//                 성장기 (4~12개월)
//               </li>
//               <li onClick={() => closeModal("미중성 성견")}>미중성 성견</li>
//               <li onClick={() => closeModal("중성화 완료 성견")}>
//                 중성화 완료 성견
//               </li>
//               <li onClick={() => closeModal("체중 감량 필요 성견")}>
//                 체중 감량 필요 성견
//               </li>
//               <li onClick={() => closeModal("체중 증량 필요 성견")}>
//                 체중 증량 필요 성견
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default InfoStepThree

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as DownArrow } from "../../../../../assets/auth/register/DownArrow.svg"
import { ReactComponent as CloseIcon } from "../../../../../assets/auth/register/CloseIcon.svg"

const InfoStepThree = () => {
  const petName = "반려견"
  const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false)
  const [petInfoInput, setPetInfoInput] = useState({
    name: "",
    weight: "",
    petState: "",
  })
  const [petInfos, setPetInfos] = useState([])

  const handleClick = (event) => {
    event.preventDefault()
    setModalOpen(true)
  }

  const closeModal = (state) => {
    setPetInfoInput({
      ...petInfoInput,
      petState: state,
    })
    setModalOpen(false)
  }

  const onChangeInput = (e) => {
    const { name, value } = e.target
    const newInput = {
      ...petInfoInput,
      [name]: value,
    }
    setPetInfoInput(newInput)
  }

  const onSubmitPetInfo = (e) => {
    e.preventDefault()
    setPetInfos([...petInfos, petInfoInput])
    setPetInfoInput({
      name: "",
      weight: "",
      petState: "",
    })
  }

  const removePet = (index) => {
    setPetInfos(petInfos.filter((_, i) => i !== index))
  }

  const isFormValid =
    petInfoInput.name && petInfoInput.weight && petInfoInput.petState

  return (
    <>
      <div className="auth-register-info-pet-title">
        <div className="auth-register-info-pet-content">
          <span className="auth-register-info-pet-name">{petName}</span>의{" "}
          <br />
          정보를 알려주세요
        </div>
        <div className="intro-circle"></div>
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
        onSubmit={onSubmitPetInfo}
      >
        <div className="auth-register-info-pet-input-container">
          <div className="auth-register-info-pet-input-title">반려견 이름</div>
          <div className="auth-register-info-pet-input">
            <input
              type="text"
              name="name"
              placeholder="반려견 이름 입력"
              value={petInfoInput.name}
              onChange={onChangeInput}
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
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div className="auth-register-info-pet-input-container">
          <div className="auth-register-info-pet-input-title">반려견 상태</div>
          <div className="auth-register-info-pet-modal" onClick={handleClick}>
            {petInfoInput.petState || "반려견 상태 선택"}
            <DownArrow />
          </div>
        </div>
        <div className="auth-register-info-pet-save-button-container">
          <button
            type="submit"
            className={`auth-register-info-pet-save-button ${
              isFormValid ? "active" : ""
            }`}
            disabled={!isFormValid}
          >
            저장
          </button>
        </div>
      </form>

      <button
        className={`pet-next-button ${petInfos.length > 0 ? "active" : ""}`}
        disabled={petInfos.length === 0}
        onClick={() => navigate("/next-step")}
      >
        다음
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => closeModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>반려견 상태</h2>
            <ul>
              <li onClick={() => closeModal("성장기 (4개월 미만)")}>
                성장기 (4개월 미만)
              </li>
              <li onClick={() => closeModal("성장기 (4~12개월)")}>
                성장기 (4~12개월)
              </li>
              <li onClick={() => closeModal("미중성 성견")}>미중성 성견</li>
              <li onClick={() => closeModal("중성화 완료 성견")}>
                중성화 완료 성견
              </li>
              <li onClick={() => closeModal("체중 감량 필요 성견")}>
                체중 감량 필요 성견
              </li>
              <li onClick={() => closeModal("체중 증량 필요 성견")}>
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
