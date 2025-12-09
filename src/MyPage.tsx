import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import H from './H.tsx';
import './css/MyPage.css';

export default function MyPage() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const loginId = localStorage.getItem("loginId");
    const [activeTab, setActiveTab] = useState("info");

    return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
            <H />
            <div className='last'><p className='lastText'>My Page</p></div>

            <div className="container" style={{ maxWidth: '800px', marginTop: '30px', padding: '0 20px' }}>
                
                {/* 프로필 영역 */}
                <div style={{ background: '#1e1e1e', padding: '30px', borderRadius: '10px', border: '1px solid #333', textAlign:'center', marginBottom:'30px' }}>
                    <div style={{ width: '80px', height: '80px', background: '#e10600', borderRadius: '50%', margin: '0 auto 15px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'30px', fontWeight:'bold' }}>
                        {loginId ? loginId.substring(0,1).toUpperCase() : "U"}
                    </div>
                    <h2>{loginId}</h2>
                    <p style={{ color: role === 'ADMIN' ? '#ff4d4d' : '#aaa', fontWeight: 'bold' }}>
                        {role === 'ADMIN' ? "관리자" : "일반사용자"}
                    </p>
                    
                    {role === 'ADMIN' && (
                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #333' }}>
                            <p style={{marginBottom:'10px', fontWeight:'bold', color: '#ff4d4d'}}>관리자 메뉴</p>
                            <button onClick={() => navigate('/NoticeWrite')} style={adminBtnStyle}>공지 작성</button>
                            <button onClick={() => navigate('/Management')} style={adminBtnStyle}>전체 게시글 관리</button>
                        </div>
                    )}
                </div>

                {/* 탭 메뉴 */}
                <div style={{ display: 'flex', borderBottom: '2px solid #333', marginBottom: '20px' }}>
                    <div onClick={() => setActiveTab("info")} style={{ ...tabStyle, borderBottom: activeTab === "info" ? '3px solid #e10600' : 'none', color: activeTab === "info" ? 'white' : '#888' }}>
                        회원 정보 수정
                    </div>
                    <div onClick={() => setActiveTab("myposts")} style={{ ...tabStyle, borderBottom: activeTab === "myposts" ? '3px solid #e10600' : 'none', color: activeTab === "myposts" ? 'white' : '#888' }}>
                        나의 게시글 관리
                    </div>
                </div>

                {/* 탭 내용 */}
                {activeTab === "info" ? <MemberInfoEdit /> : <MyPostList loginId={loginId} navigate={navigate} />}
            </div>
        </div>
    );
}

// 내 정보 수정 컴포넌트
function MemberInfoEdit() {
    return (
        <div style={{ background: '#1e1e1e', padding: '30px', borderRadius: '10px', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '20px' }}>내 정보 수정</h3>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>비밀번호 변경</label>
                <input type="password" placeholder="변경할 비밀번호 입력" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>닉네임 변경</label>
                <input type="text" placeholder="새로운 닉네임" style={inputStyle} />
            </div>
            <button onClick={() => alert("정보 수정 기능은 준비 중입니다.")} style={{ ...adminBtnStyle, width: '100%', background: '#333' }}>수정 완료</button>
        </div>
    )
}

// 내가 쓴 글 목록 컴포넌트
function MyPostList({ loginId, navigate }: { loginId: string | null, navigate: any }) {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        if(!loginId) return;
        // 내 아이디로 쓴 글만 조회
        axios.get(`http://localhost:8081/api/articles?author=${loginId}`)
            .then(res => setPosts(res.data))
            .catch(err => console.error(err));
    }, [loginId]);

    const handleDelete = (id: number) => {
        if(window.confirm("삭제하시겠습니까?")) {
            axios.delete(`http://localhost:8081/api/articles/${id}`)
                .then(() => {
                    setPosts(posts.filter(p => p.id !== id));
                    alert("삭제되었습니다.");
                })
                .catch(() => alert("삭제 실패"));
        }
    };

    return (
        <div>
             {posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#888', background: '#1e1e1e', borderRadius: '10px' }}>작성한 게시글이 없습니다.</div>
            ) : (
                posts.map(post => (
                    <div key={post.id} style={{ background: '#1e1e1e', padding: '20px', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border:'1px solid #333' }}>
                        <div>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: post.boardType === 'NOTICE' ? '#ff4d4d' : '#4dff4d', marginRight: '8px' }}>
                                [{post.boardType === 'NOTICE' ? '공지' : '게시글'}]
                            </span>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', cursor:'pointer' }} onClick={()=>navigate(`/detail/${post.id}`)}>{post.title}</span>
                            <div style={{ color: '#888', fontSize: '12px', marginTop: '5px' }}>{post.createdDate?.split('T')[0]}</div>
                        </div>
                        <div>
                            <button onClick={() => navigate(`/edit/${post.id}`)} style={{ padding: '5px 10px', background: '#444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}>수정</button>
                            <button onClick={() => handleDelete(post.id)} style={{ padding: '5px 10px', background: '#e10600', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>삭제</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

const adminBtnStyle = { padding: '10px 20px', margin: '5px', borderRadius: '5px', border: 'none', background: '#333', color: 'white', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: 'white' };
const tabStyle = { padding: '15px 30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' };