import "./App.css";

import { Routes, Route } from "react-router-dom";
import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useState,
} from "react";

import axios from "axios";

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
import { ProfileIdProvider } from "./components/com_Performer/ProfileProvider.jsx";

// context 가져오기
import { FacilityProvider } from "./components/VenueRegister_Introduce/FacilityContext.jsx";

const token = sessionStorage.getItem("accessToken");
const uid = sessionStorage.getItem("uid");
const performerId = sessionStorage.getItem("performerId");
const url = "https://showhoo.site";

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
export const IdContext = createContext();

function App() {
  // 공연자 프로필만
  const [profiles, dispatch] = useReducer(reducer, []);

  // API에서 프로필 데이터를 가져오는 함수
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!token) return; // If no token, do not attempt to fetch

      try {
        const response = await axios.get(`${url}/profile/${performerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

        // Retry fetching after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    };

    fetchProfiles();
  }, []);

  // uid로 아이디 받아오기
  useEffect(() => {
    const MemberId = async (uid) => {
      if (!token) return; // If no token, do not attempt to fetch
      try {
        const response = await axios.get(`${url}/member_info/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("아이디", response.data.result);
        const id = response.data.result;

        sessionStorage.setItem("performerId", id.performerId);
        sessionStorage.setItem("spaceUserId", id.spaceUserId);
        sessionStorage.setItem("audienceId", id.audienceId);
        sessionStorage.setItem("poster", id.profile_url);
      } catch (error) {
        console.log("아이디 받아오기 실패", error);

        // Retry fetching after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    };
    MemberId(uid);
  }, []);

  return (
    <>
      <FacilityProvider>
        <ProfileIdProvider>
          <ProfileContext.Provider value={profiles}>
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
                <Route
                  path="/venue_detail/:spaceId"
                  element={<VenueDetailPage />}
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
          </ProfileContext.Provider>
        </ProfileIdProvider>
      </FacilityProvider>
    </>
  );
}

export default App;
