<<<<<<< HEAD
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { createContext } from "react";

import logo_performer from "./assets/images/logo_performer.png";

// 페이지 가져오기
import Home from "./pages/_test_/Home_seoya";
import PerformerRegistration from "./pages/PerformerRegistration";
import PerformerUpdate from "./pages/PerformerUpdate";
import Mypage from "./pages/Mypage";
import RentalDetails from "./pages/RentalDetails";
import RentalHistory from "./pages/RentalHistory";

const profiles = [
  {
    date: "2024-07-10",
    title: "고스락",
    members: ["전재윤", "김시아", "김태형", "이기준", "고남신", "수지후"],
    school: "홍익대학교 소속",
    image: logo_performer,
    information: "",
  },
  {
    date: "2023-11-23",
    title: "고스락",
    members: ["전재윤", "김시아", "김태형", "이기준", "고남신", "수지후"],
    school: "홍익대학교 소속",
    image: logo_performer,
    information: "",
  },
  {
    date: "2023-09-12",
    title: "고스락",
    members: ["전재윤", "김시아", "김태형", "이기준", "고남신", "수지후"],
    school: "홍익대학교 소속",
    image: logo_performer,
    information: "",
  },
];

const venues = [
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
  },
];

export const ProfileContext = createContext();
export const VenueContext = createContext();

function App() {
  return (
    <>
      <ProfileContext.Provider value={profiles}>
        <VenueContext.Provider value={venues}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/performer_registraion"
                element={<PerformerRegistration />}
              />
              <Route path="/performer_update" element={<PerformerUpdate />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/rental_details" element={<RentalDetails />} />
              <Route path="/rental_history" element={<RentalHistory />} />
            </Routes>
          </div>
        </VenueContext.Provider>
      </ProfileContext.Provider>
    </>
=======
import React from 'react';
import './App.css';
import VenueDetailPage from './pages/VenueDetailPage';

function App() {
  return (
    <div className="App">
      <VenueDetailPage />
    </div>
>>>>>>> 8b4c400a40cfa142433ae12c323a221e2291f1dc
  );
}

export default App;
