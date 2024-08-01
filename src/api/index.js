// // 로그인 유저 정보 조회
// export const loginUserInfo = async (user) => {
//   try {
//     const res = await axios.post("/api/v1/user/info", user, {
//       Authorization: `Bearer ${accessToken}`,
//     })
//     return res.data
//   } catch (e) {
//     console.error(e)
//     throw e
//   }
// }

// export const loginUser = async (user) => {
//   try {
//     const res = await axios.post("/api/v1/user/login", user)
//     return res.data
//   } catch (e) {
//     console.error(e)
//     throw e
//   }
// }

// export const registerUser = async (userInfo) => {
//   try {
//     const res = await axios.post("/api/v1/user/register", userInfo)
//     return res.data
//   } catch (e) {
//     console.error(e)
//     throw e
//   }
// }

// export const registerPet = async (formData, accessToken) => {
//   try {
//     const res = await axios.post("/api/v1/pet/save", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//     return res.data
//   } catch (e) {
//     console.error(e)
//     throw e
//   }
// }

// export const checkNickname = async (nickname) => {
//   try {
//     const res = await axios.get(
//       `/api/v1/user/check/nickname/${encodeURIComponent(nickname)}`
//     )
//     return res.status === 200
//   } catch (e) {
//     if (e.response && e.response.status === 409) {
//       return false
//     }
//     console.error(e)
//     throw e
//   }
// }

// export const checkEmail = async (email) => {
//   try {
//     const res = await axios.get(
//       `/api/v1/user/check/email/${encodeURIComponent(email)}`
//     )
//     return res.status === 200
//   } catch (e) {
//     if (e.response && e.response.status === 409) {
//       return false
//     }
//     console.error(e)
//     throw e
//   }
// }

import axios from "axios";
import apiConfig from "./apiConfig";

// 로그인 유저 정보 조회
export const loginUserInfo = async () => {
  try {
    const res = await apiConfig.get("/user/info");
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const loginUser = async (user) => {
  try {
    const res = await apiConfig.post("/user/login", user);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const registerUser = async (userInfo) => {
  try {
    const res = await apiConfig.post("/user/register", userInfo);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const registerPet = async (formData) => {
  try {
    const res = await apiConfig.post("/pet/save", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const checkNickname = async (nickname) => {
  try {
    const res = await apiConfig.get(
      `/user/check/nickname/${encodeURIComponent(nickname)}`
    );
    return res.status === 200;
  } catch (e) {
    if (e.response && e.response.status === 409) {
      return false;
    }
    console.error(e);
    throw e;
  }
};

export const checkEmail = async (email) => {
  try {
    const res = await apiConfig.get(
      `/user/check/email/${encodeURIComponent(email)}`
    );
    return res.status === 200;
  } catch (e) {
    if (e.response && e.response.status === 409) {
      return false;
    }
    console.error(e);
    throw e;
  }
};

// 루틴 생성
export const createRoutine = async (routineData) => {
  try {
    const res = await apiConfig.post("/routine/save", routineData);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 루틴 목록 조회
export const getRoutines = async () => {
  try {
    const res = await apiConfig.get("/routine/list");
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getRoutineDetail = async (routineId) => {
  try {
    const res = await apiConfig.get(`/routine/record/${routineId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const postShowAll = async (listData) => {
  try {
    const res = await axios.get(`/post/show/all`, { params: listData });
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const postCreate = async (formData) => {
  try {
    const res = await axios.post(`/post/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (e) {
    console.log(e.response?.data || e.message);
    throw e;
  }
};
export const petInfo = async () => {
  try {
    const res = await apiConfig.post("/pet/info");
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 프로필 업데이트 API 호출 함수
export const updateUserProfile = async (updatedInfo) => {
  try {
    const res = await apiConfig.patch("/user/update", updatedInfo);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
