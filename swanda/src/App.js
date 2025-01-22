import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./MainPage/sidebar";
import Main from "./MainPage/main";
import Header from "./Header/header";
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
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Arial', sans-serif",
    flexDirection: "column",
  },
  logoutButton: {
    alignSelf: "flex-end",
    margin: "10px",
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#FF4136",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default App;
