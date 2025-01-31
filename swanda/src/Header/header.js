import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "./header.css";

const Header = ({ isLoggedIn, nickname, onLogout }) => {
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

    return (
        <header className="header">
            <nav className="logo">
                <Link to="/" className="logo-link">Swanda</Link>
            </nav>
            <nav className="nav">
                <Link to="/" className="nav-link">Home</Link>
                {isLoggedIn ? (
                    <>
                        {/* 로그인 상태: 로그아웃 버튼 및 프로필 아이콘 */}
                        <button onClick={onLogout} className="nav-link-button">로그아웃</button>
                        <span className="nav-icon" onClick={() => navigate("/mypage")} style={{ cursor: "pointer" }}>
                            <FontAwesomeIcon icon={faCircleUser} size="lg" />
                        </span>
                    </>
                ) : (
                    <>
                        {/* 비로그인 상태: 로그인 및 회원가입 버튼 */}
                        <Link to="/login" className="nav-link">로그인</Link>
                        <Link to="/signup" className="nav-link">회원가입</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
