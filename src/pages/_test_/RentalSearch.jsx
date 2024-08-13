import "../../styles/Jisu/rentalSearch.css";
import PageImg from "../../assets/img_Booking/_test_/RentalSearchPage1.svg"
import Footer from "../../components/common/Footer";
import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import RentalSearchBar from "../../components/_test_/Booking/BookingSearchBar";
import RentalSearchFilter from "../../components/rental/RentalSearchFilter.jsx"

// 검색 결과창
const RentalSearch = () => {
  return (
      <div className="RentalSearch">
        <Navbar_Perforemr />
        <Footer />
      <div className="RentalSearchContent">
          <div className="BarAndFilter">
            <RentalSearchBar />
            <RentalSearchFilter />
          </div>
          {
          <div className="ConcertHallAndMap">
            <div className="ConcertHall">
              ConcertHall
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