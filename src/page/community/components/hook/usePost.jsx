// import { DiaryStateContext } from "../App";
// import { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// const useDiary = (id) => {
//   const data = useContext(DiaryStateContext);
//   const nav = useNavigate();
//   const [curDiaryItem, setCurDiaryItem] = useState();
//   useEffect(() => {
//     const currentDiaryItem = data.find(
//       (item) => String(item.id) === String(id)
//     );
//     if (!currentDiaryItem) {
//       window.alert("잘못된 접근임.");
//       nav("/", { replace: true });
//     }
//     setCurDiaryItem(currentDiaryItem);
//   }, [id, data]);
//   return curDiaryItem;
// };
// export default useDiary;
