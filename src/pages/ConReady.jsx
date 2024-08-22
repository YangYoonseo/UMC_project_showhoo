import "../styles/Eojin/Ready.css";

import Navbar_Concert from "../components/common/Navbar_Concert";
import Footer from "../components/common/Footer";
import ReadyMain from "../components/concert_Ready/readyMain";

const ConReady = ({ id }) => {
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