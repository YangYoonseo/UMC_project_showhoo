import "../../styles/Eojin/Book_component.css";
import { useState, useEffect } from "react";
import likeIcon from "../../assets/img_Booking/Booking/likeIcon.svg";
import nonlikeIcon from "../../assets/img_Booking/Booking/nonlikeIcon.svg";

const Book_component = ({ id, img, name, date, isPreferred, onClick }) => {
    const [past, setPast] = useState(false);
    const [like, setLike] = useState(true);

  const isPast = (date) => {
    const now = new Date();
    return date <= now;
  };

    const onLike = () => {
         setLike(!like);
    };

  useEffect(() => {
    setPast(isPast(date));
  }, [date]);

    return (
        <div className="Book_component" onClick={onClick}>
            <img className={`img img_${past}`} src={img} alt="poster" />
            {past && <div className="past">지난 공연</div>}
            <img
                className="likeIcon"
                src={isPreferred ? likeIcon : nonlikeIcon }
                alt={isPreferred ? "찜" : "찜X"}
                onClick={(e) => {
                    e.stopPropagation(); // 부모의 onClick 이벤트 중단
                    onLike();
                }} 
            />
            <div className="com_content">
                <p>{date}</p>
                <h4>{name}</h4>
            </div>          
        </div>
    );
}

export default Book_component;
