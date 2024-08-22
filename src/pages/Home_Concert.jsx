import Navbar_Concert from "../components/common/Navbar_Concert";
import HomeImage from "../components/_test_/Home/HomeImage";
import MainInfo from "../components/_test_/Home/mainInfo";
import Footer from "../components/common/Footer";
import "../styles/Jisu/home.css";
import NotionNav from "../components/_test_/Home/NotionNav";

const Home_Concert = () => {
  return (
    <div className="Home">
      <Navbar_Concert />
      <Footer />
      <div className="HomeContent">
      <HomeImage />
        <MainInfo />
        <NotionNav />
      </div>
    </div>
  );
};

export default Home_Concert;