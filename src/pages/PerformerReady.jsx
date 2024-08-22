import "../styles/Eojin/Ready.css";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Footer from "../components/common/Footer";
import ReadyMain from "../components/perform_Ready/readyMain";

const PerformerReady = () => {
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
