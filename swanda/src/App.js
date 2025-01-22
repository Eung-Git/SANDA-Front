import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./MainPage/sidebar";
import Main from "./MainPage/main";
import Header from "./Header/header";
import Login from "./LoginPage/login";
import "./App.css";

function App() {
    // 로그인 상태 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 초기값: 비로그인 상태
    const [nickname, setnickname] = useState(""); // 로그인한 사용자 이름

    // 로그인 함수
    const handleLogin = (name) => {
        setIsLoggedIn(true);
        setnickname(name); // 사용자 이름 설정
    };

    // 로그아웃 함수
    const handleLogout = () => {
        setIsLoggedIn(false);
        setnickname("");
    };

    return (
        <Router>
            <div className="container">
                <Header isLoggedIn={isLoggedIn} nickname={nickname} onLogout={handleLogout} />

                <Routes>
                    <Route path="/" element={
                        <div className="content">
                            <Sidebar />
                            <Main />
                        </div>
                    } />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

// 간단한 버튼 스타일
const styles = {
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default App;
