import { useParams } from "react-router-dom";

export default function DetailPage() {
    const { id } = useParams(); // URL의 /detail/:id 에서 id 가져오기

    return (
        <div style={{ padding: "40px" }}>
            <h2>게시글 상세 보기</h2>
            <p>게시글 ID: {id}</p>
        </div>
    );
}
