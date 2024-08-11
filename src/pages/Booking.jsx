import "../styles/Eojin/Booking.css";
import { useState } from "react";

import Navbar_Booking from "../components/common/Navbar_Booking";
import Footer from "../components/common/Footer";
import Book_component from "../components/booking/Book_component";
import Mockdata from "../components/booking/mockdata";

import Star1 from "../assets/img_Ready/Star1.svg";
import Star2 from "../assets/img_Ready/Star2.svg";
import search from "../assets/img_Booking/Booking/search.svg";

import Book_detail from "../components/booking/Book_detail";

const Booking = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [filteredConcerts, setFilteredConcerts] = useState(Mockdata); // 필터링된 결과 상태
  const [isOpen, setIsOpen] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState(null); // 선택된 공연 상태

  const handleSearch = () => {
    const filtered = Mockdata.filter((concert) =>
      concert.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredConcerts(filtered);
  };

  const handleClick = (concert) => {
    setSelectedConcert(concert); // 선택된 공연 데이터를 저장
    setIsOpen(true); // 상세 설명 화면 열기
  };

  return (
    <div className="Booking">
      <Navbar_Booking />
      <Footer />
      {!isOpen && (
        <div className="Booking_container">
          <div className="Booking_Header">
            <img className="Star1" src={Star1} alt="Star" />
            <h2>
              <span className="highlight">ShowHoo</span>에서 다양한 <br />
              공연들을 만나보세요
            </h2>
            <img className="Star2" src={Star2} alt="Star" />
          </div>
          <div className="Booking_search">
            <input
              placeholder="공연 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="img" onClick={handleSearch}>
              <img className="search" src={search} alt="search" />
            </div>
          </div>
          <div className="Booking_content">
            {filteredConcerts.map((concert) => (
              <Book_component
                key={concert.id}
                id={concert.id}
                img={concert.poster}
                name={concert.name}
                date={concert.date}
                onClick={() => handleClick(concert)} // 클릭 핸들러 추가
              />
            ))}
          </div>
        </div>
      )}
      {isOpen && selectedConcert && (
        <Book_detail
          key={selectedConcert.id}
          id={selectedConcert.id}
          name={selectedConcert.name}
          img={selectedConcert.poster}
          place={selectedConcert.place}
          date={selectedConcert.date}
          runningtime={selectedConcert.runningtime}
          host={selectedConcert.host}
          cancel={selectedConcert.cancel}
          concert_inf={selectedConcert.concert_inf}
          sell_inf={selectedConcert.refund_inf}
          price={selectedConcert.price}
          amount={selectedConcert.amount}
        />
      )}
    </div>
  );
};

export default Booking;
