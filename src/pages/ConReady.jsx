import "../styles/Eojin/Ready.css";

import Navbar_Concert from "../components/common/Navbar_Concert";
import Footer from "../components/common/Footer";
import ReadyMain from "../components/concert_Ready/readyMain";

import { useLocation } from "react-router-dom";

const ConReady = () => {
  const location = useLocation();
  console.log("location은", location);
  const id = location.state.id || "받아오지 못함";
  console.log("SpaceApplyId는", id);

  //   이제 이거 id를 ReadyMain 컴포넌트에 전달해서 id={id} 또는 원하는 방식대로...
  return (
    <div className="Ready">
      <Navbar_Concert />
      <Footer />
      <div className="Container117">
        <ReadyMain />
      </div>
    </div>
  );
};

export default ConReady;
