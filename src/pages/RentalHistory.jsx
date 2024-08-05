import "../styles/yoonseo/RentalHistory.css";

import { useContext } from "react";
import { VenueContext } from "../App";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Footer from "../components/common/Footer";
import Concerthall from "../components/com_Performer/Concerthall";

const RentalHistory = () => {
  const { venues } = useContext(VenueContext);

  return (
    <div className="RentalHistory">
      <Navbar_Perforemr />
      <Footer />
      <div className="RentalHistory_content">
        <h1>대관 내역</h1>
        {venues.map((venue, index) => (
          <Concerthall
            key={index}
            venue={venue}
            className={`venue-card venue-${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RentalHistory;
