import React, { useEffect, useState } from 'react';
import H from './H.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Management() {
    const navigate = useNavigate();
    const [allPosts, setAllPosts] = useState<any[]>([]);

    // useEffect(() => {
    //     // 모든 글 가져오기
    //     axios.get('http://localhost:8081/api/articles')
    //         .then(res => setAllPosts(res.data))
    //         .catch(err => console.error(err));
    // }, []);

    // const handleDelete = (id: number) => {
    //     if(window.confirm("관리자 권한으로 삭제하시겠습니까? (복구 불가)")) {
    //         axios.delete(`http://localhost:8081/api/articles/${id}`)
    //             .then(() => {
    //                 setAllPosts(allPosts.filter(p => p.id !== id));
    //                 alert("삭제되었습니다.");
    //             })
    //             .catch(() => alert("삭제 실패"));
    //     }
    


return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>myPage</p>
            </div>
            <div className='main'>
                <p className='text1'>관리자 페이지</p>
                <p className='text2'>회원정보 수정</p>
                <p className="hr"><hr /></p>
                <p className='text3'>나의 게시글</p>
                <p className="hr"><hr /></p>
                <p className='text4' onClick={() => navigate('/NoticeWrite')} >공지 작성</p>
                <p className="hr"><hr /></p>
                <p className='text3' onClick={() => navigate('/BoardManage')}>전체 게시글</p>
                
            </div>
        </div>

    );
}