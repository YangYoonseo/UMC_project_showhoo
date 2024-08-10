import "../styles/Eojin/Booking.css";
import Navbar_Booking from "../components/common/Navbar_Booking";
import Footer from "../components/common/Footer";
import Star1 from "../assets/img_Ready/Star1.svg";
import Star2 from "../assets/img_Ready/Star2.svg";
import search from "../assets/img_Booking/Booking/search.svg";

const Booking = () => {
    return (
        <div className="Booking">
            <Navbar_Booking />
            <Footer />
            <div className="Booking_container">
                <div className="Booking_Header">
                    <img className="Star1" src={Star1} arc="Star" />
                    <h2><span className="highlight">ShowHoo</span>에서 다양한 <br />공연들을 만나보세요</h2>
                    <img className="Star2" src={Star2} arc="Star" />
                </div>
                <div className="Booking_search">
                    <input placeholder="공연 검색"/>
                    <div className="img"><img className="search" src={search} arc="search" /></div>
                </div>
                <div className="Booking_content"></div>
            </div>
        </div>
    )
}

export default Booking;