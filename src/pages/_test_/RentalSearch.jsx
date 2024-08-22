import "../../styles/Jisu/rentalSearch.css";
import Footer from "../../components/common/Footer";
import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import RentalSearchBar_2 from "../../components/rental/RentalSearchBar_2.jsx";
import RentalSearchFilter from "../../components/rental/RentalSearchFilter.jsx"
import HotConcertHall from "../../components/_test_/Booking/HotConcertHall.jsx";
import SearchMap from "../../components/rental/SearchMap.jsx";
import React, { useState } from "react";

// 검색 결과창
const RentalSearch = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const hallsPerPage = 12; // 한 페이지에 표시할 콘서트홀 개수

  // 예시 데이터 (실제로는 API에서 받아와야 함)
  const concertHalls = new Array(2).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Concert Hall ${i + 1}`,
  }));

  const totalPages = Math.ceil(concertHalls.length / hallsPerPage);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 현재 페이지에 표시할 데이터 가져오기
  const indexOfLastHall = currentPage * hallsPerPage;
  const indexOfFirstHall = indexOfLastHall - hallsPerPage;
  const currentHalls = concertHalls.slice(indexOfFirstHall, indexOfLastHall);

  // 페이지 번호를 클릭할 때 호출되는 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <div className="RentalSearch">
        <Navbar_Perforemr />
        <Footer />
        <div className="RentalSearchContent">
          <div className="BarAndFilter">
            <RentalSearchBar_2 />
            <RentalSearchFilter />
          </div>

          <div className="ConcertHallAndMap">
            <div className="ConcertHallAndMapBody" style={{ display: isCollapsed ? 'none' : 'block' }}>
              <div className="FindText">
                홍대 콘서트홀 {concertHalls.length}개 발견
              </div>
              <div className="ConcertHalls">
                {currentHalls.map((hall) => (
                  <HotConcertHall className="ConcertHallCss" key={hall.name} hall={hall} />
                ))}
              </div>
              <div className="Pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={i + 1 === currentPage ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className="Map" style={{ width: isCollapsed ? '100%' : '50%' }}>
              <SearchMap />
            </div>
          </div>
          
          <button onClick={toggleCollapse} className="toggleButton">
            {isCollapsed ? "콘서트홀 목록 보기" : "지도만 보기"}
          </button>
        </div>
    </div>
  );
};

export default RentalSearch;