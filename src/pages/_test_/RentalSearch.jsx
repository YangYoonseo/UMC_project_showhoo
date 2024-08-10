import "../../styles/Jisu/rentalSearch.css";

import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import BookingSearchBar from "../../components/_test_/Booking/BookingSearchBar";
import RentalSearchFilter from "../../components/rental/RentalSearchFilter.jsx"

// HOT 공연장 리스트 가져오기

const RentalSearch = () => {
  return (
      <div className="rentalSearchBody">
        <Navbar_Perforemr />
        <div className="gap130"></div>
      
        <div className="BarAndFilter">
          <BookingSearchBar />
          <RentalSearchFilter />
      </div>
      
      <div className="gap58"></div>
      <div className="ConcertHallAndMap">
        <div className="ConcertHall">

        </div>
        <div className="Map">
          
        </div>
      </div>
      </div>
    );
  };

export default RentalSearch;