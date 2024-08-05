import Navbar_Concert from "../components/common/Navbar_Concert";
import Footer from "../components/common/Footer";
import "../styles/yoonseo/ConcertReady.css";
import ReadyCalendar from "../components/com_Concert/ReadyCalendar";

const ConcertReady = () => {
  return (
    <div className="ConcertReady">
      <Navbar_Concert />
      <Footer />
      <div className="ConcertReady_content">
        <h1 className="title">공연 준비</h1>
        <ReadyCalendar />
      </div>
    </div>
  );
};

export default ConcertReady;
