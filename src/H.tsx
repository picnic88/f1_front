import React from 'react';
import './css/H.css';
import './css/index.css';
import { Link } from "react-router-dom";
import axios from "axios";
import NoticeBoard from './NoticeBoard';
import Announcement from './Announcement';

export default function Head() { // <-- 함수 시작

    const [open, setOpen] = React.useState(false);


    return (
        <div>
            <div className="navbar">
                <p className="n1">새싹</p>
                <p className="n22">메인</p>
                <div className='dropdown-container'
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <span className="n2">커뮤니티</span>
                    {open && (
                        <div className='dropdownMenu'>
                            <Link to='/NoticeBoard'>공지사항</Link>
                            <Link to='/Announcement'>게시판</Link>
                        </div>
                    )}
                </div>
                <p className="n22"><Link to='/Music'>뮤직 스테이션</Link></p>
                <p className="n3"><Link to='/MyPage'>마이페이지</Link></p>
                <p><Link to='/Login'>로그인</Link></p>
            </div>
            <div className='middle'>
                <div className="stripe1"></div>
                <div className="stripe2"></div>
                <div className="stripe3"></div>
                <div className="stripe4"></div>
                <div className="stripe5"></div>
                <div className="stripe6"></div>
                <div className="stripe7"></div>
                <div className="stripe8"></div>
                <div className="stripe9"></div>
                <div className="stripe10"></div>
                <p className='middleText'>Alt + <span className="f1">F1</span> DashBoard</p>
            </div>
            {/* <div className='last'>
                <p className='lastText'>myPage</p>
            </div> */}
        </div>
    )
}
