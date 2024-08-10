import "../../styles/Jisu/bookingSearch.css";

import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import BookingInfoPoster from "../../components/_test_/Booking/BookingInfoPoster";
import Footer from "../../components/common/Footer";
import BookingSearchBar from "../../components/_test_/Booking/BookingSearchBar";

const Booking = () => {
    return (
      <div className="Booking">
        <div>
          <Navbar_Perforemr/>
          <BookingInfoPoster/>
        </div>
        <BookingSearchBar />
        <Footer/>
      </div>
    );
  };

export default Booking;