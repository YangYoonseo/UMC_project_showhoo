//App.jsx
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { createContext, useState, useReducer, useEffect } from "react";

import axios from "axios";

import logo_performer from "./assets/images/logo_performer.svg";
import poster from "./assets/img_Booking/poster.svg";

// 페이지 가져오기
import Home_Booking from "./pages/Home_Booking.jsx";
import Home_Concert from "./pages/Home_Concert.jsx";
import Home_Performer from "./pages/Home_Performer.jsx";
import Rental from "./pages/_test_/Rental.jsx";
import RentalSearch from "./pages/_test_/RentalSearch.jsx";
import PerformerRegistration from "./pages/PerformerRegistration";
import PerformerUpdate from "./pages/PerformerUpdate";
import Mypage from "./pages/Mypage";
import RentalDetails from "./pages/RentalDetails";
import RentalHistory from "./pages/RentalHistory";
import VenueDetailPage from "./pages/VenueDetailPage";
import VenueRegisterPage from "./pages/VenueRegisterPage";
import LoginPage from "./pages/Loginpage";
import Alarm from "./pages/Alarm";
import AlarmConcert from "./pages/AlarmConcert.jsx";
import AlarmBooking from "./pages/AlarmBooking.jsx";
import MyActivity from "./pages/MyActivity.jsx";
import ConcertReady from "./pages/ConcertReady.jsx";
import BookingHistroy from "./pages/BookingHistory.jsx";
import PerformerReady from "./pages/PerformerReady.jsx";
import ConReady from "./pages/ConReady.jsx";
import Booking from "./pages/Booking.jsx";
import MypageBooking from "./pages/MypageBooking.jsx";
import MypageConcert from "./pages/MypageConcert.jsx";
import LikeBooking from "./pages/LikeBooking.jsx";
import Login from "./Login.jsx";
import Mockdata from "./components/booking/mockdata.jsx";

const token = sessionStorage.getItem("accessToken");
const uid = sessionStorage.getItem("uid");

const ex_venues = [
  {
    id: "18508080132",
    name: "001 클럽",
    location: "서울특별시 마포구 와우산로18길 20",
    capacity: "100 - 120명",
    date: "2024-05-01",
    price: "₩640,000",
    status: "승인 예정",
    image: logo_performer,
    size: "198",
    like: true,
  },
  {
    id: "45728350353",
    name: "플러스라운지",
    location: "서울 마포구 양화로 100-10 다리빌딩",
    capacity: "90 - 100명",
    date: "2024-05-30",
    price: "₩900,000",
    status: "승인 완료",
    image: logo_performer,
    like: true,
  },
  {
    id: "57389108490",
    name: "드림홀",
    location: "서울 마포구 양화로 64 서교제일빌딩 지하2층",
    capacity: "60 - 70명",
    date: "2023-02-24",
    price: "₩700,000",
    status: "지난 공연",
    image: logo_performer,
    like: false,
  },
];

const ex_pamphlets = [
  {
    id: "58908502581",
    status: "승인 예정",
    title: "2024 PS 여름 정기공연",
    location: "연세대학교 PS",
    date: "2024-08-23",
    time: "19:00",
    club: "clubAOR",
    image: poster,
  },
  {
    id: "58908502582",
    status: "예매 완료",
    title: "2024 PS 여름 정기공연",
    location: "연세대학교 PS",
    date: "2024-08-23",
    time: "19:00",
    club: "clubAOR",
    image: poster,
  },
  {
    id: "58908502583",
    status: "공연 완료",
    title: "2024 PS 여름 정기공연",
    location: "연세대학교 PS",
    date: "2024-08-23",
    time: "19:00",
    club: "clubAOR",
    image: poster,
  },
];

// 프로필 Reducer 함수 정의
function reducer(state, action) {
  switch (action.type) {
    case "SET_PROFILES":
      return action.data;
    default:
      return state;
  }
}

export const ProfileContext = createContext();
export const VenueContext = createContext();
export const PamphletContext = createContext();
export const IdContext = createContext();

