import { useNavigate } from "react-router-dom";
import H from "./H.tsx"
import axios from "axios";
import { useState, useEffect } from "react";

// 데이터 타입 정의
interface Post {
    id: number;
    title: string;
    content: string;
    createdDate?: string;
    date: string;
}

export default function NoticeBoard() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role"); // 권한 확인
    
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        // 공지사항 데이터 요청
        axios.get('http://localhost:8081/api/articles?boardType=NOTICE')
            .then(res => {
                console.log("공지사항 데이터:", res.data); // 데이터 확인용 로그
                const formattedData = res.data.map((item: any) => ({
                    ...item,
                    date: item.createdDate ? String(item.createdDate).split('T')[0] : '2025.12.09'
                }));
                setPosts(formattedData);
            })
            .catch(err => console.log(err));
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
                <p className='lastText'>community - notice board</p>
            </div>
            <div className="title1">Notice Board</div>
            <div className="board-container1">
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
                                    <tr key={post.id} onClick={() => navigate(`/detail/${post.id}`)}>
                                        <td>{index + 1 + indexOfFirstPost}</td>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} style={{ padding: '50px', color: '#aaa', textAlign: 'center' }}>
                                        등록된 공지사항이 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 페이지네이션 */}
                <div className="pagination" >
                    <button disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(prev => prev - 1)} 
                    >
                        &lt;
                    </button>
                    {pageNumbers.map(num => (
                        <button 
                            key={num} 
                            onClick={() => setCurrentPage(num)}
                        >
                            {num}
                        </button>
                    ))}
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                         &gt;
                    </button>
                </div>
            </div>
    );
}