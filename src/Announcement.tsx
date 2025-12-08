import "./css/Announcement.css";
import { useNavigate } from "react-router-dom";
import H from "./H.tsx"
import notice from './img/notice.png';
import axios from "axios";
import { useState, useEffect } from "react";
import type { Post } from "./App";

export default function Announcement() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        // 일반 게시글만 달라고 요청
        axios.get('http://localhost:8081/api/articles?boardType=BOARD')
            .then(res => {
                const formattedData = res.data.map((item: any) => ({
                    ...item,
                    date: item.createdDate ? item.createdDate.split('T')[0] : '2025.12.04'
                }));
                setPosts(formattedData);
            })
            .catch(err => console.log(err));
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            <H />
            <div className='last'><p className='lastText'>community - announcement</p></div>
            <div className="firstContent">
                <img src={notice} className="img" />
                <div className="title1">Announcement</div>
            </div>
            
            <div style={{width:'70%', margin:'0 auto', textAlign:'right', marginBottom:'10px'}}>
                 <button onClick={()=>navigate('/BoardWrite')} style={{padding:'5px 10px', cursor:'pointer'}}>글쓰기</button>
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