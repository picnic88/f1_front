import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import H from './H.tsx';

export default function ArticleEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [boardType, setBoardType] = useState("");

    useEffect(() => {
        // 기존 글 내용 가져오기
        axios.get(`http://localhost:8081/api/articles/${id}`)
            .then(res => {
                setTitle(res.data.title);
                setContent(res.data.content);
                setBoardType(res.data.boardType);
            })
            .catch(err => alert("글 정보를 불러오지 못했습니다."));
    }, [id]);

    const handleUpdate = () => {
        // 백엔드에 수정 요청 (PATCH)
        axios.patch(`http://localhost:8081/api/articles/${id}`, {
            title: title,
            content: content
        })
        .then(() => {
            alert("수정 완료!");
            navigate(-1); // 이전 페이지로 돌아가기
        })
        .catch(err => {
            console.error(err);
            alert("수정 실패");
        });
    };

    return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
            <H />
            <div className='last'><p className='lastText'>Edit Post</p></div>

            <div className="container" style={{ maxWidth: '800px', marginTop: '30px', padding: '20px' }}>
                <div style={{ background: '#1e1e1e', padding: '30px', borderRadius: '10px', border: '1px solid #333' }}>
                    <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #e10600', paddingBottom: '10px' }}>
                        글 수정하기 <span style={{fontSize:'14px', color:'#888'}}>({boardType})</span>
                    </h2>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>제목</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '5px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>내용</label>
                        <textarea 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            style={{ width: '100%', height: '300px', padding: '10px', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '5px', resize: 'none' }}
                        />
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', marginRight: '10px', background: '#444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>취소</button>
                        <button onClick={handleUpdate} style={{ padding: '10px 20px', background: '#e10600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>수정 완료</button>
                    </div>
                </div>
            </div>
        </div>
    );
}