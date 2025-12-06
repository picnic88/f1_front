import './css/Music.css';
import H from './H.tsx';
import memberImg from './img/member.png';

interface Driver {
    position: number;
    name: string;
    team: string;
    points: number;
    imageUrl: string;
}

interface Recommendation {
    title: string;
    value: string;
}

interface Team {
    position: number;
    name: string;
    points: number;
}

interface Schedule {
    round: number;
    raceName: string;
    date: string;
}

interface MusicProps {
    drivers: Driver[];
    recommendations: Recommendation[];
    spotifyUrl: string;
    teams: Team[];
    schedules: Schedule[];
}

export default function Music({
    drivers,
    recommendations,
    spotifyUrl,
    teams,
    schedules,
}: MusicProps) {

    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>myPage</p>
            </div>
            <div className="col-lg-5">
                <div className="card p-4 music-card">
                    <h3 className="playlistText"><span className='img'>🎧</span> my playlist</h3>
                    <div className='playlist'>
                        <form action="/" method="get" className="d-flex mb-3">
                            <input
                                type="text"
                                name="musicQuery"
                                className="form-control me-2"
                                placeholder="Search song..."
                                autoComplete="off"
                            />
                            <button type="submit" className="btn btn-danger searchBtn">search</button>
                        </form>
                        <div className='recommend'>
                            <div className="mb-3">
                                {recommendations.map((item, i) => (
                                    <a
                                        key={i}
                                        href={`/?musicQuery=${item.value}`}
                                        className="btn btn-music rounded-pill me-2"
                                    >
                                        {item.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="ratio ratio-1x1" style={{ maxHeight: "500px" }}>
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
                </div>
                <div>
                    <img src={memberImg} />
                </div>
            </div>
        </div>
    );
}
