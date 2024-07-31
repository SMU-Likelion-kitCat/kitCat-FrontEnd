const calculatePetCalories = (distance, weight) => {
  // 입력 값 확인
  console.log("Distance:", distance)
  console.log("Weight:", weight)

  // RER 계산
  const rer = 70 * Math.pow(weight, 0.75)

  // 활동 계수 설정 (여기서는 예시로 1.6을 사용)
  const activityFactor = 1.6

  // 총 칼로리 소모량 계산
  const caloriesBurned = rer * activityFactor * distance

  // 소수점 두 자리로 고정
  return caloriesBurned.toFixed(2)
}

export default calculatePetCalories
