import { useState } from "react";
import "./css/App.css";
import "./css/index.css";
import type { Post } from "./NoticeBoard";
import Music from "./Music.tsx";
import { Route, Routes } from "react-router-dom";
import BoardWrite from "./BoardWrite.tsx";
import NoticeWrite from "./NoticeWrite.tsx";
import Login from "./Login.tsx";
import MemberRegister from "./MemberRegister.tsx";
import Announcement from "./Announcement";
import M from "./M";
import Management from "./Management";
import MyBoard from "./MyBoard";
import MyPage from "./MyPage";
import NoticeBoard from "./NoticeBoard";
import axios from "axios";

function App() {
  /******        게시글      *******/
  const posts: Post[] = [
    { id: 1, title: "게시글1", date: "2025.12.04" },
    { id: 2, title: "게시글2", date: "2025.12.04" },
    { id: 3, title: "게시글3", date: "2025.12.04" },
    { id: 4, title: "게시글4", date: "2025.12.04" },
    { id: 5, title: "게시글5", date: "2025.12.04" },
    { id: 6, title: "게시글6", date: "2025.12.04" },
  ];
  /****           음악         ****/
  const driversData = [
    { position: 1, name: "Max Verstappen", team: "Red Bull", points: 300, imageUrl: "/verstappen.jpg" },
    { position: 2, name: "Lando Norris", team: "McLaren", points: 220, imageUrl: "/norris.jpg" },
  ];

  const musicRecs = [
    { title: "Song 1", value: "song1" },
    { title: "Song 2", value: "song2" },
  ];

  const spotifyUrl = "https://open.spotify.com/embed/...";

  const teamStandings = [
    { position: 1, name: "Red Bull", points: 540 },
    { position: 2, name: "Ferrari", points: 460 },
  ];

  const raceSchedule = [
    { round: 1, raceName: "Bahrain GP", date: "2024-03-02" },
    { round: 2, raceName: "Saudi Arabian GP", date: "2024-03-09" },
  ];


  /***  게시글 ***/
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


  return (


    <Routes>
      <Route path="/" element={<MyPage />} />
      <Route path="/MyPage" element={<MyPage />} />
      <Route path="/Music" element={<Music
        drivers={driversData}
        recommendations={musicRecs}
        spotifyUrl={spotifyUrl}
        teams={teamStandings}
        schedules={raceSchedule}
      />} />
      <Route path="/MyBoard" element={<MyBoard
        posts={currentPosts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />} />
      <Route path="/Management" element={<Management />} />
      <Route path="/M" element={<M />} />
      <Route path="/Announcement" element={<Announcement
        posts={currentPosts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)} />} />
      <Route path="/NoticeBoard" element={<NoticeBoard
        posts={currentPosts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />} />
      <Route path="/NoticeWrite" element={<NoticeWrite />} />
      <Route path="/BoardWrite" element={<BoardWrite />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/MemberRegister" element={<MemberRegister />} />
    </Routes>
  );
}

export default App;