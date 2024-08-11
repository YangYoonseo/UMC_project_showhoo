import "../styles/yoonseo/PerformerUpdate.css";

import { useLocation } from "react-router-dom";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Footer from "../components/common/Footer";
import Profile from "../components/com_Performer/Profile";

const PerformerUpdate = () => {
  const { state } = useLocation();
  const profileData = state || undefined;
  return (
    <div className="PerformerUpdate">
      {console.log(state)}
      <Navbar_Perforemr />
      <Footer />
      <Profile profile={profileData} />
    </div>
  );
};
export default PerformerUpdate;
