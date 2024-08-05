import "../../styles/yoonseo/Favorite.css";

import { useContext } from "react";
import { VenueContext } from "../../App";

import FavoriteCard from "./FavoriteCard";

import Rectangle16 from "../../assets/img_Performer/Rectangle16.png";
import Rectangle19 from "../../assets/img_Performer/Rectangle19.png";

const Favorite = () => {
  const { venues, setVenues } = useContext(VenueContext);
  const onLike = () => {
    return venues.filter((venue) => venue.like === true);
  };

  const LikeData = onLike();

  return (
    <div className="Favorite">
      <img src={Rectangle16} alt="" className="graybar" />
      <img src={Rectangle19} alt="" className="greenbar" />
      {/* 컴포넌트 메인화면 꺼랑 동일하여 이거 쓰면 될 듯 */}
      {LikeData.map((venue, index) => (
        <FavoriteCard venue={venue} key={index} />
      ))}
    </div>
  );
};
export default Favorite;
