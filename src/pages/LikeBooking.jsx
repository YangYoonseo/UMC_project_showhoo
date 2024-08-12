import "../styles/yoonseo/LikeBooking.css";

import Navbar_Booking from "../components/common/Navbar_Booking";

const LikeBooking = () => {
  return (
    <div className="LikeBooking">
      <Navbar_Booking />
      <div className="LikeBooking_content">
        <h1>관심 목록</h1>
      </div>
    </div>
  );
};

export default LikeBooking;
