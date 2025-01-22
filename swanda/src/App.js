import React, { useState } from "react";
import Sidebar from "./MainPage/sidebar";
import Main from "./MainPage/main";
import LoginPage from "./LoginPage/login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 기본값을 true로 설정하여 메인 페이지가 먼저 렌더링되도록 함

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <>
          <Sidebar />
          <Main />
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

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