function App() {
  // 공연장, 관람자는 useState, 프로필은 useReducer로 했음
  const [venues, setVenues] = useState(ex_venues);
  const [profiles, dispatch] = useReducer(reducer, []);
  const [pamphlets, setPamphlets] = useState(ex_pamphlets);
  const [id, setId] = useState();

  // API에서 프로필 데이터를 가져오는 함수
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/profile/1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("프로필 데이터 가져오기", response.data.result);

        const profile = response.data.result;

        // 만든 날짜 추가
        const currentDate = new Date().toISOString().split("T")[0];
        const profilesWithDate = profile.map((item) => ({
          ...item,
          date: currentDate,
        }));

        dispatch({
          type: "SET_PROFILES",
          data: profilesWithDate,
        });
      } catch (error) {
        console.error("프로필 데이터를 가져오는데 실패했습니다:", error);
      }
    };

    fetchProfiles();
  }, []);

  // uid로 아이디 받아오기
  useEffect(() => {
    const MemberId = async (uid) => {
      try {
        const response = await axios.get(
          `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/member_info/${uid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("아이디", response.data.result);
        setId(response.data.result);
      } catch (error) {
        console.log("아이디 받아오기 실패", error);
      }
    };
    MemberId(uid);
  }, []);

  const cancelPamphlet = (id) => {
    setPamphlets(
      pamphlets.map((pamphlet) =>
        pamphlet.id === id ? { ...pamphlet, status: "취소" } : pamphlet
      )
    );
  };

  return (
    <>
<<<<<<< HEAD
      <IdContext.Provider value={id}>
        <ProfileContext.Provider value={profiles}>
          <VenueContext.Provider value={{ venues, setVenues }}>
            <PamphletContext.Provider
              value={{ pamphlets, setPamphlets, cancelPamphlet }}
            >
              <div className="App">
                <Routes>
                  <Route path="/" element={<Home_Performer />} />
                  <Route path="/home_concert" element={<Home_Concert />} />
                  <Route path="/home_booking" element={<Home_Booking />} />
                  <Route path="/login/oauth2/code/kakao" element={<Login />} />
                  <Route
                    path="/performer_registration"
                    element={<PerformerRegistration />}
                  />
                  <Route
                    path="/performer_update"
                    element={<PerformerUpdate />}
                  />
                  <Route path="/mypage_performer" element={<Mypage />} />
                  <Route path="/rental" element={<Rental />} />
                  <Route path="/rental_search" element={<RentalSearch />} />
                  <Route path="/mypage" element={<Mypage />} />
                  <Route path="/rental_details" element={<RentalDetails />} />
                  <Route path="/rental_history" element={<RentalHistory />} />
                  <Route
                    path="/venue_detail"
                    element={<VenueDetailPage data={{ spaceId: 1 }} />}
                  />{" "}
                  {/* 공연자 플로우 */}
                  <Route
                    path="/venue_register"
                    element={<VenueRegisterPage />}
                  />{" "}
                  {/* 공연장 플로우 */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="alarm" element={<Alarm />} />
                  <Route path="/my_activity" element={<MyActivity />} />
                  <Route path="/concert_ready" element={<ConcertReady />} />
                  <Route path="/booking_history" element={<BookingHistroy />} />
                  <Route path="/performer_ready" element={<PerformerReady />} />
                  <Route path="/con_ready" element={<ConReady />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/mypage_concert" element={<MypageConcert />} />
                  <Route path="mypage_booking" element={<MypageBooking />} />
                  <Route path="/like_booking" element={<LikeBooking />} />
                  <Route path="/alarm_booking" element={<AlarmBooking />} />
                  <Route path="/alarm_concert" element={<AlarmConcert />} />
                </Routes>
              </div>
            </PamphletContext.Provider>
          </VenueContext.Provider>
        </ProfileContext.Provider>
      </IdContext.Provider>
=======
      {console.log("현재 프로필", profiles)}
      <ProfileContext.Provider value={profiles}>
        <VenueContext.Provider value={{ venues, setVenues }}>
          <PamphletContext.Provider
            value={{ pamphlets, setPamphlets, cancelPamphlet }}
          >
            <div className="App">
              <Routes>
                <Route path="/" element={<Home_Performer />} />
                <Route path="/home_concert" element={<Home_Concert />} />
                <Route path="/home_booking" element={<Home_Booking />} />
                <Route path="/login/oauth2/code/kakao" element={<Login />} />
                <Route
                  path="/performer_registration"
                  element={<PerformerRegistration />}
                />
                <Route path="/performer_update" element={<PerformerUpdate />} />
                <Route path="/mypage_performer" element={<Mypage />} />
                <Route path="/rental" element={<Rental />} />
                <Route path="/rental_search" element={<RentalSearch />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/rental_details" element={<RentalDetails />} />
                <Route path="/rental_history" element={<RentalHistory />} />
                <Route path="/venue_detail" element={<VenueDetailPage />}/>
                <Route path="/venue_register" element={<VenueRegisterPage />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="alarm" element={<Alarm />} />
                <Route path="/my_activity" element={<MyActivity />} />
                <Route path="/concert_ready" element={<ConcertReady />} />
                <Route path="/booking_history" element={<BookingHistroy />} />
                <Route path="/performer_ready" element={<PerformerReady />} />
                <Route path="/con_ready" element={<ConReady />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/mypage_concert" element={<MypageConcert />} />
                <Route path="mypage_booking" element={<MypageBooking />} />
                <Route path="/like_booking" element={<LikeBooking />} />
                <Route path="/alarm_booking" element={<AlarmBooking />} />
                <Route path="/alarm_concert" element={<AlarmConcert />} />
              </Routes>
            </div>
          </PamphletContext.Provider>
        </VenueContext.Provider>
      </ProfileContext.Provider>
>>>>>>> 737724bc180e278022e230bb93a27eac6200861a
    </>
  );
}

export default App;
