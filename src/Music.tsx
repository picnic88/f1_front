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
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>myPage</p>
            </div>
            
            <div className="col-lg-5">
                <div className="card p-4 music-card">
                    <div className="playlistText"><span className='img1'>🎧</span> my playlist</div>

                    <form onSubmit={handleSearch} className="d-flex mb-3">
                        <input
                            type="text"
                            name="musicQuery"
                            placeholder="Search song..."
                            autoComplete="off"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                           
                        />
                        <button type="submit" className="btn btn-danger searchBtn">search</button>
                    </form>

                    <div className='recommend'>
                        <div className="mb-3">
                        {recommendations.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => onMusicChange(item.type, item.id)}
                            
                                onMouseOver={(e) => e.currentTarget.style.borderColor = '#e10600'}
                                onMouseOut={(e) => e.currentTarget.style.borderColor = '#555'}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                </div>

                    <div className="ratio ratio-1x1" style={{ maxHeight: "500px" }} >
                        <iframe
                            style={{ borderRadius: "12px" }}
                            src={spotifyUrl}
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            ></iframe>
                    </div>
                </div>
                <div>
                    <img src={memberImg} />
                </div>
            </div>
        </div>
    );
}