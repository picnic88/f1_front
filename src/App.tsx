import { useState, useEffect } from "react";
import "./css/App.css";
import "./css/index.css";
import { Route, Routes } from "react-router-dom";
import Music from "./Music.tsx";
import BoardWrite from "./BoardWrite.tsx";
import NoticeWrite from "./NoticeWrite.tsx";
import Login from "./Login.tsx";
import MemberRegister from "./MemberRegister.tsx";
import Announcement from "./Announcement";
// import M from "./M";
import Management from "./Management";
import MyBoard from "./MyBoard";
import MyPage from "./MyPage";
import NoticeBoard from "./NoticeBoard";
import axios from "axios";

export interface Post { id: number; title: string; content?: string; createdDate?: string; date: string; }
export interface MusicRec { title: string; type: string; id: string; }

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [posts, setPosts] = useState<Post[]>([]);
  
  // Spotify 추천 리스트 (보내주신 ID 적용)
  const [musicRecs] = useState<MusicRec[]>([
      { title: "🦁 Maxx Power", type: "artist", id: "5xO3qTeIdumG381f7Kuqu5" }, 
      { title: "🏎️ F1 Theme", type: "playlist", id: "00L6YaFg8TlZC30ktupQGQ" },
      { title: "🌶️ Smooth Operator", type: "track", id: "1Hv1VTm8zeOeybub15mA2R" },
      { title: "🎧 Max Playlist", type: "playlist", id: "5gCSng63lyenI7nQr3Jx5V" }
  ]);
  
  // 기본 재생 URL (Max Playlist)
  const [spotifyUrl, setSpotifyUrl] = useState("https://open.spotify.com/embed/playlist/5gCSng63lyenI7nQr3Jx5V?utm_source=generator");

  // 데이터 가져오기
  useEffect(() => {
    // 게시글 (백엔드 8081)
    axios.get('http://localhost:8081/api/articles')
        .then(res => {
            const formattedData = res.data.map((item: any) => ({
                ...item,
                date: item.createdDate ? item.createdDate.split('T')[0] : '2025.12.04'
            }));
            setPosts(formattedData);
        })
        .catch(e => console.log("게시글 로딩 실패"));
        
  }, []);

  // 음악 변경 핸들러 ( Spotify Embed URL 사용)
  const handleMusicChange = (type: string, id: string) => {
      setSpotifyUrl(`https://open.spotify.com/embed/${type}/${id}?utm_source=generator`);
  };

  // 페이징 로직
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Routes>
      <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/" element={<MyPage />} />
      <Route path="/MyPage" element={<MyPage />} />
      
      {/*Music 컴포넌트: 깔끔하게 음악 관련 props만 전달 */}
      <Route path="/Music" element={<Music 
          recommendations={musicRecs} 
          spotifyUrl={spotifyUrl} 
          onMusicChange={handleMusicChange} 
      />} />

      <Route path="/MyBoard" element={<MyBoard posts={currentPosts} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />} />
      <Route path="/Management" element={<Management />} />
      {/* <Route path="/M" element={<M />} /> */}
      <Route path="/Announcement" element={<Announcement />} />
     <Route path="/NoticeBoard" element={<NoticeBoard />} />
      <Route path="/NoticeWrite" element={<NoticeWrite />} />
      <Route path="/BoardWrite" element={<BoardWrite />} />
      <Route path="/MemberRegister" element={<MemberRegister />} />
    </Routes>
  );
}

export default App;