import "../../styles/Jisu/bookingSearch.css";

import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import BookingInfoPoster from "../../components/_test_/Booking/BookingInfoPoster";
import Footer from "../../components/common/Footer";
import BookingSearchBar from "../../components/_test_/Booking/BookingSearchBar";
import HotConcertHall from "../../components/_test_/Booking/HotConcertHall";

// HOT 공연장 리스트 가져오기

const Booking = () => {
  return (
      <div className="body">
        <div className="Booking">
          <Navbar_Perforemr/>
          <BookingInfoPoster />
          <BookingSearchBar />
          <div className="HOT">
            이번 달 HOT 공연장
        </div>
        <div className="HotConcertHallList">
          <HotConcertHall />
          <HotConcertHall />
          <HotConcertHall />
          <HotConcertHall />
        </div>
        </div>
      </div>
    );
  };

export default Booking;