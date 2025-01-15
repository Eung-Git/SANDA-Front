import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./MainPage/sidebar";
import Main from "./MainPage/main";
import Header from "./Header/header";
import "./App.css";

function App() {
    // 로그인 상태 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 초기값: 비로그인 상태
    const [userName, setUserName] = useState(""); // 로그인한 사용자 이름

    // 로그인 함수
    const handleLogin = (name) => {
        setIsLoggedIn(true);
        setUserName(name); // 사용자 이름 설정
    };

    // 로그아웃 함수
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName("");
    };

    return (
        <Router>
            <div className="container">
                <Header isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />

                {/* 로그인 테스트 버튼 */}
                <div style={{ marginTop: "50px", textAlign: "center" }}>
                    {!isLoggedIn ? (
                        <button onClick={() => handleLogin("TestUser")} style={styles.button}>
                            Test Login
                        </button>
                    ) : (
                        <button onClick={handleLogout} style={styles.button}>
                            Test Logout
                        </button>
                    )}
                </div>

                <Routes>
                    <Route path="/" element={
                        <div className="content">
                            <Sidebar />
                            <Main />
                        </div>
                    } />
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
