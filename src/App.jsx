import "./App.css";

import { Routes, Route } from "react-router-dom";
import { createContext, useState, useReducer } from "react";

import logo_performer from "./assets/images/logo_performer.png";
import poster from "./assets/img_Booking/poster.svg";

// 페이지 가져오기
import Home from "./pages/_test_/Home_seoya";
import Rental from "./pages/_test_/Rental.jsx";
import RentalAfter from "./pages/_test_/RentalAfter.jsx";
import PerformerRegistration from "./pages/PerformerRegistration";
import PerformerUpdate from "./pages/PerformerUpdate";
import Mypage from "./pages/Mypage";
import RentalDetails from "./pages/RentalDetails";
import RentalHistory from "./pages/RentalHistory";
import VenueDetailPage from "./pages/VenueDetailPage";
import VenueRegisterPage from "./pages/VenueRegisterPage";
import Navbar_Performer from "./components/common/Navbar_Performer";
import Navbar_Performer_Host from "./components/common/Navbar_Performer_Host";
import Footer from "./components/common/Footer";
import LoginPage from "./pages/Loginpage";
import Alarm from "./pages/Alarm";
import MyActivity from "./pages/MyActivity.jsx";
import ConcertReady from "./pages/ConcertReady.jsx";
import BookingHistroy from "./pages/BookingHistory.jsx";
import PerformerReady from "./pages/PerformerReady.jsx";
import ConReady from "./pages/ConReady.jsx";
import Booking from "./pages/Booking.jsx";

const ex_profiles = [
  {
    date: "2024-07-10",
    title: "고스락 23기",
    members: ["전재윤", "김시아", "김태형", "이기준", "고남신", "수지후"],
    school: "홍익대학교 소속",
    image: logo_performer,
    information: "설명1",
    status: "대관 신청",
    number: "010-0000-0000",
  },
  {
    date: "2023-11-23",
    title: "고스락 22기",
    members: ["전재윤", "김시아", "김태형", "이기준", "고남신", "수지후"],
    school: "홍익대학교 소속",
    image: logo_performer,
    information: "설명2",
    status: "공연 완료",
    number: "010-0000-0000",
  },
  {
    date: "2023-09-12",
    title: "BUZZY",
    members: ["전재윤", "김시아", "김태형", "이기준", "고남신", "수지후"],
    school: "홍익대학교 소속",
    image: logo_performer,
    information: "설명3",
    status: "대관 완료",
    number: "010-0000-0000",
  },
];

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

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const ProfileContext = createContext();
export const ProfileDispatch = createContext();
export const VenueContext = createContext();
export const PamphletContext = createContext();

function App() {
  // 공연장, 관람자는 useState, 프로필은 useReducer로 했음
  const [venues, setVenues] = useState(ex_venues);
  const [profiles, dispatch] = useReducer(reducer, ex_profiles);
  const [pamphlets, setPamphlets] = useState(ex_pamphlets);

  const cancelPamphlet = (id) => {
    setPamphlets(
      pamphlets.map((pamphlet) =>
        pamphlet.id === id ? { ...pamphlet, status: "취소" } : pamphlet
      )
    );
  };

  const addProfile = (profile) => {
    dispatch({
      type: "ADD",
      data: profile,
    });
  };

  const updateProfile = (profile) => {
    dispatch({
      type: "UPDATE",
      data: profile,
    });
  };

  const deleteProfile = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    <>
      <ProfileContext.Provider value={profiles}>
        <ProfileDispatch.Provider
          value={{ addProfile, updateProfile, deleteProfile }}
        >
          <VenueContext.Provider value={{ venues, setVenues }}>
            <PamphletContext.Provider
              value={{ pamphlets, setPamphlets, cancelPamphlet }}
            >
              <div className="App">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/performer_registraion"
                    element={<PerformerRegistration />}
                  />
                  <Route
                    path="/performer_update"
                    element={<PerformerUpdate />}
                  />
                  <Route path="/rental" element={<Rental />} />
                  <Route path="/rental_after" element={<RentalAfter />} />
                  <Route path="/mypage" element={<Mypage />} />
                  <Route path="/rental_details" element={<RentalDetails />} />
                  <Route path="/rental_history" element={<RentalHistory />} />
                  <Route path="/venue_detail" element={<VenueDetailPage />} />  {/* 공연자 플로우 */}
                  <Route path="/venue_register" element={<VenueRegisterPage />} />  {/* 공연장 플로우 */}
                  <Route path="alarm" element={<Alarm />} />
                  <Route path="/my_activity" element={<MyActivity />} />
                  <Route path="/concert_ready" element={<ConcertReady />} />
                  <Route path="/booking_history" element={<BookingHistroy />} />
                  <Route path="/performer_ready" element={<PerformerReady />} />
                  <Route path="/con_ready" element={<ConReady />} />
                  <Route path="/booking" element={<Booking />} />
                </Routes>
              </div>
            </PamphletContext.Provider>
          </VenueContext.Provider>
        </ProfileDispatch.Provider>
      </ProfileContext.Provider>
    </>
  );
}

export default App;
