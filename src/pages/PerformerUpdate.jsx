import "../styles/yoonseo/PerformerUpdate.css";

import { useLocation } from "react-router-dom";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Footer from "../components/common/Footer";
import Profile from "../components/com_Performer/Profile";

const PerformerUpdate = () => {
  const { state } = useLocation();
  return (
    <div className="PerformerUpdate">
      {console.log(state)}
      <Navbar_Perforemr />
      <Footer />
      <Profile profile={state || null} />
    </div>
  );
};
export default PerformerUpdate;
