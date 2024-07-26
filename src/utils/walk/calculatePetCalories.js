const calculatePetCalories = (distance, weight, petState) => {
  let factor
  switch (petState) {
    case "성장기 (4개월 미만)":
      factor = 0.05
      break
    case "성장기 (4~12개월)":
      factor = 0.04
      break
    case "미중성 성견":
      factor = 0.035
      break
    case "중성화 완료 성견":
      factor = 0.03
      break
    case "체중 감량 필요 성견":
      factor = 0.045
      break
    case "체중 증량 필요 성견":
      factor = 0.04
      break
    default:
      factor = 0.03
  }
  return (distance * weight * factor).toFixed(2)
}

export default calculatePetCalories
