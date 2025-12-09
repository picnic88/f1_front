import "./css/Announcement.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import H from "./H.tsx"
import notice from './img/notice.png';
import axios from "axios";

interface Post {
    id: number;
    title: string;
    content: string;
    createdDate?: string;
    date: string;
}
export default function Announcement() {
    const navigate = useNavigate();
    
    // 상태 관리
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    //데이터 가져오기 (boardType=BOARD)
    useEffect(() => {
        axios.get('http://localhost:8081/api/articles?boardType=BOARD')
            .then(res => {
                const formattedData = res.data.map((item: any) => ({
                    ...item,
                    // 날짜 변환 (없으면 오늘 날짜)
                    date: item.createdDate ? String(item.createdDate).split('T')[0] : '2025.12.09'
                }));
                setPosts(formattedData);
            })
            .catch(err => console.log("게시판 데이터 로딩 실패:", err));
    }, []);

    // 페이징 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>community - announcement</p>
            </div>
            <div className="firstContent">
                <img src={notice} className="img" />
                <div className="title1">
                    Announcement
                </div>
            </div>

                        {/* 글쓰기 버튼 */}
            <div style={{width:'70%', maxWidth:'1000px', margin:'0 auto', textAlign:'right', marginBottom:'10px'}}>
                 <button 
                    onClick={()=>navigate('/BoardWrite')} 
                >
                    글쓰기
                </button>
            </div>
            
            <div className="board-container1">
                <table className="board-table">
                    <thead>
                        <tr>
                            {/* title->id , content-> title 로 수정*/ }
                            <th>#</th>
                            <th>id</th>
                            <th>title</th>
                            <th>date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {posts.map((post: Post, index: number) => (
                            <tr key={post.id}>
                                <td>{index + 1}</td>
                                <td>{post.id}</td>
                                <td
                                    className="title-link"
                                    onClick={() => navigate(`/detail/${post.id}`)}
                                >
                                    {post.title}
                                </td>
                                <td>{post.date}</td>
                            </tr>
                        ))}
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
