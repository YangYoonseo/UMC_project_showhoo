import "../styles/yoonseo/PerformerRegistration.css";

import { useContext } from "react";
import { ProfileContext } from "../App";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Footer from "../components/common/Footer";
import PerformerProfile from "../components/com_Performer/PerformerProfile";
import Addprofiles from "../components/com_Performer/Addprofiles";

const PerformerRegistration = () => {
  const profiles = useContext(ProfileContext);

  return (
    <div className="PerformerRegistraion">
      <Navbar_Perforemr />
      <Footer />
      <div className="Container117">
        <p className="p_profile">공연자 프로필</p>
        <div className="profiles">
          {profiles.map((profile, index) => (
            <PerformerProfile
              key={index}
              profile={profile}
              setProfiles={setProfiles}
              className={`profile-card profile-${index + 1}`}
            />
          ))}
        </div>

        <Addprofiles />
      </div>
    </div>
  );
};

export default PerformerRegistration;
