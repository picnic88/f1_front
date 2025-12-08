import "./css/NoticeBoard.css";
import { useNavigate } from "react-router-dom";
import H from "./H.tsx"
import axios from "axios";
import { useState, useEffect } from "react";
import type { Post } from "./App";

export default function NoticeBoard() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        // 공지사항만 달라고 요청
        axios.get('http://localhost:8081/api/articles?boardType=NOTICE')
            .then(res => {
                const formattedData = res.data.map((item: any) => ({
                    ...item,
                    date: item.createdDate ? item.createdDate.split('T')[0] : '2025.12.04'
                }));
                setPosts(formattedData);
            })
            .catch(err => console.log(err));
    }, []);

    // 페이징 로직
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            <H />
            <div className='last'><p className='lastText'>community - notice board</p></div>
            <div className="title1">Notice Board</div>
            
            {/* 글쓰기 버튼 */}
            <div style={{width:'70%', margin:'0 auto', textAlign:'right', marginBottom:'10px'}}>
                 <button onClick={()=>navigate('/NoticeWrite')} style={{padding:'5px 10px', cursor:'pointer'}}>글쓰기</button>
            </div>

            <div className="board-container1">
                <table className="board-table">
                    <thead><tr><th>#</th><th>id</th><th>title</th><th>date</th></tr></thead>
                    <tbody>
                        {currentPosts.map((post, index) => (
                            <tr key={post.id}>
                                <td>{index + 1 + indexOfFirstPost}</td>
                                <td>{post.id}</td>
                                <td className="title-link" onClick={() => navigate(`/detail/${post.id}`)}>{post.title}</td>
                                <td>{post.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>&lt;</button>
                    {pageNumbers.map(num => (
                        <button key={num} className={currentPage === num ? "active" : ""} onClick={() => setCurrentPage(num)}>{num}</button>
                    ))}
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>&gt;</button>
                </div>
            </div>
        </div>
    );
}