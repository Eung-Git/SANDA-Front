import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailVerificationTimeLeft, setEmailVerificationTimeLeft] = useState(300);
  const [showVerificationInput, setShowVerificationInput] = useState(false);


  useEffect(() => {
    let timer;
    
    if ((isCodeSent && timeLeft > 0) || (isVerificationCodeSent && emailVerificationTimeLeft > 0)) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        setEmailVerificationTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [isCodeSent, timeLeft, isVerificationCodeSent, emailVerificationTimeLeft]);
  

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

    if (name === "nickname") {
      setNicknameError("");
      setNicknameSuccess("");
    }

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

  const handleSendVerificationCode = async () => {
    if (!/^[^@\s]+@kookmin\.ac\.kr$/.test(formData.email)) {
        alert("학교 이메일을 입력해주세요. ex) user@kookmin.ac.kr");
        return;
    }

    try {
        const response = await axios.post("http://127.0.0.1:8000/user/sendcode/", {
            email: formData.email,
        });

        console.log(response.data);

        if (response.data.detail) {
            setIsCodeSent(true); // 인증번호 입력란 활성화
            setTimeLeft(300); // 타이머 시작 (5분)
            alert(`인증번호가 ${formData.email}로 전송되었습니다.`);
        } else {
            alert("인증번호 전송에 실패했습니다.");
        }
    } catch (error) {
        console.error("인증번호 전송 오류:", error);
        alert("서버 오류로 인증번호 전송에 실패했습니다.");
    }
};

const handleFindPassword = async () => {
    if (!formData.email) {
        alert("이메일을 입력해주세요.");
        return;
    }

    if (!isCodeSent) { 
        alert("이메일을 입력하고 인증번호를 요청하세요.");
        return;
    }

    if (!formData.verificationCode) { 
        alert("인증번호를 입력해주세요.");
        return;
    }

    try {
        const response = await axios.post("http://127.0.0.1:8000/user/findpassword/", {
            email: formData.email,
            code: formData.verificationCode,
        });

        if (response.data.detail === "비밀번호가 재설정되었습니다.") {
            alert(`비밀번호가 재설정되었습니다. 새 비밀번호: ${response.data.password}`);
            setIsForgotPassword(false);
            resetFormData();
        } else {
            alert("인증번호가 올바르지 않습니다.");
        }
    } catch (error) {
        console.error("🚨 비밀번호 찾기 오류:", error);
        alert("서버 오류로 비밀번호 찾기에 실패했습니다.");
    }
};

  
  
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^@\s]+@kookmin\.ac\.kr$/;

    if (isSignUp) {
      if (!emailRegex.test(formData.email)) {
        alert("학교 이메일을 입력해주세요. ex) kookmin@kookmin.ac.kr");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
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
        await handleSendVerificationCode();
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

  const handleNicknameCheck = async () => {
    if (formData.nickname.trim() === "") {
      setNicknameError("닉네임을 입력해주세요.");
      setNicknameSuccess("");
      return;
    }
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/user/checknickname/", {
        nickname: formData.nickname,
      });

      console.log(response.data);
  
      if (response.data.nickname === formData.nickname) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        setNicknameSuccess("");
      } else {
        setNicknameError("");
        setNicknameSuccess("사용 가능한 닉네임입니다!");
      }
    } catch (error) {
      setNicknameError("서버와 통신 중 문제가 발생했습니다.");
      setNicknameSuccess("");
      console.error(error); //닉네임 중복확인
    }
  };
  


  const handleEmailCheck = async () => {
    if (!/^[^@\s]+@kookmin\.ac\.kr$/.test(formData.email)) {
        setEmailError("학교 이메일을 입력해주세요. ex) user@kookmin.ac.kr");
        return;
    }

    try {
      //이메일 중복 확인과 동시에 인증코드 전송
      const response = await axios.post("http://127.0.0.1:8000/user/checkemail/", {
        email: formData.email,
      });
  
      if (response.data.exists) {
        setEmailError("이미 사용 중인 이메일입니다.");
        setIsEmailAvailable(false);
      } else {
        setEmailSuccess("사용 가능한 이메일입니다!");
        setIsEmailAvailable(true);

        console.log("인증번호 전송 및 입력란 표시");
        setShowVerificationInput(true);
        setIsVerificationCodeSent(true);
        setEmailVerificationTimeLeft(300);

        alert(`인증번호가 ${formData.email}로 전송되었습니다.`);
      }
    } catch (error) {
      setEmailError("이메일 중복 확인 또는 인증 코드 전송에 실패했습니다.");
    }
  };


  const handleVerifyEmailCode = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/user/confirmemail/", {
        email: formData.email,
        code: formData.verificationCode,
      });

      console.log(response.data.detail)
  
      if (response.data.detail === '인증 성공') {
        setIsEmailVerified(true);
        alert("이메일 인증이 완료되었습니다.");
      } else {
        alert("인증번호가 올바르지 않습니다.");
      }
    } catch (error) {
      alert("서버 오류로 인증을 실패했습니다.");
    }
  };

  const handleSignup = async () => {
    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/user/signup/", {
        username: formData.username,
        password: formData.password,
        password2: formData.confirmPassword,
        email: formData.email,
        nickname: formData.nickname,
        major: parseInt(formData.major, 10),
      });
  
      if (response.status === 201) {
        alert("회원가입이 완료되었습니다!");
        setIsSignUp(false);
        resetFormData();
      }
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };
/////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="body">
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
                <div style={{ display: "flex", gap: "5px" }}>
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

              {(isVerificationCodeSent || showVerificationInput) && (
                <div className="form-group">
                  <label htmlFor="verificationCode">인증번호</label>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <input
                      type="text"
                      id="verificationCode"
                      name="verificationCode"
                      value={formData.verificationCode}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleVerifyEmailCode}
                      disabled={isEmailVerified}
                      style={{
                        padding: "0.5rem",
                        fontSize: "12px",
                        color: "white",
                        backgroundColor: isEmailVerified ? "#6c757d" : "#ffc107",
                        border: "none",
                        borderRadius: "4px",
                        cursor: isEmailVerified ? "not-allowed" : "pointer",
                      }}
                    >
                      인증 확인
                    </button>
                  </div>
                  <p>남은 시간: {formatTime(emailVerificationTimeLeft)}</p>
                  {isEmailVerified && (
                    <p className="success-message" style={{ color: "green" }}>
                      이메일 인증 완료
                    </p>
                  )}
                </div>
              )}



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
          {isForgotPassword && (
  <>
    <div className="form-group">
    </div>
    {isCodeSent && (
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
    )}
  </>
)}
          {isSignUp ? (
            <button type="button" onClick={handleSignup} style={{ width: "100%" }}>
              회원가입
            </button>
          ) : (
            <button 
  type="submit" 
  onClick={isForgotPassword ? handleFindPassword : undefined} // ✅ 초록 버튼 기능 추가
  style={{ width: "100%" }}
>
  {isResetPassword
    ? "비밀번호 변경"
    : isForgotPassword
    ? isCodeSent
      ? "확인"
      : "비밀번호 찾기"
    : "로그인"}
</button>
          )}

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
    </div>
    );
  }

export default LoginPage;
