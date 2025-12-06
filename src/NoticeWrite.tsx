import H from "./H"
import './css/NoticeWrite.css';
import axios from "axios";

export default function NoticeWrite() {
    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>community - notice Write</p>
            </div>
            <div className='main'>
                <p className='text1'>공지 작성</p>
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