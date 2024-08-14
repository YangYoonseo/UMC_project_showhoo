import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import HomeImage from "../../components/_test_/Home/HomeImage";
import MainInfo from "../../components/_test_/Home/mainInfo";
import Footer from "../../components/common/Footer";
import "../../styles/Jisu/home.css";

// Home 이미지 대체
const Home = () => {
  return (
    <div className="Home">
      <Navbar_Perforemr />
      <Footer />
      <div className="HomeContent">
      <HomeImage />
      <MainInfo />
      </div>
    </div>
  );
};

export default Home;
