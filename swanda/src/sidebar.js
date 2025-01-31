import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ isMyPage, setActiveTab }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h1 className="title">질문을 통해 지식을 공유하세요!</h1>

      {/* 마이페이지일 때만 추가 버튼 표시 */}
      {isMyPage && (
        <div className="mypage-buttons">
          <button onClick={() => navigate("/mypage/posts")}>내가 쓴 글</button>
          <button onClick={() => navigate("/mypage/comments")}>내가 쓴 댓글</button>
          <button onClick={() => navigate("/mypage/scraps")}>스크랩한 글</button>
          <button onClick={() => navigate("/mypage/likes")}>좋아요 누른 글</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
