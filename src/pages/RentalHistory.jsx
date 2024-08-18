import "../styles/yoonseo/RentalHistory.css";

import { useState, useEffect } from "react";

import SpaceRental from "../api/yoonseo/SpaceRental";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Footer from "../components/common/Footer";
import Concerthall from "../components/com_Performer/Concerthall";

const RentalHistory = () => {
  const [rental, setRental] = useState([]);

  useEffect(() => {
    const fetchSpaceRental = async () => {
      const data = await SpaceRental();
      if (data) {
        setRental(data);
      }
    };
    fetchSpaceRental();
  }, []);

  return (
    <div className="RentalHistory">
      <Navbar_Perforemr />
      <Footer />
      <div className="RentalHistory_content">
        <h1>대관 내역</h1>
        {rental.length > 0 ? (
          rental.map((venue, index) => (
            <Concerthall
              key={index}
              venue={venue}
              className={`venue-card venue-${index + 1}`}
            />
          ))
        ) : (
          <p>대관 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RentalHistory;
