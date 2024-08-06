// import React, { useState } from "react"
// import { useLocation } from "react-router-dom"
// import { ReactComponent as AddPet } from "../../../assets/mypage/AddPet.svg"
// import { ReactComponent as PetProfile } from "../../../assets/mypage/PetProfile.svg"
// import { ReactComponent as PetProfileAdd } from "../../../assets/mypage/PetProfileAdd.svg"

// const PetEdit = () => {
//   const location = useLocation()
//   const initialPetInfos = location.state?.petInfos || []
//   const [petInfos, setPetInfos] = useState(initialPetInfos)
//   const [showNewPetForm, setShowNewPetForm] = useState(false)

//   console.log("petInfos 확인", petInfos)
//   const handleAddPet = () => {
//     setShowNewPetForm(true)
//   }

//   const handleSaveNewPet = (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)

//     // Collect form data including image
//     const newPet = {
//       petId: new Date().getTime(), // Generate a unique ID for the new pet
//       name: formData.get("name"),
//       weight: formData.get("weight"),
//       image: formData.get("image"), // Add image to the new pet object
//     }

//     // Log the new pet object including the image file
//     console.log("New Pet Data:", newPet)

//     setPetInfos([...petInfos, newPet])
//     setShowNewPetForm(false)
//   }

//   const handleComplete = () => {
//     console.log("Current Pet Info:", petInfos)
//   }

//   return (
//     <div className="pet-edit-container">
//       <div className="pet-edit-button-wrapper">
//         <button className="pet-edit-button" onClick={handleComplete}>
//           완료
//         </button>
//       </div>

//       {petInfos.map((pet) => (
//         <React.Fragment key={pet.petId}>
//           <div className="intro-circle">
//             <PetProfile />
//             <form>
//               <div
//                 className="pet-profile-add-icon-wrapper"
//                 onClick={() =>
//                   document.getElementById(`file-upload-${pet.petId}`).click()
//                 }
//               >
//                 <PetProfileAdd className="pet-profile-add-icon" />
//               </div>
//               <input
//                 type="file"
//                 id={`file-upload-${pet.petId}`}
//                 accept="image/jpg, image/jpeg, image/png"
//                 multiple
//                 style={{ display: "none" }}
//               />
//             </form>
//           </div>
//           <form className="pet-edit-form-container">
//             <div className="pet-edit-input-container">
//               <div className="pet-edit-input-title">반려견 이름</div>
//               <div className="pet-edit-input">
//                 <input
//                   type="text"
//                   name={`name-${pet.petId}`}
//                   placeholder={pet.name}
//                   defaultValue={pet.name}
//                 />
//               </div>
//             </div>
//             <div className="pet-edit-input-container">
//               <div className="pet-edit-input-title">몸무게 (kg)</div>
//               <div className="pet-edit-input">
//                 <input
//                   type="text"
//                   name={`weight-${pet.petId}`}
//                   placeholder={pet.weight}
//                   defaultValue={pet.weight}
//                 />
//               </div>
//             </div>
//           </form>
//           <hr
//             style={{
//               marginBottom: "20px",
//               marginTop: "20px",
//               width: "351px",
//               height: "1px",
//               background: "#F0F0F0",
//             }}
//           />
//         </React.Fragment>
//       ))}

