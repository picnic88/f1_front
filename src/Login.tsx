import H from "./H.tsx"
import './css/Login.css';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>Login</p>
            </div>
            <div className='main'>
                <p className='text1'>로그인</p>
                <div className='titleBox'>
                    <p className='titleText'>아이디</p>
                    <input className='titleInput' type="text" />
                </div>
                <div className='contentBox'>
                    <p className='contentText'>비밀번호</p>
                    <input className='contentInput' type="text" />
                </div>
                <button className='submitBtn'><Link to='/MyPage'>로그인하기</Link></button>
                <div className="member">회원이 아니신가요?</div>
                <div className="memberRegister"><Link to='/MemberRegister'>회원가입하기</Link></div>
            </div>
        </div>
    )
}