import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const MyPageMain = () => {
  const navigate = useNavigate();

  return (
    <div className="mypage-main">
      <h2>마이페이지</h2>
      <p>왼쪽 메뉴를 선택하세요.</p>

    </div>
  );
};

export default MyPageMain;
