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

export const formatDateAndTime = (dateTimeString) => {
  if (!dateTimeString) return { date: "N/A", time: "N/A" }

  const [date, time] = dateTimeString.split("T")
  const [_, month, day] = date.split("-")
  const formattedDate = `${month}.${day}`
  const [hour, minute] = time.split(":")
  const formattedTime = `${hour}:${minute}`

  return { date: formattedDate, time: formattedTime }
}

export const formatHourMinute = (dateTimeString) => {
  if (!dateTimeString) return { date: "N/A", time: "N/A" }

  const [_, time] = dateTimeString.split("T")

  const [hour, minute] = time.split(":")
  const formattedTime = `${hour}:${minute}`

  return formattedTime
}

export const formatWalkTime = (walkTime) => {
  const seconds = parseInt(walkTime, 10)
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0")
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0")
  const secs = (seconds % 60).toString().padStart(2, "0")
  return `${hrs}:${mins}:${secs}`
}
