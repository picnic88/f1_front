import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import H from "./H.tsx";
import "./css/NoticeBoard.css"; // 스타일은 게시판 것 빌려쓰기

interface Article {
    id: number;
    title: string;
    content: string;
    createdDate: string;
    boardType: string;
}

export default function BoardDetail() {
    const { id } = useParams(); // URL에서 번호를 가져옴
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        // 백엔드에 글 1개만 달라고 요청
        axios.get(`http://localhost:8081/api/articles/${id}`)
            .then(res => setArticle(res.data))
            .catch(err => console.error("글 불러오기 실패:", err));
    }, [id]);

    if (!article) {
        return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>로딩중...</div>;
    }

    return (
        <div style={{ backgroundColor: '#222', minHeight: '100vh', color: 'white' }}>
            <H />
            <div className='last'><p className='lastText'>Detail View</p></div>
            
            <div style={{ 
                maxWidth: '800px', 
                margin: '0 auto', 
                padding: '40px', 
                border: '1px solid #444', 
                borderRadius: '10px',
                backgroundColor: '#1e1e1e'
            }}>
                {/* 제목 */}
                <h1 style={{ borderBottom: '2px solid #e10600', paddingBottom: '15px', marginBottom: '20px' }}>
                    {article.title}
                </h1>
                
                {/* 정보 (날짜, 게시판 종류) */}
                <div style={{ color: '#888', marginBottom: '30px', display:'flex', justifyContent:'space-between' }}>
                    <span>No. {article.id}</span>
                    <span>
                        <span style={{marginRight:'10px', color:'yellow'}}>[{article.boardType}]</span>
                        {article.createdDate ? article.createdDate.split('T')[0] : ''}
                    </span>
                </div>

                {/* 본문 내용 */}
                <div style={{ minHeight: '300px', fontSize: '18px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {article.content}
                </div>

                {/* 목록으로 돌아가기 버튼 */}
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button 
                        onClick={() => navigate(-1)} // 뒤로 가기
                        style={{
                            padding: '10px 30px',
                            backgroundColor: '#e10600',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        목록으로
                    </button>
                </div>
            </div>
        </div>
    );
}