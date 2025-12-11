import React, { useState, useEffect } from "react";
import H from "./H.tsx";
import "./css/MyBoard.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 데이터 타입 정의 
interface Post {
    id: number;
    title: string;
    content: string;
    createdDate?: string;
    date: string;
    boardType: string; 
}

export default function MyBoard() {
    const navigate = useNavigate();
    
    // 현재 로그인한 아이디 가져오기
    const loginId = localStorage.getItem("loginId");

    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // 내 글 가져오기
    useEffect(() => {
        if (!loginId) {
            alert("로그인이 필요합니다.");
            navigate("/Login");
            return;
        }

        axios.get(`http://localhost:8081/api/articles?author=${loginId}`)
            .then(res => {
                const formattedData = res.data.map((item: any) => ({
                    ...item,
                    date: item.createdDate ? String(item.createdDate).split('T')[0] : '날짜없음'
                }));
                setPosts(formattedData.reverse());
            })
            .catch(err => console.log(err));
    }, [loginId, navigate]);

    // 글 삭제 기능
    const handleDelete = (id: number) => {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            axios.delete(`http://localhost:8081/api/articles/${id}`)
                .then(() => {
                    alert("삭제되었습니다.");
                    setPosts(posts.filter(p => p.id !== id));
                })
                .catch(() => alert("삭제 실패 (서버 오류)"));
        }
    };

    // 페이징 계산 로직
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>myPage {'>'} myBoard</p>
            </div>
            
            <div className="title1">
                내가 작성한 글 목록
            </div>

            <div className="board-container">
                <table className="board-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>구분</th>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>관리</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentPosts.length > 0 ? (
                            currentPosts.map((post, index) => (
                                <tr key={post.id} style={{borderBottom:'1px solid #333', height:'40px'}}>
                                    <td>{index + 1 + indexOfFirstPost}</td>
                                    <td>
                                        {/* 구분 표시*/}
                                        <span>
                                            {post.boardType === 'NOTICE' ? '[공지]' : '[일반]'}
                                        </span>
                                    </td>
                                    <td 
                                        onClick={() => navigate(`/detail/${post.id}`)}
                                        style={{cursor:'pointer', textAlign:'left', paddingLeft:'20px'}}
                                    >
                                        {post.title}
                                    </td>
                                    <td>{post.date}</td>
                                    
                                    <td>
                                        <button onClick={() => navigate(`/edit/${post.id}`)}>
                                            수정
                                        </button>
                                        <button onClick={() => handleDelete(post.id)}>
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} style={{padding:'50px', textAlign:'center', color:'#888'}}>
                                    작성한 게시글이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        &lt;
                    </button>

                    {pageNumbers.map((num: number) => (
                        <button
                            key={num}
                            className={currentPage === num ? "active" : ""}
                            onClick={() => setCurrentPage(num)}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}