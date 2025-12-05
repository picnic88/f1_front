import './H.css';
import './index.css';

export default function Head() { // <-- 함수 시작

    // 예: const router = useRouter(); 

    return (
        <body>
            <div className="navbar">
                <p class="n1">새싹</p>
                <p class="n2">메인</p>
                <p class="n2">커뮤니티</p>
                <p class="n2">뮤직 스테이션</p>
                <p class="n3">마이페이지</p>
                <p>로그인</p>
            </div>
            <div className='middle'>
                <div class="stripe1"></div>
                <div class="stripe2"></div>
                <div class="stripe3"></div>
                <div class="stripe4"></div>
                <div class="stripe5"></div>
                <div class="stripe6"></div>
                <div class="stripe7"></div>
                <div class="stripe8"></div>
                <div class="stripe9"></div>
                <div class="stripe10"></div>
                <p className='middleText'>Alt + <span class="f1">F1</span> DashBoard</p>
            </div>
            <div className='last'>
                <p className='lastText'>myPage</p>
            </div>
        </body>
    )
}
