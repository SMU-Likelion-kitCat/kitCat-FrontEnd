import axios from "axios"

export const registerUser = async (userInfo) => {
  try {
    const res = await axios.post("/api/v1/user/register", userInfo)
    return res.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const registerPet = async (formData, accessToken) => {
  try {
    const res = await axios.post("/api/v1/pet/save", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const checkNickname = async (nickname) => {
  try {
    const res = await axios.get(
      `/api/v1/user/check/nickname/${encodeURIComponent(nickname)}`
    )
    return res.status === 200
  } catch (e) {
    if (e.response && e.response.status === 409) {
      return false
    }
    console.error(e)
    throw e
  }
}

export const checkEmail = async (email) => {
  try {
    const res = await axios.get(
      `/api/v1/user/check/email/${encodeURIComponent(email)}`
    )
    return res.status === 200
  } catch (e) {
    if (e.response && e.response.status === 409) {
      return false
    }
    console.error(e)
    throw e
  }
}
