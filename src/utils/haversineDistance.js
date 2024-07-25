/**
 * 하버사인 공식 (Haversine Formula), 두 위경도 좌표 사이의 거리를 구할 때 사용
 * @param {coords1} coords1 위경도1 객체
 * @param {coords2} coords2 위경도2 객체
 * @returns {meter} 하버사인 공식을 통한 거리(meter)
 */
const haversineDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180

  const R = 6371 // 지구 반지름(km)
  const dLat = toRad(coords2.latitude - coords1.latitude) // 경도의 차이 거리
  const dLon = toRad(coords2.longitude - coords1.longitude) // 위도의 차이 거리
  const lat1 = toRad(coords1.latitude)
  const lat2 = toRad(coords2.latitude)

  /**
   * 하버사인 실제 공식 적용 부분1
   */
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  /**
   * 하버사인 실제 공식 적용 부분2
   */
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c * 1000 // meter
}

export default haversineDistance
