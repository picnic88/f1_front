import "./css/MyBoard.css";
import { useNavigate } from "react-router-dom";
import H from "./H.tsx"

export interface Post {
    id: number;
    title: string;
    date: string;
}

interface NoticeBoardProps {
    posts: Post[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function MyBoard({
    posts,
    currentPage,
    totalPages,
    onPageChange,
}: NoticeBoardProps) {
    const navigate = useNavigate();

    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

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
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        &lt;
                    </button>

                    {pageNumbers.map((num: number) => (
                        <button
                            key={num}
                            className={currentPage === num ? "active" : ""}
                            onClick={() => onPageChange(num)}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}
