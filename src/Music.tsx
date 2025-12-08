import './css/Music.css';
import H from './H.tsx';
import memberImg from './img/member.png'; 
import { useState } from 'react';

interface MusicRec { title: string; type: string; id: string; }

interface MusicProps {
    recommendations: MusicRec[];
    spotifyUrl: string;
    onMusicChange: (type: string, id: string) => void;
}

export default function Music({
    recommendations,
    spotifyUrl,
    onMusicChange
}: MusicProps) {

    const [query, setQuery] = useState("");

    const handleSearch = (e: any) => {
        e.preventDefault();
        alert(`'${query}' 검색 기능은 준비 중입니다. 아래 추천 리스트를 눌러보세요!`);
        setQuery("");
    };

    return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh', paddingBottom: '50px' }}>
            <H />
            
            {/* 상단 타이틀 영역 */}
            <div className='last' style={{ marginTop: '0', paddingTop: '20px' }}>
                <p className='lastText' style={{ color: '#e10600', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    MusicStaion
                </p>
            </div>
            
            {/* 메인 컨텐츠 영역 */}
            <div className="container" style={{ 
                maxWidth: '1100px', 
                margin: '0 auto', 
                padding: '20px',
                display: 'flex',
                flexWrap: 'wrap', 
                gap: '30px',
                justifyContent: 'center',
                alignItems: 'stretch' // 양쪽 높이 맞춤
            }}>
                
                {/* 왼쪽: 뮤직 플레이어 컨트롤러 */}
                <div style={{ 
                    flex: '1.5', // 왼쪽을 좀 더 넓게
                    minWidth: '350px',
                    background: '#1e1e1e', 
                    borderRadius: '20px', 
                    padding: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    border: '1px solid #333'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                        <span style={{ fontSize: '28px', marginRight: '10px' }}>🎧</span>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Paddock DJ</h2>
                    </div>

                    {/* 검색창 */}
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
                        <input
                            type="text"
                            placeholder="Search songs..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '12px 15px',
                                borderRadius: '10px',
                                border: '1px solid #444',
                                background: '#2b2b2b',
                                color: 'white',
                                outline: 'none',
                                fontSize: '16px'
                            }}
                        />
                        <button type="submit" style={{
                            background: '#e10600',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '0 25px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: '0.3s'
                        }}>GO</button>
                    </form>

                    {/* 추천 태그 버튼들 */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px' }}>
                        {recommendations.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => onMusicChange(item.type, item.id)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: '1px solid #555',
                                    background: 'transparent',
                                    color: '#ccc',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    transition: '0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.borderColor = '#e10600'}
                                onMouseOut={(e) => e.currentTarget.style.borderColor = '#555'}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>

                    {/* 스포티파이 플레이어 (높이 고정) */}
                    <div style={{ width: "100%", height: "400px", borderRadius: "15px", overflow: "hidden" }}>
                        <iframe
                            style={{ width: "100%", height: "100%" }}
                            src={spotifyUrl}
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/*오른쪽: 드라이버 포스터 (비주얼 영역) */}
                <div style={{ 
                    flex: '1', 
                    minWidth: '300px',
                    background: 'linear-gradient(145deg, #1e1e1e, #101010)', // 그라데이션 배경
                    borderRadius: '20px', 
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    border: '1px solid #333',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* 장식용 텍스트 */}
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        color: 'rgba(255,255,255,0.1)',
                        fontSize: '50px',
                        fontWeight: 'bold',
                        lineHeight: '1'
                    }}>
                        F1<br/>2025
                    </div>

                    {/* 드라이버 이미지 */}
                    <img 
                        src={memberImg} 
                        alt="Featured Driver" 
                        style={{ 
                            width: '100%', 
                            maxWidth: '350px', 
                            height: 'auto', 
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))', // 그림자 효과
                            zIndex: 2
                        }} 
                    />

                    <div style={{ marginTop: '20px', textAlign: 'center', zIndex: 2 }}>
                        <h3 style={{ color: 'white', margin: '0 0 5px 0' }}>Driver of the Day</h3>
                        <p style={{ color: '#e10600', fontWeight: 'bold' }}>Lando Norris</p>
                    </div>
                </div>

            </div>
        </div>
    );
}