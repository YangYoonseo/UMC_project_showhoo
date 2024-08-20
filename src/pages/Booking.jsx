import "../styles/Eojin/Booking.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar_Booking from "../components/common/Navbar_Booking";
import Footer from "../components/common/Footer";
import Book_component from "../components/booking/Book_component";
// import Mockdata from "../components/booking/Mockdata";

import Star1 from "../assets/img_Ready/Star1.svg";
import Star2 from "../assets/img_Ready/Star2.svg";
import search from "../assets/img_Booking/Booking/search.svg";

import Book_detail from "../components/booking/Book_detail";

const Booking = () => {
  const [term, setTerm] = useState("");                             // 검색어 상태 
  const [searchTerm, setSearchTerm] = useState("");                 // 검색어 
  const [isOpen, setIsOpen] = useState(false);                      // 전체 공연 조회 페이지 || 상세설명 페이지 
  const [selectedConcert, setSelectedConcert] = useState(null);     // 선택된 공연 상태
  const [concerts, setConcerts] = useState([]);                     // 공연 리스트 
  const [currentPage, setCurrentPage] = useState(0);                // 현재 페이지
  const [totalPages, setTotalPages] = useState(0);                  // 전체 페이지 

  // 전체 공연 리스트 API 연결 
  const audienceId = 1;

  async function getDownloadData(page) {
      const token = sessionStorage.getItem("accessToken");
      try {
          const res = await axios.get(
              `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/aud/${audienceId}?page=${page}`,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },           
              }
          );
          const totalConcert = res.data.result.showList;
          setConcerts(totalConcert);
          setTotalPages(res.data.result.totalPages);
          console.log("다운로드 양식 보기", res.data);
      } catch (error) {
          console.log("Error:", error);
      }
  };

  // 페이지가 바뀌거나 관람객이 바뀔 때 
  useEffect(() => {
      getDownloadData(currentPage);
  }, [currentPage, audienceId]);

  // 검색 
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // 공연 검색 리스트 API 연결 
  async function getFilterData(page) {
    const token = sessionStorage.getItem("accessToken");
    try {
        const res = await axios.get(
            `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/aud/${audienceId}/search?page=${page}&request=${searchTerm}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },           
            }
        );
        const totalConcert = res.data.result.showList;
        setConcerts(totalConcert);
        setTotalPages(res.data.result.totalPages);
        console.log("다운로드 양식 보기", res.data);
    } catch (error) {
        console.log("Error:", error);
    }
  };

  // 검색하면 다시 첫 페이지가 뜨도록 하기 
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  // 페이지가 바뀌거나 검색어가 바뀔 때 
  useEffect(() => {
      getFilterData(currentPage);
  }, [currentPage, searchTerm]);

  // 페이지 변경 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 페이지 번호 생성
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <button
                key={i}
                onClick={() => handlePageChange(i-1)}
            >
                {i}
            </button>
        );
    }
    return pageNumbers;
  };

  // 공연 상세 설명 API 연결 
  async function getFilterData(showsId) {
    const token = sessionStorage.getItem("accessToken");
    try {
        const res = await axios.get(
            `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/aud/${showsId}/detail`,
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
            <div className="img" onClick={handleSearch(term)}>
              <img className="search" src={search} alt="search" />
            </div>
          </div>
          <div className="Booking_content">
            {concerts.map((concert) => (
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
            {renderPageNumbers()}
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
