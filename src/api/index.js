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

// 로그인
export const loginUser = async (user) => {
  try {
    const res = await apiConfig.post("/user/login", user);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 회원가입
export const registerUser = async (userInfo) => {
  try {
    const res = await apiConfig.post("/user/register", userInfo);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 펫 등록
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

// 펫 정보 조회 (post임)
export const petInfo = async () => {
  try {
    const res = await apiConfig.post("/pet/info");
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 닉네임 체크
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

// 이메일 체크
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

// 루틴 디테일 조회
export const getRoutineDetail = async (routineId) => {
  try {
    const res = await apiConfig.get(`/routine/record/${routineId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 산책 정보 저장
export const createWalkRecord = async (walkRecordData) => {
  try {
    const res = await apiConfig.post("/record/save", walkRecordData);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 산책 정보 조회
export const fetchWalkRecord = async (year, month) => {
  try {
    const res = await apiConfig.get(`/record/month/${year}/${month}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const createPost = async (formData) => {
  try {
    const res = await apiConfig.post("/post/create", formData, {
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

export const fetchPost = async () => {
  try {
    const res = await apiConfig.get("/post/show");
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 게시글 목록 조회
export const postShowAll = async (listData) => {
  try {
    const res = await apiConfig.get(`/post/show/all`, { params: listData });
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 게시글 상세 조회
export const postShow = async (postId) => {
  try {
    const res = await apiConfig.get(`/post/show/${postId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 게시글 작성
export const postCreate = async (formData) => {
  try {
    const res = await apiConfig.post(`/post/create`, formData, {
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

// 댓글 작성
export const postComment = async (commentData) => {
  try {
    const res = await apiConfig.post("/post/comment", commentData);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 좋아요 누르기
export const inHeart = async (postId) => {
  try {
    const res = await apiConfig.get(`/post/heart/insert/${postId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 좋아요 누르기 취소
export const delHeart = async (postId) => {
  try {
    const res = await apiConfig.get(`/post/heart/delete/${postId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const modifyUser = async (userData) => {
  try {
    const res = await apiConfig.post(`/user/modify/user`, userData);
    return res.data;
  } catch (e) {
    console.error("Error details:", {
      message: e.message,
      response: e.response ? e.response.data : null,
      config: e.config,
    });
    throw e;
  }
};
