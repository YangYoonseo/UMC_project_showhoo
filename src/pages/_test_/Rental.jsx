import "../../styles/Jisu/rental.css";

import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import BookingInfoPoster from "../../components/_test_/Booking/BookingInfoPoster";
import RentalSearchBar from "../../components/_test_/Booking/BookingSearchBar";
import HotConcertHall from "../../components/_test_/Booking/HotConcertHall";
import Footer from "../../components/common/Footer";

const Rental = () => {
  return (
      <div className="Rental">
        <Navbar_Perforemr />
        <Footer />
        <div className="RentalContent">
          <BookingInfoPoster />
          <div className="RentalSearchBar"> 
            <RentalSearchBar />
          </div>
          <div className="concertText">
                이번 달 HOT 공연장</div>
          <div className="ConcertHallList">
            <HotConcertHall />
            <HotConcertHall />
            <HotConcertHall />
            <HotConcertHall />
            </div>
            <div className="ConcertHallList">
              <HotConcertHall />
              <HotConcertHall />
              <HotConcertHall />
              <HotConcertHall />
          </div>
          
          <div className="concertText">
            또 가고 싶은 공연장</div>
          <div className="ConcertHallList">
              <HotConcertHall />
              <HotConcertHall />
              <HotConcertHall />
              <HotConcertHall />
          </div>
          <div className="ConcertHallList">
              <HotConcertHall />
              <HotConcertHall />
              <HotConcertHall />
              <HotConcertHall />
          </div>
        </div>
      </div>
    );
  };

export default Rental;