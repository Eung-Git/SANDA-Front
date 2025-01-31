import React, { useState, useRef } from "react";
import axios from "axios";
import { FaRegFileImage } from "react-icons/fa"; // .jpg, .jpeg, .img, .png
import { FaRegFilePdf } from "react-icons/fa"; // .pdf
import { FaRegFileCode } from "react-icons/fa"; // .py, .java, .cpp
import { FaRegFileVideo } from "react-icons/fa"; // .mp4
import { FaRegFileAlt } from "react-icons/fa"; // .txt
import "./main.css";

const Main = () => {
    const [question, setQuestion] = useState("");
    const [title, setTitle] = useState("");
    const [files, setFiles] = useState([]); // 첨부 파일 리스트
    const fileInputRef = useRef(null);

    const getFileIcon = (fileName) => {
        const extension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();
        if ([".jpg", ".jpeg", ".img", ".png"].includes(extension)) {
            return <FaRegFileImage />;
        } else if (extension === ".pdf") {
            return <FaRegFilePdf />;
        } else if ([".py", ".java", ".cpp"].includes(extension)) {
            return <FaRegFileCode />;
        } else if (extension === ".mp4") {
            return <FaRegFileVideo />;
        } else if (extension === ".txt") {
            return <FaRegFileAlt />;
        }
    };

    const handleFileChange = (event) => {
        const allowedExtensions = [".jpg", ".jpeg", ".mp4", ".pdf", ".img", ".png", ".txt", ".py", ".java", ".cpp"];
        const selectedFiles = Array.from(event.target.files);
    
        // 파일 필터링
        const validFiles = selectedFiles.filter((file) => {
            const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                alert(`지원되지 않는 파일 형식입니다: ${file.name}`);
                return false;
            }
            return true;
        });
    
        if (validFiles.length > 0) {
            setFiles((prevFiles) => [...prevFiles, ...validFiles]);
        }
    
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // 동일 파일 다시 선택 가능하도록 초기화
        }
    };
    
    // 파일 삭제 기능
    const handleFileRemove = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    // 폼 제출 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (title.trim() === "" || question.trim() === "") {
            alert("제목과 질문을 모두 입력해주세요.");
            return;
        }

        const response = await axios.post(`${process.env.REACT_APP_ADDRESS}/post/question_create/`,
            {
                "title": "테스트",
                "content": "테스트"
            },
        );

        console.log("제목:", title);
        console.log("질문:", question);
        console.log("첨부된 파일:", files.map((file) => file.name));

        // 제출 후 입력 초기화
        setTitle("");
        setQuestion("");
        setFiles([]);

        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
        alert("질문이 제출되었습니다.");
    };

    return (
        <div className="main-container">
            <form onSubmit={handleSubmit} className="form">
                <div className="inputBox">
                    <h1 className="heading">제목 입력</h1>
                    <textarea
                        className="textarea"
                        placeholder="여기에 제목을 입력하세요..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="inputBox">
                    <h2 className="heading">질문 입력</h2>
                    <textarea
                        className="textarea"
                        placeholder="여기에 질문을 입력하세요..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>

                <div className="inputBox">
                    <h2 className="heading">첨부 파일</h2>

                    {/* 파일 선택 버튼 */}
                    <div className="custom-file-upload">
                        <button
                            type="button"
                            className="file-upload-btn"
                            onClick={() => fileInputRef.current.click()}
                        >
                            파일 선택
                        </button>
                        <span className="file-name">
                            {files.length > 0 ? `${files.length}개의 파일 선택됨` : "파일을 선택해주세요"}
                        </span>
                    </div>

                    <input
                        type="file"
                        accept=".jpg, .jpeg, .mp4, .pdf, .img, .png, .txt, .py, .java, .cpp"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden-file-input"
                        multiple
                    />

                    <ul className="file-list">
                        {files.map((file, index) => (
                            <li key={index}>
                                <div className="file-item">
                                    {getFileIcon(file.name)}
                                    {file.name}
                                </div>
                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => handleFileRemove(index)}
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 제출 버튼 */}
                <button type="submit" className="button">
                    질문하기
                </button>
            </form>
        </div>
    );
};

export default Main;
