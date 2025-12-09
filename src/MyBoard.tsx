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
}

export default function MyBoard() {
    const navigate = useNavigate();
    
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // 데이터 가져오기 (일반 게시글 'BOARD'를 가져오게 설정)
    useEffect(() => {
        axios.get('http://localhost:8081/api/articles?boardType=BOARD')
            .then(res => {
                const formattedData = res.data.map((item: any) => ({
                    ...item,
                    date: item.createdDate ? String(item.createdDate).split('T')[0] : '2025.12.08'
                }));
                setPosts(formattedData);
            })
            .catch(err => console.log(err));
    }, []);

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
            <h3 className="title">내가 작성한 글</h3>
            <div className="board-container">
                <table className="board-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>id</th>
                            <th>title</th>
                            <th>date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentPosts.length > 0 ? (
                                currentPosts.map((post, index) => (
                                    <tr key={post.id} style={{borderBottom:'1px solid #333', height:'40px'}}>
                                        <td>{index + 1 + indexOfFirstPost}</td>
                                        <td 
                                            style={{cursor:'pointer', textAlign:'left', paddingLeft:'20px'}}
                                            onClick={() => navigate(`/detail/${post.id}`)}
                                        >
                                            {post.title}
                                        </td>
                                        <td>{post.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} style={{padding:'30px'}}>작성한 게시글이 없습니다.</td>
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