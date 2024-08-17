import "../../styles/Jisu/rentalSearch.css";
import PageImg from "../../assets/img_Booking/_test_/RentalSearchPage1.svg"
import Footer from "../../components/common/Footer";
import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import RentalSearchBar_2 from "../../components/rental/RentalSearchBar_2.jsx";
import RentalSearchFilter from "../../components/rental/RentalSearchFilter.jsx"

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
          {
          <div className="ConcertHallAndMap">
            <div className="ConcertHallBody">
              <div className="FindText">
                홍대 콘서트홀 54{ }개 발견
              </div>
              <div className="ConcertHalls">
                <div>○</div>
                <div>○</div>
                <div>○</div>
                <div>○</div>
                <div>○</div>
              </div>
              <div className="Pagination">
                1 2 3 4
              </div>
            </div>
            <div className="Map">
              Map
            </div>
        </div>
        }
      </div>
    </div>
  );
};

export default RentalSearch;