import "../../styles/Jisu/rentalSearch.css";
import Footer from "../../components/common/Footer";
import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import RentalSearchBar_2 from "../../components/rental/RentalSearchBar_2.jsx";
import RentalSearchFilter from "../../components/rental/RentalSearchFilter.jsx"
import HotConcertHall from "../../components/_test_/Booking/HotConcertHall.jsx";
import SearchMap from "../../components/rental/SearchMap.jsx";

// 검색 결과창
const RentalSearch = () => {
  return (
      <div className="RentalSearch">
        <Navbar_Perforemr />
        <Footer />
      <div className="RentalSearchContent">
          <div className="BarAndFilter">
            <RentalSearchBar_2 />
            <RentalSearchFilter />
          </div>
          < div className="ConcertHallAndMap">
            <div className="ConcertHallAndMapBody">
              <div className="FindText">
                홍대 콘서트홀 54{ }개 발견
              </div>
            <div className="ConcertHalls">
                <HotConcertHall />
                <HotConcertHall />
                <HotConcertHall />
            </div>
            <div className="ConcertHalls">
                <HotConcertHall />
                <HotConcertHall />
                <HotConcertHall />
            </div>
            <div className="ConcertHalls">
                <HotConcertHall />
                <HotConcertHall />
                <HotConcertHall />
            </div>
            <div className="ConcertHalls"
            style={{margin: "0px 0px 75px 0px"}}>
                <HotConcertHall />
                <HotConcertHall />
                <HotConcertHall />
              </div>
              <div className="Pagination">
                0 1 2 3 4
              </div>
            </div>
          <div className="Map">
            <SearchMap/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalSearch;