import Rectangle16 from "../../assets/img_Performer/Rectangle16.png";
import Rectangle19 from "../../assets/img_Performer/Rectangle19.png";

import "../../styles/yoonseo/Cancel.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingProfile from "./BookingProfile";

const Cancel = () => {
  const url = "https://showhoo.site";
  const [canceled, setCanceled] = useState([]);
  const page = 0;
  const audienceId = sessionStorage.getItem("audienceId");

  useEffect(() => {
    const CancelList = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          `${url}/book/${audienceId}/canceled?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const getBookList = response.data.result.getBookList;
        console.log("취소 내역", getBookList);
        setCanceled(getBookList);
      } catch (error) {
        console.log("취소 내역 에러", error);
      }
    };
    CancelList();
  }, []);

  return (
    <div className="Cancel">
      <img src={Rectangle16} alt="" className="graybar" />
      <img src={Rectangle19} alt="" className="greenbar" />

      {canceled.map((pamphlet, index) => (
        <BookingProfile
          key={pamphlet.bookId} // key로 index 대신 pamphlet.id를 사용하는 것이 좋습니다
          pamphlet={pamphlet}
          className={`pamphlet pamphlet-${index + 1} pamphlet_cancel`}
        />
      ))}
    </div>
  );
};
export default Cancel;
