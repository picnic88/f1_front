import H from "./H.tsx"
import './css/BoardWrite.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BoardWrite() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    //로그인 검사
    useEffect(() => {
        const isLogin = localStorage.getItem("isLoggedIn");
        if (isLogin !== "true") {
            alert("로그인 후 작성 가능합니다.");
            navigate('/Login');
        }
    }, [navigate]);

    const handleSubmit = () => {
        const data = {
            title: title,
            content: content,
            boardType: "BOARD",
            author: localStorage.getItem("loginId") // 저장된 아이디 전송
        };

        axios.post('http://localhost:8081/api/articles', data)
        .then(() => {
            alert("글 작성 완료!");
            navigate('/Announcement');
        })
        .catch(err => {
            console.error(err);
            alert("등록 실패");
        });
    }
    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>community - boardWrite</p>
            </div>
            <div className='main'>
                <p className='text1'>게시글 작성</p>
                <div className='titleBox'>
                    <p className='titleText'>제목</p>
                    <input className='titleInput' type="text" onChange={(e)=>setTitle(e.target.value)} />
                </div>
                <div className='contentBox'>
                    <p className='contentText'>내용</p>
                    <input className='contentInput' type="text" onChange={(e)=>setContent(e.target.value)} />
                </div>
                <button className='submitBtn' onClick={handleSubmit}>작성하기</button>
            </div>
        </div>
    )
}