//       {showNewPetForm && (
//         <form onSubmit={handleSaveNewPet} className="pet-edit-form-container">
//           <div className="intro-circle">
//             <PetProfile />
//             <form>
//               <div
//                 className="pet-profile-add-icon-wrapper"
//                 onClick={() =>
//                   document.getElementById("new-file-upload").click()
//                 }
//               >
//                 <PetProfileAdd className="pet-profile-add-icon" />
//               </div>
//               <input
//                 type="file"
//                 id="new-file-upload"
//                 name="image"
//                 accept="image/jpg, image/jpeg, image/png"
//                 style={{ display: "none" }}
//               />
//             </form>
//           </div>
//           <div className="pet-edit-input-container">
//             <div className="pet-edit-input-title">반려견 이름</div>
//             <div className="pet-edit-input">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="반려견 이름"
//                 required
//               />
//             </div>
//           </div>
//           <div className="pet-edit-input-container">
//             <div className="pet-edit-input-title">몸무게 (kg)</div>
//             <div className="pet-edit-input">
//               <input
//                 type="text"
//                 name="weight"
//                 placeholder="반려견 몸무게"
//                 required
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             style={{
//               marginTop: "20px",
//               border: "1px solid black",
//               padding: "5px 10px",
//               backgroundColor: "#f0f0f0",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             저장
//           </button>
//         </form>
//       )}

//       <div className="pet-edit-add-wrapper">
//         <AddPet onClick={handleAddPet} />
//         <p>반려견 추가하기</p>
//       </div>
//     </div>
//   )
// }

// export default PetEdit

// import React, { useState } from "react"
// import { useLocation } from "react-router-dom"
// import { ReactComponent as AddPet } from "../../../assets/mypage/AddPet.svg"
// import { ReactComponent as PetProfile } from "../../../assets/mypage/PetProfile.svg"
// import { ReactComponent as PetProfileAdd } from "../../../assets/mypage/PetProfileAdd.svg"

// const PetEdit = () => {
//   const location = useLocation()
//   const initialPetInfos = location.state?.petInfos || []
//   const [petInfos, setPetInfos] = useState(initialPetInfos)
//   const [showNewPetForm, setShowNewPetForm] = useState(false)

//   console.log("petInfos 확인", petInfos)
//   const handleAddPet = () => {
//     setShowNewPetForm(true)
//   }

//   const handleSaveNewPet = (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)

//     const newPet = {
//       petId: new Date().getTime(),
//       name: formData.get("name"),
//       weight: formData.get("weight"),
//       image: formData.get("image"),
//     }

//     console.log("New Pet Data:", newPet)

//     setPetInfos([...petInfos, newPet])
//     setShowNewPetForm(false)
//   }

//   const handleComplete = () => {
//     console.log("Current Pet Info:", petInfos)
//   }

//   return (
//     <div className="pet-edit-container">
//       <div className="pet-edit-button-wrapper">
//         <button className="pet-edit-button" onClick={handleComplete}>
//           완료
//         </button>
//       </div>

//       {petInfos.map((pet) => (
//         <React.Fragment key={pet.petId}>
//           <div className="intro-circle">
//             {pet.image ? (
//               <img
//                 src={`${process.env.REACT_APP_S3_URL}/${pet.image}`}
//                 alt={pet.name}
//               />
//             ) : (
//               <PetProfile />
//             )}
//             {/* <form>
//               <div
//                 className="pet-profile-add-icon-wrapper"
//                 onClick={() =>
//                   document.getElementById(`file-upload-${pet.petId}`).click()
//                 }
//               >
//                 <PetProfileAdd className="pet-profile-add-icon" />
//               </div>
//               <input
//                 type="file"
//                 id={`file-upload-${pet.petId}`}
//                 accept="image/jpg, image/jpeg, image/png"
//                 multiple
//                 style={{ display: "none" }}
//               />
//             </form> */}
//           </div>
//           <form className="pet-edit-form-container">
//             <div className="pet-edit-input-container">
//               <div className="pet-edit-input-title">반려견 이름</div>
//               <div className="pet-edit-input">
//                 <input
//                   type="text"
//                   name={`name-${pet.petId}`}
//                   placeholder={pet.name}
//                   defaultValue={pet.name}
//                 />
//               </div>
//             </div>
//             <div className="pet-edit-input-container">
//               <div className="pet-edit-input-title">몸무게 (kg)</div>
//               <div className="pet-edit-input">
//                 <input
//                   type="text"
//                   name={`weight-${pet.petId}`}
//                   placeholder={pet.weight}
//                   defaultValue={pet.weight}
//                 />
//               </div>
//             </div>
//           </form>
//           <hr
//             style={{
//               marginBottom: "20px",
//               marginTop: "20px",
//               width: "351px",
//               height: "1px",
//               background: "#F0F0F0",
//             }}
//           />
//         </React.Fragment>
//       ))}

//       {showNewPetForm && (
//         <form onSubmit={handleSaveNewPet} className="pet-edit-form-container">
//           <div className="intro-circle">
//             <PetProfile />
//             <form>
//               <div
//                 className="pet-profile-add-icon-wrapper"
//                 onClick={() =>
//                   document.getElementById("new-file-upload").click()
//                 }
//               >
//                 <PetProfileAdd className="pet-profile-add-icon" />
//               </div>
//               <input
//                 type="file"
//                 id="new-file-upload"
//                 name="image"
//                 accept="image/jpg, image/jpeg, image/png"
//                 style={{ display: "none" }}
//               />
//             </form>
//           </div>
//           <div className="pet-edit-input-container">
//             <div className="pet-edit-input-title">반려견 이름</div>
//             <div className="pet-edit-input">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="반려견 이름"
//                 required
//               />
//             </div>
//           </div>
//           <div className="pet-edit-input-container">
//             <div className="pet-edit-input-title">몸무게 (kg)</div>
//             <div className="pet-edit-input">
//               <input
//                 type="text"
//                 name="weight"
//                 placeholder="반려견 몸무게"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className={`auth-register-info-pet-save-button ${
//               isFormValid ? "active" : ""
//             }`}
//             disabled={!isFormValid}
//           >
//             저장
//           </button>
//         </form>
//       )}

//       <div className="pet-edit-add-wrapper">
//         <AddPet onClick={handleAddPet} />
//         <p>반려견 추가하기</p>
//       </div>
//     </div>
//   )
// }

// export default PetEdit

import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { ReactComponent as AddPet } from "../../../assets/mypage/AddPet.svg"
import { ReactComponent as PetProfile } from "../../../assets/mypage/PetProfile.svg"
import { ReactComponent as PetProfileAdd } from "../../../assets/mypage/PetProfileAdd.svg"

const PetEdit = () => {
  const location = useLocation()
  const initialPetInfos = location.state?.petInfos || []
  const [petInfos, setPetInfos] = useState(initialPetInfos)
  const [showNewPetForm, setShowNewPetForm] = useState(false)
  const [newPetData, setNewPetData] = useState({
    name: "",
    weight: "",
    image: null,
  })
  const s3url = process.env.REACT_APP_S3_URL

  const isFormValid = newPetData.name && newPetData.weight && newPetData.image

  console.log("petInfos 확인", petInfos)
  const handleAddPet = () => {
    setShowNewPetForm(true)
  }

  const handleSaveNewPet = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const newPet = {
      petId: new Date().getTime(),
      name: formData.get("name"),
      weight: formData.get("weight"),
      image: formData.get("image"),
    }

    console.log("New Pet Data:", newPet)

    setPetInfos([...petInfos, newPet])
    setShowNewPetForm(false)
  }

  const handleComplete = () => {
    console.log("Current Pet Info:", petInfos)
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setNewPetData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }))
  }

  return (
    <div className="pet-edit-container">
      <div className="pet-edit-button-wrapper">
        <button className="pet-edit-button" onClick={handleComplete}>
          완료
        </button>
      </div>

      {petInfos.map((pet) => (
        <React.Fragment key={pet.petId}>
          <div className="intro-circle">
            {pet.image ? (
              <img src={`${s3url}/${pet.image}`} alt={pet.name} />
            ) : (
              <PetProfile />
            )}
          </div>
          <form className="pet-edit-form-container">
            <div className="pet-edit-input-container">
              <div className="pet-edit-input-title">반려견 이름</div>
              <div className="pet-edit-input">
                <input
                  type="text"
                  name={`name-${pet.petId}`}
                  placeholder={pet.name}
                  defaultValue={pet.name}
                />
              </div>
            </div>
            <div className="pet-edit-input-container">
              <div className="pet-edit-input-title">몸무게 (kg)</div>
              <div className="pet-edit-input">
                <input
                  type="text"
                  name={`weight-${pet.petId}`}
                  placeholder={pet.weight}
                  defaultValue={pet.weight}
                />
              </div>
            </div>
          </form>
          <hr
            style={{
              marginBottom: "20px",
              marginTop: "20px",
              width: "351px",
              height: "1px",
              background: "#F0F0F0",
            }}
          />
        </React.Fragment>
      ))}

      {showNewPetForm && (
        <form onSubmit={handleSaveNewPet} className="pet-edit-form-container">
          <div className="intro-circle">
            {newPetData.image ? (
              <img
                src={URL.createObjectURL(newPetData.image)}
                alt="New Pet"
                className="pet-profile-image"
              />
            ) : (
              <PetProfile />
            )}
            <div
              className="pet-profile-add-icon-wrapper"
              onClick={() => document.getElementById("new-file-upload").click()}
            >b
              <PetProfileAdd className="pet-profile-add-icon" />
            </div>
            <input
              type="file"
              id="new-file-upload"
              name="image"
              accept="image/jpg, image/jpeg, image/png"
              style={{ display: "none" }}
              onChange={handleInputChange}
            />
          </div>
          <div className="pet-edit-input-container">
            <div className="pet-edit-input-title">반려견 이름</div>
            <div className="pet-edit-input">
              <input
                type="text"
                name="name"
                placeholder="반려견 이름"
                required
                value={newPetData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="pet-edit-input-container">
            <div className="pet-edit-input-title">몸무게 (kg)</div>
            <div className="pet-edit-input">
              <input
                type="text"
                name="weight"
                placeholder="반려견 몸무게"
                required
                value={newPetData.weight}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`auth-register-info-pet-save-button ${
              isFormValid ? "active" : ""
            }`}
            disabled={!isFormValid}
          >
            저장
          </button>
        </form>
      )}

      <div className="pet-edit-add-wrapper">
        <AddPet onClick={handleAddPet} />
        <p>반려견 추가하기</p>
      </div>
    </div>
  )
}

export default PetEdit
