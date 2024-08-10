import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import HomeImage from "../../components/_test_/Home/HomeImage";
import MainInfo from "../../components/_test_/Home/MainInfo";
import Footer from "../../components/common/Footer";

// 임시 Home Page 이미지
const Home = () => {
  return (
    <div className="Home">
      <Navbar_Perforemr />
      <HomeImage />
      <MainInfo />
    </div>
  );
};

export default Home;
