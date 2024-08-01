export const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000) // 1초, 2초
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0")
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0")
  const seconds = (totalSeconds % 60).toString().padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

export const convertToSeconds = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number)
  return hours * 3600 + minutes * 60 + seconds
}
