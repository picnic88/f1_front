import H from './H.tsx';
import './css/Management.css';

export default function Management() {
    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>myPage</p>
            </div>
            <div className='main'>
                <p className='text1'>관리자 페이지</p>
                
                <p className='text2'>회원정보 수정</p>
                <div className="hr"><hr /></div>
                
                <p className='text3'>나의 게시글</p>
                <div className="hr"><hr /></div>
                
                <p className='text4'>공지 작성</p>
                <div className="hr"><hr /></div>
                
                <p className='text3'>전체 게시글</p>
            </div>
        </div>
    )
}