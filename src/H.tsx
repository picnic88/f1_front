import React, { useState } from 'react';
import './css/H.css';
import './css/index.css';
import { Link, useNavigate } from "react-router-dom";

export default function Head() {
    const [open, setOpen] = useState(false);
    
    const isLogin = localStorage.getItem("isLoggedIn") === "true";
    // 저장된 권한 가져오기 (없으면 빈 문자열)
    const userRole = localStorage.getItem("role") || "";

    const handleLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.clear(); 
            alert("로그아웃 되었습니다.");
            window.location.href = "/"; 
        }
    };

    // 스타일 정의
    const textStyle = { whiteSpace: 'nowrap' as const };
    const cursorStyle = { ...textStyle, cursor: 'pointer' };

    return (
        <div>
            <div className="navbar">
                <p className="n1" style={textStyle}><Link to='/'>새싹</Link></p>
                <p className="n22" style={textStyle}><Link to='/'>메인</Link></p>
                
                <div className='dropdown-container'
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <span className="n2" style={textStyle}>커뮤니티</span>
                    {open && (
                        <div className='dropdownMenu'>
                            <Link to='/NoticeBoard'>공지사항</Link>
                            <Link to='/Announcement'>게시판</Link>
                        </div>
                    )}
                </div>
                
                <p className="n22" style={textStyle}><Link to='/Music'>뮤직 스테이션</Link></p>

                {isLogin ? (
                    <>
                        {/* 권한이 ADMIN이면 '관리자' 버튼, 아니면 '마이페이지' 버튼 */}
                        {userRole === "ADMIN" ? (
                            <p className="n3" style={{...textStyle, color: '#ff4d4d', fontWeight:'bold'}}>
                                <Link to='/Management'>관리자</Link>
                            </p>
                        ) : (
                            <p className="n3" style={textStyle}>
                                <Link to='/MyPage'>마이페이지</Link>
                            </p>
                        )}

                        {/* 로그아웃 버튼 (공통) */}
                        <p style={cursorStyle} onClick={handleLogout}>
                            로그아웃
                        </p>
                    </>
                ) : (
                    <>
                        <p className="n3" style={textStyle}><Link to='/MemberRegister'>회원가입</Link></p>
                        <p style={textStyle}><Link to='/Login'>로그인</Link></p>
                    </>
                )}
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
                <p className='middleText' style={textStyle}>Alt + <span className="f1">F1</span> DashBoard</p>
            </div>
        </div>
    )
}