import React, { useState, useRef, useEffect } from "react";

const Main = () => {
    const [question, setQuestion] = useState("");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null); // 첨부 파일 상태
    const fileInputRef = useRef(null);

    const handleSubmit_question = (event) => {
        event.preventDefault();
        if (question.trim() === "" || title.trim() === "") {
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
        setFile(event.target.files[0]); // 첫 번째 선택된 파일 설정
    };

    return (
        <div style={styles.container}>
            {/* 제목 입력 */}
            <div style={styles.inputBox}>
                <h2 style={styles.heading}>제목 입력</h2>
                <textarea
                    style={styles.textarea}
                    placeholder="여기에 제목을 입력하세요..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* 질문 입력 */}
            <div style={styles.inputBox}>
                <h2 style={styles.heading}>질문 입력</h2>
                <form onSubmit={handleSubmit_question} style={styles.form}>
                    <textarea
                        style={styles.textarea}
                        placeholder="여기에 질문을 입력하세요..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={styles.fileInput}
                    />
                    <button type="submit" style={styles.button}>
                        질문하기
                    </button>
                </form>
            </div>
        </div>
    );
};

// 스타일 정의
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
    },
    inputBox: {
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        boxSizing: "border-box",
    },
    heading: {
        fontSize: "22px",
        marginBottom: "10px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    textarea: {
        width: "100%",
        height: "100px",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        resize: "none",
        boxSizing: "border-box",
    },
    fileInput: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        cursor: "pointer",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        alignSelf: "flex-start",
    },
};

export default Main;
