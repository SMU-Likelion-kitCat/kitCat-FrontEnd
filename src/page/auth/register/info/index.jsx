// import React, { useState, useEffect } from "react"
// import InfoStepOne from "./components/InfoStepOne"
// import InfoStepTwo from "./components/InfoStepTwo"
// import InfoStepThree from "./components/InfoStepThree"
// import { ReactComponent as BackArrow } from "../../../../assets/auth/register/BackArrow.svg"
// import { useNavigate, useOutletContext } from "react-router-dom"
// import InfoNextButton from "./components/InfoNextButton"

// const Info = () => {
//   const navigate = useNavigate()
//   const [signupInfo, setSignupInfo] = useOutletContext()
//   const [isModalOpen, setModalOpen] = useState(false)
//   const [petInfoInput, setPetInfoInput] = useState({
//     name: "",
//     weight: "",
//     petName: "",
//     petState: "",
//   })

//   useEffect(() => {
//     if (!signupInfo || !signupInfo.email) {
//       navigate("/auth/register")
//     }
//   }, [signupInfo, navigate])

//   const handleClick = (event) => {
//     event.preventDefault()
//     setModalOpen(true)
//   }

//   const closeModal = (name, state) => {
//     setPetInfoInput((prevState) => ({
//       ...prevState,
//       petName: name,
//       petState: state,
//     }))
//     setModalOpen(false)
//   }

//   const onChangePetInfoInput = (e) => {
//     const { name, value } = e.target
//     setPetInfoInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }))
//   }

//   const onSubmitPetInfo = (e, file) => {
//     e.preventDefault()
//     setSignupInfo((prevState) => ({
//       ...prevState,
//       petInfos: [
//         ...prevState.petInfos,
//         {
//           name: petInfoInput.name,
//           weight: petInfoInput.weight,
//           petState: petInfoInput.petState,
//           file: file,
//         },
//       ],
//     }))
//     setPetInfoInput({
//       name: "",
//       weight: "",
//       petState: "",
//     })
//   }

//   const removePet = (index) => {
//     setSignupInfo((prevState) => ({
//       ...prevState,
//       petInfos: prevState.petInfos.filter((_, i) => i !== index),
//     }))
//   }

//   const backStep = () => {
//     if (signupInfo.step > 4) {
//       setSignupInfo({ ...signupInfo, step: signupInfo.step - 1 })
//     } else if (signupInfo.step === 4) {
//       setSignupInfo({ ...signupInfo, step: signupInfo.step - 1 })
//       navigate("/auth/register", { state: { signupInfo } })
//     }
//   }

//   const nextStep = () => {
//     if (signupInfo.step < 6) {
//       setSignupInfo({ ...signupInfo, step: signupInfo.step + 1 })
//     }
//   }

//   const handleUserInfoUpdate = (info) => {
//     setSignupInfo((prevState) => ({ ...prevState, ...info }))
//   }

//   return (
//     <div className="auth-register-info-container">
//       <div className="auth-register-info-main-content-container">
//         <div className="auth-register-info-back-button">
//           <BackArrow onClick={backStep} />
//         </div>

//         <div className="auth-register-info-content-container">
//           {signupInfo.step === 4 && (
//             <InfoStepOne nickname={signupInfo.nickname} />
//           )}
//           {signupInfo.step === 5 && (
//             <InfoStepTwo
//               userInfo={signupInfo}
//               setUserInfo={handleUserInfoUpdate}
//             />
//           )}
//           {signupInfo.step === 6 && (
//             <InfoStepThree
//               handleClick={handleClick}
//               petInfoInput={petInfoInput}
//               petInfos={signupInfo.petInfos}
//               onChangePetInfoInput={onChangePetInfoInput}
//               onSubmitPetInfo={onSubmitPetInfo}
//               removePet={removePet}
//               closeModal={closeModal}
//               isModalOpen={isModalOpen}
//             />
//           )}
//         </div>
//       </div>
//       <InfoNextButton
//         step={signupInfo.step}
//         nextStep={nextStep}
//         signupInfo={signupInfo}
//         setSignupInfo={setSignupInfo}
//       />
//     </div>
//   )
// }

