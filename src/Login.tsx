import H from "./H.tsx"
import './css/Login.css';
import axios from "axios";
import { useState } from "react";

interface LoginProps {
    setIsLoggedIn: (value: boolean) => void;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const jsonData = { loginId, password };

        axios.post('http://localhost:8081/loginProc', jsonData, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            if (res.data.status === "ok") {
                 alert("로그인 성공!");
                 
                 //로그인 정보를 브라우저에 저장
                 localStorage.setItem("isLoggedIn", "true");
                 localStorage.setItem("role", res.data.role); 
                 localStorage.setItem("nickname", res.data.nickname);
                 localStorage.setItem("loginId", loginId); //아이디 저장

                 setIsLoggedIn(true);
                 window.location.href = "/"; 
            } else {
                 alert("아이디 또는 비밀번호가 틀렸습니다.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("서버 연결 실패");
        });
    };

    return (
        <div>
            <H />
            <div className='last'><p className='lastText'>Login</p></div>
            <div className='main'>
                <p className='text1'>로그인</p>
                <div className='titleBox'>
                    <p className='titleText'>아이디</p>
                    <input className='titleInput' type="text" onChange={(e)=>setLoginId(e.target.value)}/>
                </div>
                <div className='contentBox'>
                    <p className='contentText'>비밀번호</p>
                    <input className='contentInput' type="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className='submitBtn' onClick={handleLogin}>로그인하기</button>
                <div className="memberRegister" onClick={()=> window.location.href='/MemberRegister'} style={{cursor:'pointer', marginTop:'10px'}}>회원가입하기</div>
            </div>
        </div>
    )
}