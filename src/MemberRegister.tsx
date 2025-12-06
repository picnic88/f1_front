import H from "./H.tsx"
import './css/MemberRegister.css';
import { Link } from "react-router-dom";
import axios from "axios";

export default function MemberRegister() {
    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>MemberRegister</p>
            </div>
            <div className='main'>
                <p className='text1'>회원가입</p>
                <div className='titleBox'>
                    <p className='titleText'>아이디</p>
                    <input className='titleInput' type="text" />
                </div>
                <div className='contentBox'>
                    <p className='contentText'>비밀번호</p>
                    <input className='contentInput' type="text" />
                </div>
                <button className='submitBtn'><Link to='/MyPage'>회원가입 완료</Link></button>
            </div>
        </div>
    )
}