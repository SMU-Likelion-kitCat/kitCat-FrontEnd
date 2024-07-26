// import React, { useState, useEffect } from "react"
// import InfoStepOne from "./components/InfoStepOne"
// import InfoStepTwo from "./components/InfoStepTwo"
// import InfoStepThree from "./components/InfoStepThree"
// import { ReactComponent as BackArrow } from "../../../../assets/auth/register/BackArrow.svg"
// import { useNavigate, useOutletContext } from "react-router-dom"
// import InfoNextButton from "./components/InfoNextButton"

// const Info = () => {
//   const [step, setStep] = useState(1)
//   const navigate = useNavigate()
//   const signupInfo = useOutletContext()

//   const [isModalOpen, setModalOpen] = useState(false)
//   const [petInfoInput, setPetInfoInput] = useState({
//     name: "",
//     weight: "",
//     petState: "",
//   })
//   const [petInfos, setPetInfos] = useState([])

//   const handleClick = (event) => {
//     event.preventDefault()
//     setModalOpen(true)
//   }

//   const closeModal = (state) => {
//     setPetInfoInput({
//       ...petInfoInput,
//       petState: state,
//     })
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

//   const onSubmitPetInfo = (e) => {
//     e.preventDefault()
//     setPetInfos([...petInfos, petInfoInput])
//     setPetInfoInput({
//       name: "",
//       weight: "",
//       petState: "",
//     })
//   }

//   const removePet = (index) => {
//     setPetInfos(petInfos.filter((_, i) => i !== index))
//   }

//   useEffect(() => {
//     if (!signupInfo || !signupInfo.email) {
//       navigate("/auth/register")
//     }
//   }, [signupInfo, navigate])

//   const backStep = () => {
//     if (step > 1) setStep(step - 1)
//   }

//   const nextStep = () => {
//     if (step < 3) {
//       setStep(step + 1)
//     }
//   }

//   return (
//     <div className="auth-register-info-container">
//       <div className="auth-register-info-main-content-container">
//         <div className="auth-register-info-back-button">
//           <BackArrow onClick={backStep} />
//         </div>

//         <div className="auth-register-info-content-container">
//           {step === 1 && (
//             <InfoStepOne nickname={signupInfo.nickname} nextStep={nextStep} />
//           )}
//           {step === 2 && (
//             <InfoStepTwo nickname={signupInfo.nickname} nextStep={nextStep} />
//           )}
//           {step === 3 && (
//             <InfoStepThree
//               nextStep={nextStep}
//               handleClick={handleClick}
//               petInfoInput={petInfoInput}
//               petInfos={petInfos}
//               onChangeInput={onChangeInput}
//               onSubmitPetInfo={onSubmitPetInfo}
//               removePet={removePet}
//               closeModal={closeModal}
//               isModalOpen={isModalOpen}
//             />
//           )}
//         </div>
//       </div>
//       <InfoNextButton step={step} nextStep={nextStep} petInfos={petInfos} />
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
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const signupInfo = useOutletContext()

  const [isModalOpen, setModalOpen] = useState(false)
  const [petInfoInput, setPetInfoInput] = useState({
    name: "",
    weight: "",
    petState: "",
  })
  const [petInfos, setPetInfos] = useState([])
  const [userInfo, setUserInfo] = useState({
    height: 0,
    weight: 0,
    bmi: 0,
  })

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

  useEffect(() => {
    if (!signupInfo || !signupInfo.email) {
      navigate("/auth/register")
    }
  }, [signupInfo, navigate])

  const backStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleUserInfoUpdate = (info) => {
    setUserInfo(info)
  }

  return (
    <div className="auth-register-info-container">
      <div className="auth-register-info-main-content-container">
        <div className="auth-register-info-back-button">
          <BackArrow onClick={backStep} />
        </div>

        <div className="auth-register-info-content-container">
          {step === 1 && <InfoStepOne nickname={signupInfo.nickname} />}
          {/* {step === 2 && (
            <InfoStepTwo nickname={signupInfo.nickname} nextStep={nextStep} />
          )} */}
          {step === 2 && (
            <InfoStepTwo
              nickname={signupInfo.nickname}
              onUpdateUserInfo={handleUserInfoUpdate}
            />
          )}
          {step === 3 && (
            <InfoStepThree
              handleClick={handleClick}
              petInfoInput={petInfoInput}
              petInfos={petInfos}
              onChangeInput={onChangeInput}
              onSubmitPetInfo={onSubmitPetInfo}
              removePet={removePet}
              closeModal={closeModal}
              isModalOpen={isModalOpen}
            />
          )}
        </div>
      </div>
      <InfoNextButton step={step} nextStep={nextStep} petInfos={petInfos} />
    </div>
  )
}

export default Info
