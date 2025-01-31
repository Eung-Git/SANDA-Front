import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./sidebar";
import Main from "./MainPage/main";
import Header from "./Header/header";
import Login from "./LoginPage/login";
import MyPage from "./MyPage/myPageMain";
import PostList from "./MyPage/postList";
import CommentList from "./MyPage/commentList";
import ScrapList from "./MyPage/scrapList";
import LikedList from "./MyPage/likedList";
import "./App.css";

function App() {
    // 로그인 상태 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 초기값: 비로그인 상태
    const [nickname, setNickname] = useState(""); // 로그인한 사용자 이름
    const [activeTab, setActiveTab] = useState(""); // 마이페이지 내 선택된 탭

    // 로그인 함수
    const handleLogin = (name) => {
        setIsLoggedIn(true);
        setNickname(name); // 사용자 이름 설정
    };

    // 로그아웃 함수
    const handleLogout = () => {
        setIsLoggedIn(false);
        setNickname("");
    };

    return (
        <Router>
            <div className="container">
                <Header isLoggedIn={isLoggedIn} nickname={nickname} onLogout={handleLogout} />

                <Routes>
                    {/* 메인 페이지 */}
                    <Route path="/" element={
                        <div className="content">
                            <Sidebar isMyPage={false} /> {/* 기본 사이드바 */}
                            <Main />
                        </div>
                    } />
                    
                    {/* 로그인 페이지 */}
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />

                    {/* 마이페이지 */}
                    <Route path="/mypage" element={
                        <div className="content">
                            <Sidebar isMyPage={true} setActiveTab={setActiveTab} />
                            <MyPage setActiveTab={setActiveTab} />
                        </div>
                    } />

                    {/* 마이페이지 내부 콘텐츠 라우팅 */}
                    <Route path="/mypage/posts" element={
                        <div className="content">
                            <Sidebar isMyPage={true} setActiveTab={setActiveTab} />
                            <PostList />
                        </div>
                    } />
                    <Route path="/mypage/comments" element={
                        <div className="content">
                            <Sidebar isMyPage={true} setActiveTab={setActiveTab} />
                            <CommentList />
                        </div>
                    } />
                    <Route path="/mypage/scraps" element={
                        <div className="content">
                            <Sidebar isMyPage={true} setActiveTab={setActiveTab} />
                            <ScrapList />
                        </div>
                    } />
                    <Route path="/mypage/likes" element={
                        <div className="content">
                            <Sidebar isMyPage={true} setActiveTab={setActiveTab} />
                            <LikedList />
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
