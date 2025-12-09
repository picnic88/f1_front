import H from "./H.tsx"
import './css/NoticeWrite.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NoticeWrite() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 권한 검사 (페이지 들어오자마자 실행)
    useEffect(() => {
        const isLogin = localStorage.getItem("isLoggedIn");
        const role = localStorage.getItem("role");

        if (isLogin !== "true") {
            alert("로그인이 필요합니다.");
            navigate('/Login');
            return;
        }

        if (role !== "ADMIN") { // 관리자가 아니면 쫓아냄
            alert("관리자만 작성할 수 있습니다!");
            navigate('/NoticeBoard');
        }
    }, [navigate]);

    const handleSubmit = () => {
        const data = {
            title: title,
            content: content,
            boardType: "NOTICE",
            author: localStorage.getItem("loginId") // 저장된 아이디 전송
        };

        axios.post('http://localhost:8081/api/articles', data)
        .then(() => {
            alert("공지 등록 완료!");
            navigate('/NoticeBoard');
        })
        .catch(err => {
            console.error(err);
            alert("등록 실패");
        });
    }

    return (
        <div>
            <H />
            <p className='lastText'>community - notice Write</p>
            <div className='main'>
                <p className='text1'>공지 작성 </p>
                <div className='titleBox'>
                    <p className='titleText'>제목</p>
                    <input className='titleInput' type="text" onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className='contentBox'>
                    <p className='contentText'>내용</p>
                    <input className='contentInput' type="text" onChange={(e)=>setContent(e.target.value)}/>
                </div>
                <button className='submitBtn' onClick={handleSubmit}>작성하기</button>
            </div>
        </div>
    )
}