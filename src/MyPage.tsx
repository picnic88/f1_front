import H from './H.tsx';
import './css/MyPage.css';

export default function MyPage() {
    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>myPage</p>
            </div>
            <div className='main'>
                <p className='text1'>마이페이지</p>
                <p className='text2'>회원정보 수정</p>
                <p className="hr"><hr /></p>
                <p className='text3'>나의 게시글</p>
            </div>
        </div>
    )
}