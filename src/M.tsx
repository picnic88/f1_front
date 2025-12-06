import Music from './Music.tsx';

export default function M() {
    return (

        <Music
            recommendations={[
                { title: "Happy Vibes", value: "happy" },
                { title: "Calm Mood", value: "calm" }
            ]}
            spotifyUrl="https://open.spotify.com/embed/track/xxxxxx" drivers={[]} teams={[]} schedules={[]} />
    )
}