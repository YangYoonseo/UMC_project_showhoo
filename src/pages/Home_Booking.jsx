import Navbar_Booking from "../components/common/Navbar_Booking"
import HomeImage from "../components/_test_/Home/HomeImage";
import MainInfo from "../components/_test_/Home/mainInfo";
import Footer from "../components/common/Footer";
import "../styles/Jisu/home.css";

const Home_Booking = () => {
  return (
    <div className="Home">
      <Navbar_Booking />
      <Footer />
      <div className="HomeContent">
      <HomeImage />
      <MainInfo />
      </div>
    </div>
  );
};

export default Home_Booking;