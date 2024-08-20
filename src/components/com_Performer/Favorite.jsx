import "../../styles/yoonseo/Favorite.css";

import { useEffect, useState } from "react";
import axios from "axios";

import ConcertPrefer from "./ConcertPrefer";

import Rectangle16 from "../../assets/img_Performer/Rectangle16.png";
import Rectangle19 from "../../assets/img_Performer/Rectangle19.png";

const Favorite = () => {
  const performerId = sessionStorage.getItem("performerId");
  const [prefer, setPrefer] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ConcertPrefer = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/${performerId}/prefer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const spaceList = response.data.result.spaceList;
        console.log(spaceList);
        setPrefer(spaceList);
      } catch (error) {
        console.log("찜 불러오기 에러", error);
      } finally {
        setLoading(false);
      }
    };
    ConcertPrefer();
  }, []);

  if (loading) {
    return <>로딩 중입니다</>;
  }

  const roundToOneDecimal = (num) => {
    return Math.round(num * 10) / 10;
  };

  return (
    <div className="Favorite">
      <img src={Rectangle16} alt="" className="graybar" />
      <img src={Rectangle19} alt="" className="greenbar" />
      <div className="myFavorite">
        {prefer.length === 0 ? (
          <p>관심 목록이 없습니다.</p> // 빈 상태 메시지
        ) : (
          prefer.map((item) => (
            <ConcertPrefer
              key={item.index}
              name={item.name}
              location={item.location}
              totalCapacity={item.totalCapacity}
              area={item.area}
              additionalService={item.additionalService}
              imageURL={item.imageURL}
              grade={roundToOneDecimal(item.grade)}
              minRentalFee={item.minRentalFee}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Favorite;
