const calculatePetCalories = (distance, weight) => {
  console.log("calculatePetCalories 작동")

  // RER 계산
  const rer = 70 * Math.pow(weight, 0.75)

  // 활동 계수 설정 (0.00654) 이 부분 조정 필요
  const activityFactor = 0.00654

  // 총 칼로리 소모량 계산
  const caloriesBurned = rer * activityFactor * distance

  // 소수점 두 자리로 고정
  return caloriesBurned.toFixed(2)
}

export default calculatePetCalories
