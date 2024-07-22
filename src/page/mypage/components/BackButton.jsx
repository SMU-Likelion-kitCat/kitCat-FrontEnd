import React from "react";

const BackButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="BackButton">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.2275 3.89205C20.6553 4.37385 20.6115 5.11124 20.1297 5.53906L10.601 14.0001L20.1186 22.4614C20.6001 22.8895 20.6434 23.627 20.2153 24.1085C19.7872 24.59 19.0498 24.6334 18.5682 24.2053L8.89658 15.6069L8.89251 15.6033C7.92092 14.7314 7.92092 13.2687 8.89251 12.3967L8.89709 12.3926L8.8971 12.3926L18.5804 3.7943C19.0622 3.36648 19.7996 3.41024 20.2275 3.89205Z"
          fill="#393939"
        />
      </svg>
    </button>
  );
};

export default BackButton;
