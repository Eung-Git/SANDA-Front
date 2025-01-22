import React, { useState, useEffect } from "react";
import "./login.css";

function LoginPage({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    major: "",
    verificationCode: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameSuccess, setNicknameSuccess] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer;
    if (isCodeSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCodeSent, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "confirmPassword" || name === "password") {
      if (formData.password === value || (name === "confirmPassword" && formData.password === formData.confirmPassword)) {
        setPasswordError("");
        setPasswordSuccess("비밀번호가 일치합니다.");
      } else {
        setPasswordError("비밀번호가 일치하지 않습니다.");
        setPasswordSuccess("");
      }
    }

    if (name === "confirmNewPassword" || name === "newPassword") {
      if (formData.newPassword === value || (name === "confirmNewPassword" && formData.newPassword === formData.confirmNewPassword)) {
        setPasswordError("");
        setPasswordSuccess("비밀번호가 일치합니다.");
      } else {
        setPasswordError("비밀번호가 일치하지 않습니다.");
        setPasswordSuccess("");
      }
    }
  };

  const resetFormData = () => {
    setFormData({
      username: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      major: "",
      verificationCode: "",
    });
    setPasswordError("");
    setPasswordSuccess("");
    setNicknameError("");
    setEmailError("");
    setEmailSuccess("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^@\s]+@kookmin\.ac\.kr$/;

    if (isSignUp) {
      if (!emailRegex.test(formData.email)) {
        alert("학교 이메일을 입력해주세요. ex) kookmin@kookmin.ac.kr");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다!");
        return;
      }

      alert(`${formData.username}님, 회원가입이 완료되었습니다.`);
      setIsSignUp(false);
      resetFormData();
    } else if (isForgotPassword) {
      if (!emailRegex.test(formData.email)) {
        alert("학교 이메일을 입력해주세요. ex) kookmin@kookmin.ac.kr");
        return;
      }

      if (!isCodeSent) {
        setIsCodeSent(true);
        setTimeLeft(300);
        alert(`인증번호가 ${formData.email}로 전송되었습니다.`);
      } else {
        if (formData.verificationCode === "123456") {
          setIsForgotPassword(false);
          setIsResetPassword(true);
          setIsCodeSent(false);
          setTimeLeft(0);
        } else {
          alert("인증번호가 올바르지 않습니다.");
        }
      }
    } else if (isResetPassword) {
      if (formData.newPassword !== formData.confirmNewPassword) {
        alert("새 비밀번호가 일치하지 않습니다.");
        return;
      }

      alert("비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다.");
      setIsResetPassword(false);
      resetFormData();
    } else {
      alert(`${formData.email}님, 로그인되었습니다.`);
      onLogin();
      resetFormData();
    }
  };

  const handleNicknameCheck = () => {
    if (formData.nickname.trim() === "") {
      setNicknameError("닉네임을 입력해주세요.");
      setNicknameSuccess(""); 
    } else {
      setNicknameError("");
      setNicknameSuccess("사용 가능한 닉네임입니다!");
    }
  };

  const handleEmailCheck = () => {
    if (formData.email.trim() === "") {
      setEmailError("이메일을 입력해주세요.");
      setEmailSuccess("");
    } else if (!/^[^@\s]+@kookmin\.ac\.kr$/.test(formData.email)) {
      setEmailError("올바른 형식의 학교 이메일을 입력해주세요.");
      setEmailSuccess("");
    } else {
      setEmailError("");
      setEmailSuccess("사용 가능한 이메일입니다!");
    }
  };

  return (
    <div className="login-page">
      <h1>
        {isSignUp
          ? "회원가입"
          : isResetPassword
          ? "비밀번호 변경"
          : isForgotPassword
          ? "비밀번호 찾기"
          : "로그인"}
      </h1>
      <form onSubmit={handleFormSubmit}>
        {isSignUp && (
          <>
            <div className="form-group">
              <label htmlFor="username">이름</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nickname">닉네임</label>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={handleNicknameCheck}
                  style={{
                    padding: "0.5rem",
                    fontSize: "12px",
                    color: "white",
                    backgroundColor: "#007bff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  중복 확인
                </button>
              </div>
              {nicknameError && (
                <p className="error-message" style={{ color: "red" }}>
                  {nicknameError}
                </p>
              )}
              {nicknameSuccess && (
                <p className="success-message" style={{ color: "green" }}>
                  {nicknameSuccess}
                </p>
              
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">학교 이메일 (아이디)</label>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={handleEmailCheck}
                  style={{
                    padding: "0.5rem",
                    fontSize: "12px",
                    color: "white",
                    backgroundColor: "#007bff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  중복 확인
                </button>
              </div>
              {emailError && (
                <p className="error-message" style={{ color: "red" }}>
                  {emailError}
                </p>
              )}
              {emailSuccess && (
                <p className="success-message" style={{ color: "green" }}>
                  {emailSuccess}
                </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
              {passwordSuccess && (
                <p className="success-message">{passwordSuccess}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="major">전공</label>
              <select
                id="major"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                required
              >
                <option value="">전공을 선택하세요</option>
                <option value="소프트웨어학부">소프트웨어학부</option>
                <option value="인공지능학부">인공지능학부</option>
                <option value="타과">타과</option>
              </select>
            </div>
          </>
        )}
        {!isResetPassword && !isSignUp && (isForgotPassword || !isSignUp) && (
          <div className="form-group">
            <label htmlFor="email">학교 이메일 (아이디)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {!isForgotPassword && !isResetPassword && !isSignUp && (
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {isResetPassword && (
          <>
            <div className="form-group">
              <label htmlFor="newPassword">새 비밀번호</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">새 비밀번호 확인</label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
                required
              />
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
              {passwordSuccess && (
                <p className="success-message">{passwordSuccess}</p>
              )}
            </div>
          </>
        )}
        {isForgotPassword && isCodeSent && (
          <>
            <div className="form-group">
              <label htmlFor="verificationCode">인증번호</label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <p>남은 시간: {formatTime(timeLeft)}</p>
          </>
        )}
        <button type="submit" style={{ width: "100%" }}>
          {isSignUp
            ? "회원가입"
            : isResetPassword
            ? "비밀번호 변경"
            : isForgotPassword
            ? isCodeSent
              ? "확인"
              : "비밀번호 찾기"
            : "로그인"}
        </button>
      </form>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", gap: "10px" }}>
        {!isForgotPassword && !isResetPassword && (
          <button
            className="toggle-button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              resetFormData();
            }}
            style={{ flex: "1", maxWidth: "200px" }}
          >
            {isSignUp ? "이미 계정이 있으신가요? 로그인" : "계정이 없으신가요? 회원가입"}
          </button>
        )}
        {!isSignUp && !isForgotPassword && !isResetPassword && (
          <button
            className="toggle-button"
            onClick={() => {
              setIsForgotPassword(true);
              resetFormData();
            }}
            style={{ flex: "1", maxWidth: "200px" }}
          >
            비밀번호 찾기
          </button>
        )}
      </div>
      {isForgotPassword && !isResetPassword && (
        <button
          className="toggle-button"
          onClick={() => {
            setIsForgotPassword(false);
            setIsCodeSent(false);
            setTimeLeft(0);
            resetFormData();
          }}
        >
          로그인으로 돌아가기
        </button>
      )}
      {isResetPassword && (
        <button
          className="toggle-button"
          onClick={() => {
            setIsResetPassword(false);
            resetFormData();
          }}
        >
          로그인으로 돌아가기
        </button>
      )}
    </div>
  );
}

export default LoginPage;
