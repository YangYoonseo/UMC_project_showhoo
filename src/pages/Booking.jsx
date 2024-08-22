import "../styles/Eojin/Booking.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar_Booking from "../components/common/Navbar_Booking";
import Footer from "../components/common/Footer";
import Book_component from "../components/booking/Book_component";
import Pagination from "../components/VenueRegister_Introduce/Pagination";

import Star1 from "../assets/img_Ready/Star1.svg";
import Star2 from "../assets/img_Ready/Star2.svg";
import search from "../assets/img_Booking/Booking/search.svg";

import Book_detail from "../components/booking/Book_detail";

const Booking = () => {
  const [term, setTerm] = useState("");                             // 검색어 상태 
  const [isOpen, setIsOpen] = useState(false);                      // 전체 공연 조회 페이지 || 상세설명 페이지 
  const [selectedConcert, setSelectedConcert] = useState(null);     // 선택된 공연 상태
  const [concerts, setConcerts] = useState([]);                     // 공연 리스트 
  const [currentPage, setCurrentPage] = useState(1);                // 현재 페이지
  const [currentConcerts, setCurrentConcerts] = useState([]);
  const [concertCount, setConcertCount] = useState(0);
  const concertsPerPage = 8; // 한페이지 당 콘서트 수 

  // 전체 공연 리스트 API 연결 
  const audienceId = sessionStorage.getItem("audienceId");

  async function getDownloadData() {
      const token = sessionStorage.getItem("accessToken");
      try {
          const res = await axios.get(
              `https://showhoo.site/aud/${audienceId}`,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },           
              }
          );
          const totalConcert = res.data.result.showsList;
          setConcerts(totalConcert);
          const listSize = res.data.result.listSize;
          setConcertCount(listSize);
          console.log("다운로드 양식 보기", res.data);
      } catch (error) {
          console.log("Error:", error);
      }
  };

  // 전체 공연 게시물 조회 
  useEffect(() => {
    getDownloadData();
  }, []);

  // 공연 검색 리스트 API 연결 
  async function getFilterConcert() {
    const token = sessionStorage.getItem("accessToken");
    const request = term;
    try {
        const res = await axios.get(
            `https://showhoo.site/aud/${audienceId}/search/${encodeURIComponent(request)}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },           
            }
        );
        const totalConcert = res.data.result.showsList;
        setConcerts(totalConcert);
        const listSize = res.data.result.listSize;
        setConcertCount(listSize);
        setCurrentPage(1); // 검색 후 페이지를 초기화
        console.log("다운로드 양식 보기", res.data);
    } catch (error) {
        console.log("Error:", error);
    }
  };

  // 현재 페이지에 해당하는 콘서트 데이터 계산
  useEffect(() => {
    if (concerts) {
      const indexOfLastConcert = currentPage * concertsPerPage;
      const indexOfFirstConcert = indexOfLastConcert - concertsPerPage;
      const slicedConcerts = concerts.slice(indexOfFirstConcert, indexOfLastConcert);
      setCurrentConcerts(slicedConcerts);
      console.log("Sliced Concerts:", slicedConcerts); // 슬라이스된 콘서트 목록 출력
    }
  }, [concerts, currentPage]);

  // 페이지 번호 클릭 시 호출되는 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 공연 상세 설명 API 연결 
  async function getFilterData(showsId) {
    const token = sessionStorage.getItem("accessToken");
    try {
        const res = await axios.get(
            `https://showhoo.site/aud/${showsId}/detail`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },           
            }
        );
        const show = res.data.result;
        setSelectedConcert(show);
        console.log("다운로드 양식 보기", res.data);
    } catch (error) {
        console.log("Error:", error);
    }
  };

  // 공연 상세 설명 뜨게 하기 
  const handleClick = (showId) => {
    getFilterData(showId);
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
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <div className="img" onClick={getFilterConcert}>
              <img className="search" src={search} alt="search" />
            </div>
          </div>
          <div className="Booking_content">
            {currentConcerts.map((concert) => (
              <Book_component
                key={concert.showsId}
                id={concert.showsId}
                img={concert.poster}
                name={concert.name}
                date={concert.date}
                isPreferred={concert.isPreferred}
                onClick={() => handleClick(concert.showsId)} // 클릭 핸들러 추가
              />
            ))}
          </div>
          <div className="pageNum">
            <Pagination
              reviewsPerPage={concertsPerPage}
              totalReviews={concertCount}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
      {isOpen && selectedConcert && (
        <Book_detail
          key={selectedConcert.showsId}
          id={selectedConcert.showsId}
          audienceId={audienceId}
          host={selectedConcert.host}
          img={selectedConcert.poster}
          name={selectedConcert.name}
          place={selectedConcert.place}
          description={selectedConcert.description}
          descriptionImg={selectedConcert.descriptionImg}
          date={selectedConcert.date}
          time={selectedConcert.time}
          cancelDate={selectedConcert.cancelDate}
          cancelTime={selectedConcert.cancelTime}
          runningtime={selectedConcert.runningtime}
          remainTicketNum={selectedConcert.remainTicketNum}
          price={selectedConcert.ticketPrice}
          permaxTicket={selectedConcert.permaxTicket}
          bank={selectedConcert.bank}
          accountHolder={selectedConcert.accountHolder}
          accountNum={selectedConcert.accountNum}
        />
      )}
    </div>
  );
};

export default Booking;
