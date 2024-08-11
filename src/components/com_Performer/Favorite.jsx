import "../../styles/yoonseo/Favorite.css";

import { useContext } from "react";
import { VenueContext } from "../../App";

import HotConcertHall from "../_test_/Booking/HotConcertHall";

import Rectangle16 from "../../assets/img_Performer/Rectangle16.png";
import Rectangle19 from "../../assets/img_Performer/Rectangle19.png";

const Favorite = () => {
  const { venues, setVenues } = useContext(VenueContext);

  return (
    <div className="Favorite">
      <img src={Rectangle16} alt="" className="graybar" />
      <img src={Rectangle19} alt="" className="greenbar" />
      <div className="myFavorite">
        <HotConcertHall />
      </div>
    </div>
  );
};
export default Favorite;
