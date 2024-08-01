// const calculateBMICalories = (distance, weight, height) => {
//   const bmi = weight / (height / 100) ** 2
//   let factor
//   if (bmi < 18.5) {
//     factor = 0.035 // 저체중
//   } else if (bmi < 24.9) {
//     factor = 0.04 // 정상
//   } else if (bmi < 29.9) {
//     factor = 0.045 // 과체중
//   } else if (bmi < 34.9) {
//     factor = 0.05 // 비만
//   } else {
//     factor = 0.055 // 고도비만
//   }
//   return (distance * weight * factor).toFixed(2)
// }

// export default calculateBMICalories

const calculateBMICalories = (distance, weight, height) => {
  const bmi = weight / (height / 100) ** 2
  let caloriesPerKm

  if (bmi < 18.5) {
    caloriesPerKm = 50 // 저체중
  } else if (bmi < 24.9) {
    caloriesPerKm = 60 // 정상
  } else if (bmi < 29.9) {
    caloriesPerKm = 65 // 과체중
  } else if (bmi < 34.9) {
    caloriesPerKm = 70 // 비만
  } else {
    caloriesPerKm = 75 // 고도비만
  }

  return (distance * caloriesPerKm).toFixed(2)
}

export default calculateBMICalories
