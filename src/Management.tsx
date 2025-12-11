import React, { useEffect, useState } from 'react';
import H from './H.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Login.css'; // ✅ 로그인 스타일(titleBox, contentBox 등)을 쓰기 위해 추가

export default function Management() {
    const navigate = useNavigate();
    
    // 화면 상태 관리 (false: 메뉴 목록, true: 수정 화면)
    const [isEditing, setIsEditing] = useState(false);

    // 수정할 데이터 상태
    const loginId = localStorage.getItem("loginId");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "");

    const handleUpdate = () => {
        if (!password && !nickname) {
            alert("변경할 내용을 입력해주세요.");
            return;
        }

        const data = { password, nickname };

        axios.patch(`http://localhost:8081/api/members/${loginId}`, data)
            .then(() => {
                alert("관리자 정보가 수정되었습니다.");
                if (nickname) localStorage.setItem("nickname", nickname);
                
                setPassword("");
                setIsEditing(false); // 수정 끝나면 다시 메뉴로 돌아가기
                window.location.reload();
            })
            .catch(err => alert("수정 실패: " + err.message));
    };

    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>myPage</p>
            </div>
            <div className='main'>
                {/* 제목은 상황에 따라 바뀜 */}
                <p className='text1'>{isEditing ? '내 정보 수정' : '관리자 페이지'}</p>

                {!isEditing ? (
                    <>
                        <p className='text2' onClick={() => setIsEditing(true)} style={{cursor:'pointer'}}>
                            회원정보 수정
                        </p>
                        <p className="hr"><hr /></p>
                        
                        <p className='text3' onClick={() => navigate('/MyBoard')} style={{cursor:'pointer'}}>
                            나의 게시글
                        </p>
                        <p className="hr"><hr /></p>
                        
                        <p className='text4' onClick={() => navigate('/NoticeWrite')} style={{cursor:'pointer'}}>
                            공지 작성
                        </p>
                        <p className="hr"><hr /></p>
                        
                        <p className='text3' onClick={() => navigate('/BoardManage')} style={{cursor:'pointer'}}>
                            전체 게시글
                        </p>
                    </>
                ) : (
                    <>
                        <div className='titleBox'>
                            <p className='titleText'>새 비밀번호</p>
                            <input 
                                className='titleInput' 
                                type="password" 
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="변경할 비밀번호"
                            />
                        </div>
                        <div className='contentBox'>
                            <p className='contentText'>새 닉네임</p>
                            <input 
                                className='contentInput' 
                                type="text" 
                                onChange={(e) => setNickname(e.target.value)}
                                value={nickname}
                                placeholder="변경할 닉네임"
                            />
                        </div>
                        
                        <button className='submitBtn' onClick={handleUpdate}>수정 완료</button>
                        
                        <div 
                            onClick={() => setIsEditing(false)} 
                            style={{cursor:'pointer', marginTop:'15px', color:'#aaa', textDecoration:'underline'}}
                        >
                            취소하고 돌아가기
                        </div>
                    </>
                )}
                
            </div>
        </div>
    );
}