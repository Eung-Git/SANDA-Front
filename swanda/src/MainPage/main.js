import React, { useState, useRef } from "react";
import "./main.css"; // CSS 파일 불러오기

const Main = () => {
    const [question, setQuestion] = useState("");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null); // 첨부 파일 상태
    const fileInputRef = useRef(null);

    const handleSubmit_question = (event) => {
        event.preventDefault();
        if (question.trim() === "" || title.trim() === "") {  // 띄어쓰기만 입력했을 때
            alert("제목과 질문을 모두 입력해주세요.");
            return;
        }
        console.log("제목:", title);
        console.log("질문:", question);
        if (file) {
            console.log("첨부된 파일:", file.name);
        } else {
            console.log("첨부 파일 없음");
        }
        setQuestion(""); // 질문 입력란 초기화
        setTitle(""); // 제목 입력란 초기화
        setFile(null); // 파일 상태 초기화

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // 첫 번째 선택된 파일 설정 // 파일이 여러개일 경우
    };

    return (
        <div className="main-container">
            {/* 제목 입력 */}
            <div className="inputBox">
                <h2 className="heading">제목 입력</h2>
                <textarea
                    className="textarea"
                    placeholder="여기에 제목을 입력하세요..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* 질문 입력 */}
            <div className="inputBox">
                <h2 className="heading">질문 입력</h2>
                <form onSubmit={handleSubmit_question} className="form">
                    <textarea
                        className="textarea"
                        placeholder="여기에 질문을 입력하세요..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .mp4, .pdf, .img, .png"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="fileInput"
                    />
                    <button type="submit" className="button">
                        질문하기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Main;
