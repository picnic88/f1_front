import React, { useEffect, useState } from 'react';
import H from './H.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BoardManage() {
    const navigate = useNavigate();
    const [allPosts, setAllPosts] = useState<any[]>([]);

    useEffect(() => {
        // 모든 글 가져오기
        axios.get('http://localhost:8081/api/articles')
            .then(res => setAllPosts(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = (id: number) => {
        if(window.confirm("관리자 권한으로 삭제하시겠습니까? (복구 불가)")) {
            axios.delete(`http://localhost:8081/api/articles/${id}`)
                .then(() => {
                    setAllPosts(allPosts.filter(p => p.id !== id));
                    alert("삭제되었습니다.");
                })
                .catch(() => alert("삭제 실패"));
        }
    };

return (

    <div>
                <H />
                <div className='last'>
                    <p className='lastText'>myPage</p>
                </div>
                <div className='main'>
                    <p className='text1'>관리자 페이지</p>
                    <p className='text3' onClick={() => navigate('/BoardMange')}>전체 게시글</p>
                    <div style={{ background: '#1e1e1e', borderRadius: '10px', overflow: 'hidden', border: '1px solid #333' }}>
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#2c2c2c', color: '#aaa', borderBottom: '2px solid #e10600' }}>
                                <tr>
                                    <th style={{ padding: '15px' }}>ID</th>
                                    <th>Type</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Date</th>
                                    <th style={{ textAlign: 'center' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPosts.map(post => (
                                    <tr key={post.id} style={{ borderBottom: '1px solid #333' }}>
                                        <td style={{ padding: '15px' }}>{post.id}</td>
                                        <td>
                                            <span style={{ 
                                                padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
                                                background: post.boardType === 'NOTICE' ? '#ff4d4d' : '#444',
                                                color: 'white'
                                            }}>
                                                {post.boardType === 'NOTICE' ? '공지' : '게시글'}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: 'bold', cursor:'pointer' }} onClick={()=>navigate(`/detail/${post.id}`)}>{post.title}</td>
                                        <td style={{ color: '#aaa' }}>{post.author || "Unknown"}</td>
                                        <td style={{ fontSize: '14px', color: '#888' }}>{post.createdDate?.split('T')[0]}</td>
                                        <td style={{ textAlign: 'center' }}>
                                          
                                    <button onClick={() => handleDelete(post.id)} style={{ padding: '5px 10px', background: '#e10600', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                            삭제
                                        </button>

                                          </td>
                                    </tr>

                                     ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    
        );
    }

