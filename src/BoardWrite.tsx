import H from "./H.tsx"
import './css/BoardWrite.css';
import axios from "axios";

export default function BoardWrite() {
    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>community - boardWrite</p>
            </div>
            <div className='main'>
                <p className='text1'>게시글 작성</p>
                <div className='titleBox'>
                    <p className='titleText'>제목</p>
                    <input className='titleInput' type="text" />
                </div>
                <div className='contentBox'>
                    <p className='contentText'>내용</p>
                    <input className='contentInput' type="text" />
                </div>
                <button className='submitBtn'>작성하기</button>
            </div>
        </div>
    )
}