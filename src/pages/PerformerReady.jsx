import "../styles/Eojin/Ready.css";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Footer from "../components/common/Footer";
import ReadyMain from "../components/perform_Ready/readyMain";

//윤서 작성
import { useLocation } from "react-router-dom";

const PerformerReady = () => {
  const location = useLocation();
  console.log("location은", location);
  const spaceApplyId = location.state.id || "받아오지 못함";
  console.log("SpaceApplyId는", spaceApplyId);
  return (
    <div className="Ready">
      <Navbar_Perforemr />
      <Footer />
      <div className="Container117">
        <ReadyMain />
      </div>
    </div>
  );
};

export default PerformerReady;
