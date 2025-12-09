import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import H from './H.tsx';

// 타입 정의
interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    createdDate: string;
    boardType: string;
}

export default function BoardDetail() {
    const { id } = useParams(); // URL에서 번호 가져오기
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    // 현재 사용자 정보
    const loginId = localStorage.getItem("loginId");
    const role = localStorage.getItem("role");

    useEffect(() => {
        console.log(`글 번호 ${id}번 데이터 요청 시작`);
        
        axios.get(`http://localhost:8081/api/articles/${id}`)
            .then(res => {
                console.log("데이터 도착:", res.data);
                setArticle(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("데이터 요청 실패:", err);
                alert("글을 불러올 수 없습니다. (삭제되었거나 서버 오류)");
                setLoading(false);
                navigate(-1); // 에러나면 뒤로가기
            });
    }, [id, navigate]);

    // 삭제 함수
    const handleDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.delete(`http://localhost:8081/api/articles/${id}`)
                .then(() => {
                    alert("삭제되었습니다.");
                    navigate(-1);
                })
                .catch(() => alert("삭제 실패"));
        }
    };

    // 1. 로딩 중일 때 화면
    if (loading) {
        return (
            <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white', paddingTop: '100px', textAlign: 'center' }}>
                <h1>글 데이터를 불러오는 중입니다...</h1>
                <p>잠시만 기다려주세요.</p>
            </div>
        );
    }

    // 데이터가 없을 때 (혹시 모를 상황)
    if (!article) {
        return <div style={{ color: 'white', padding: '50px' }}>데이터가 없습니다.</div>;
    }

    // 화면
    const canEdit = article.author === loginId || role === 'ROLE_ADMIN';

    return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
            <H />
            <div className='last'><p className='lastText'>Detail View</p></div>

            <div className="container" style={{ maxWidth: '900px', marginTop: '30px', padding: '0 20px' }}>
                <div style={{ background: '#1e1e1e', padding: '40px', borderRadius: '10px', border: '1px solid #333' }}>
                    
                    {/* 헤더 */}
                    <div style={{ borderBottom: '2px solid #e10600', paddingBottom: '20px', marginBottom: '20px' }}>
                        <span style={{ 
                            background: article.boardType === 'NOTICE' ? '#e10600' : '#444', 
                            color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', marginRight: '15px' 
                        }}>
                            {article.boardType === 'NOTICE' ? '공지' : '게시글'}
                        </span>
                        <h1 style={{ display: 'inline', fontSize: '26px', fontWeight: 'bold' }}>{article.title}</h1>
                    </div>

                    {/* 정보 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', marginBottom: '40px', fontSize: '14px', borderBottom:'1px solid #333', paddingBottom:'20px' }}>
                        <div>
                            <span>작성자: <span style={{ color: 'white', fontWeight:'bold' }}>{article.author || 'Unknown'}</span></span>
                        </div>
                        <div>
                            <span>날짜: <span style={{ color: 'white' }}>{article.createdDate ? article.createdDate.split('T')[0] : '날짜없음'}</span></span>
                        </div>
                    </div>

                    {/* 본문 */}
                    <div style={{ minHeight: '300px', fontSize: '16px', lineHeight: '1.8', whiteSpace: 'pre-wrap', color: '#eee' }}>
                        {article.content}
                    </div>

                    {/* 버튼 */}
                    <div style={{ marginTop: '50px', borderTop: '1px solid #333', paddingTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={() => navigate(-1)} style={{ padding: '10px 25px', background: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight:'bold' }}>
                            목록으로
                        </button>

                        {canEdit && (
                            <div>
                                <button onClick={() => navigate(`/edit/${id}`)} style={{ padding: '10px 20px', background: '#555', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px', fontWeight:'bold' }}>
                                    수정
                                </button>
                                <button onClick={handleDelete} style={{ padding: '10px 20px', background: '#e10600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight:'bold' }}>
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}