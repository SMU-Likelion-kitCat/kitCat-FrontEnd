export const getColorByProgress = (progress) => {
  if (progress <= 40) {
    return "#858585"
  } else if (progress <= 70) {
    return "#D2A44B"
  } else {
    return "#1E76DE"
  }
}
