import H from "./H.tsx"
import './css/MemberRegister.css';
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useState } from "react";

export default function MemberRegister() {
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const handleRegister = () => {
        // JSON 객체.
        const jsonData = {
            loginId: loginId,
            password: password,
            nickname: nickname,
            role: "USER"
        };

        // 백엔드(8081)로 전송
        axios.post('http://localhost:8081/joinProc', jsonData, {
            headers: {
                'Content-Type': 'application/json' // JSON 보낸다고 명시
            }
        })
        .then(res => {
            if (res.data === "ok") {
                alert("가입 성공! 로그인 해주세요.");
                navigate('/Login');
            } else {
                alert("가입 실패 (서버 로그 확인 필요)");
            }
        })
        .catch(err => {
            console.error("에러 발생:", err);
            alert("서버 연결 실패 (백엔드 8081 켜져있나요?)");
        });
    };

    return (
        <div>
            <H />
            <div className='last'><p className='lastText'>MemberRegister</p></div>
            <div className='main'>
                <p className='text1'>회원가입</p>
                <div className='titleBox'>
                    <p className='titleText'>아이디</p>
                    <input className='titleInput' type="text" onChange={(e)=>setLoginId(e.target.value)}/>
                </div>
                <div className='contentBox'>
                    <p className='contentText'>비밀번호</p>
                    <input className='contentInput' type="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className='contentBox'>
                    <p className='contentText'>닉네임</p>
                    <input className='contentInput' type="text" onChange={(e)=>setNickname(e.target.value)}/>
                </div>
                <button className='submitBtn' onClick={handleRegister}>회원가입 완료</button>
            </div>
        </div>
    )
}