// export default Info

import React, { useState, useEffect } from "react"
import InfoStepOne from "./components/InfoStepOne"
import InfoStepTwo from "./components/InfoStepTwo"
import InfoStepThree from "./components/InfoStepThree"
import { ReactComponent as BackArrow } from "../../../../assets/auth/register/BackArrow.svg"
import { useNavigate, useOutletContext } from "react-router-dom"
import InfoNextButton from "./components/InfoNextButton"

const Info = () => {
  const navigate = useNavigate()
  const [signupInfo, setSignupInfo] = useOutletContext()
  const [isModalOpen, setModalOpen] = useState(false)
  const [petInfoInput, setPetInfoInput] = useState({
    name: "",
    weight: "",
    petName: "",
    petState: "GROWING_UP_LESS_FOUR_MONTH",
  })
  const [selectedFile, setSelectedFile] = useState(null) // 파일 상태 추가

  useEffect(() => {
    if (!signupInfo || !signupInfo.email) {
      navigate("/auth/register")
    }
  }, [signupInfo, navigate])

  const handleClick = (event) => {
    event.preventDefault()
    setModalOpen(true)
  }

  const closeModal = (name, state) => {
    setPetInfoInput((prevState) => ({
      ...prevState,
      petName: name,
      petState: state,
    }))
    setModalOpen(false)
  }

  const onChangePetInfoInput = (e) => {
    const { name, value } = e.target
    setPetInfoInput((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onSubmitPetInfo = (e) => {
    e.preventDefault()
    setSignupInfo((prevState) => ({
      ...prevState,
      petInfos: [
        ...prevState.petInfos,
        {
          name: petInfoInput.name,
          weight: petInfoInput.weight,
          // petState: petInfoInput.petState,
          petState: "GROWING_UP_LESS_FOUR_MONTH",
          file: selectedFile, // 선택된 파일 추가
        },
      ],
    }))
    setPetInfoInput({
      name: "",
      weight: "",
      petState: "",
    })
    setSelectedFile(null) // 파일 상태 초기화
  }

  const removePet = (index) => {
    setSignupInfo((prevState) => ({
      ...prevState,
      petInfos: prevState.petInfos.filter((_, i) => i !== index),
    }))
  }

  const backStep = () => {
    if (signupInfo.step > 4) {
      setSignupInfo({ ...signupInfo, step: signupInfo.step - 1 })
    } else if (signupInfo.step === 4) {
      setSignupInfo({ ...signupInfo, step: signupInfo.step - 1 })
      navigate("/auth/register", { state: { signupInfo } })
    }
  }

  const nextStep = () => {
    if (signupInfo.step < 6) {
      setSignupInfo({ ...signupInfo, step: signupInfo.step + 1 })
    }
  }

  const handleUserInfoUpdate = (info) => {
    setSignupInfo((prevState) => ({ ...prevState, ...info }))
  }

  return (
    <div className="auth-register-info-container">
      <div className="auth-register-info-main-content-container">
        <div className="auth-register-info-back-button">
          <BackArrow onClick={backStep} />
        </div>

        <div className="auth-register-info-content-container">
          {signupInfo.step === 4 && (
            <InfoStepOne nickname={signupInfo.nickname} />
          )}
          {signupInfo.step === 5 && (
            <InfoStepTwo
              userInfo={signupInfo}
              setUserInfo={handleUserInfoUpdate}
            />
          )}
          {signupInfo.step === 6 && (
            <InfoStepThree
              handleClick={handleClick}
              petInfoInput={petInfoInput}
              petInfos={signupInfo.petInfos}
              onChangePetInfoInput={onChangePetInfoInput}
              onSubmitPetInfo={onSubmitPetInfo}
              removePet={removePet}
              closeModal={closeModal}
              isModalOpen={isModalOpen}
              handleFileChange={(e) => setSelectedFile(e.target.files[0])} // 파일 변경 핸들러 추가
            />
          )}
        </div>
      </div>
      <InfoNextButton
        step={signupInfo.step}
        nextStep={nextStep}
        signupInfo={signupInfo}
        setSignupInfo={setSignupInfo}
      />
    </div>
  )
}

export default Info
