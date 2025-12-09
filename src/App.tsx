import { useState, useEffect } from "react";
import "./css/App.css";
import "./css/index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.tsx"; 
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
import ArticleEdit from "./ArticleEdit.tsx";
import BoardDetail from "./BoardDetail.tsx";
import BoardManage from "./BoardManage.tsx";
import MyEdit from "./MyEdit.tsx";
import axios from "axios";

// 데이터 타입 정의 (Home.tsx와 맞춤)
export interface Driver { position: number; name: string; team: string; points: number; imageUrl: string; }
export interface Team { position: number; name: string; points: number; }
export interface Schedule { round: number; raceName: string; date: string; }
export interface MusicRec { title: string; type: string; id: string; }

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // F1 데이터 상태 관리
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  
  // 음악 관련 (Music 페이지용)
  const [musicRecs] = useState<MusicRec[]>([
      { title: "드라이버 응원가 전문 프로듀서: Maxx Power", type: "artist", id: "5xO3qTeIdumG381f7Kuqu5" }, 
      { title: " F1 The Movie OST", type: "playlist", id: "00L6YaFg8TlZC30ktupQGQ" },
      { title: "Sainz is...", type: "track", id: "1Hv1VTm8zeOeybub15mA2R" },
      { title: "Max's Playlist", type: "playlist", id: "5gCSng63lyenI7nQr3Jx5V" }
  ]);
  const [spotifyUrl, setSpotifyUrl] = useState("https://open.spotify.com/embed/playlist/5gCSng63lyenI7nQr3Jx5V?utm_source=generator");

  useEffect(() => {
    // 드라이버 순위 가져오기
    axios.get('https://api.jolpi.ca/ergast/f1/current/driverStandings.json')
      .then(res => {
        const rawList = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        const mappedList = rawList.map((d: any) => ({
          position: parseInt(d.position),
          name: `${d.Driver.givenName} ${d.Driver.familyName}`,
          team: d.Constructors[0].name,
          points: parseInt(d.points),
          imageUrl: getDriverImage(d.Driver.driverId) // 이미지 매핑
        }));
        setDrivers(mappedList.slice(0, 20));
      })
      .catch(e => console.error("드라이버 API 에러", e));

    // 팀(Constructor) 순위 가져오기
    axios.get('https://api.jolpi.ca/ergast/f1/current/constructorStandings.json')
      .then(res => {
        const rawList = res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        const mappedList = rawList.map((c: any) => ({
          position: parseInt(c.position),
          name: c.Constructor.name,
          points: parseInt(c.points)
        }));
        setTeams(mappedList.slice(0, 10));
      })
      .catch(e => console.error("팀 API 에러", e));

    // 경기 일정 가져오기
    axios.get('https://api.jolpi.ca/ergast/f1/current.json')
      .then(res => {
        const rawList = res.data.MRData.RaceTable.Races;
        // 오늘 날짜 이후의 경기만 필터링(이지만 올해 경기 다 끝나서 그냥 올해 경기 일정을 다 보여주는 중)
        const today = new Date().toISOString().split('T')[0];
        const upcoming = rawList.filter((r:any) => r.date >= today);
        
        const mappedList = (upcoming.length > 0 ? upcoming : rawList).map((r: any) => ({
          round: parseInt(r.round),
          raceName: r.raceName,
          date: r.date
        }));
        setSchedules(mappedList.slice(0, 25)); 
      })
      .catch(e => console.error("일정 API 에러", e));

  }, []);

  // 드라이버 이미지 수동 매핑 (API 이미지가 없어서 직접 연결)
  const getDriverImage = (driverId: string) => {
    const images: { [key: string]: string } = {
      "max_verstappen": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/maxver01.png",
      "piastri": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/oscpia01.png",
      "leclerc": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/chalec01.png",
      "sainz": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/carsai01.png",
      "norris": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/lannor01.png",
      "hamilton": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/lewham01.png",
      "russell": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/georus01.png",
      "alonso": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/feralo01.png",
      "antonelli": "https://media.formula1.com/image/upload/c_lfill,w_64/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/mercedes/andant01/2025mercedesandant01right.webp",
      "albon": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/alealb01.png",
      "hulkenberg": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/nichul01.png",
      "hadjar": "https://media.formula1.com/image/upload/c_lfill,w_64/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/racingbulls/isahad01/2025racingbullsisahad01right.webp",
      "bearman": "https://media.formula1.com/image/upload/c_lfill,w_64/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/haasf1team/olibea01/2025haasf1teamolibea01right.webp",
      "lawson": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/lialaw01.png",
      "ocon": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/estoco01.png",
      "stroll": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/lanstr01.png",
      "tsunoda": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/yuktsu01.png",
      "gasly": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/piegas01.png",
      "bortoleto": "https://media.formula1.com/image/upload/c_lfill,w_64/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/kicksauber/gabbor01/2025kicksaubergabbor01right.webp",
      "colapinto": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_auto/content/dam/fom-website/2018-redesign-assets/drivers/2024/fracol01.png",
    };
    return images[driverId] || "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/placeholder.jpg"; 
  };

  const handleMusicChange = (type: string, id: string) => {
      setSpotifyUrl(`https://open.spotify.com/embed/${type}/${id}?utm_source=generator`);
  };

  return (
    <Routes>
      <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      
      {/*메인 홈 데이터를 props로 전달 */}
      <Route path="/" element={<Home drivers={drivers} teams={teams} schedules={schedules} recommendations={[]} spotifyUrl="" />} />
      <Route path="/Home" element={<Home drivers={drivers} teams={teams} schedules={schedules} recommendations={[]} spotifyUrl="" />} />
      <Route path="/Music" element={<Music recommendations={musicRecs} spotifyUrl={spotifyUrl} onMusicChange={handleMusicChange} />} />
      <Route path="/MyPage" element={<MyPage />} />
      <Route path="/Announcement" element={<Announcement />} />
      <Route path="/NoticeBoard" element={<NoticeBoard />} />
      <Route path="/NoticeWrite" element={<NoticeWrite />} />
      <Route path="/BoardWrite" element={<BoardWrite />} />
      <Route path="/MemberRegister" element={<MemberRegister />} />
      <Route path="/MyBoard" element={<MyBoard />} />
    <Route path="/edit/:id" element={<ArticleEdit />} />
    <Route path="/detail/:id" element={<BoardDetail />} />
      <Route path="/Management" element={<Management />} />
      <Route path="/BoardManage" element={<BoardManage />} />
      <Route path="/MyEdit" element={<MyEdit/>} />
      {/* <Route path="/M" element={<M />} /> */}
    </Routes>
  );
}

export default App;