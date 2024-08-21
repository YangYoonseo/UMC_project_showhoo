import "../../styles/Eojin/Book_component.css";

import likeIcon from "../../assets/img_Booking/Booking/likeIcon.svg";

const BookPrefer = ({ id, img, name, date, time, isComplete }) => {
  return (
    <div className="Book_component">
      <img className={`img img_${isComplete}`} src={img} alt="poster" />
      {isComplete && <div className="past">지난 공연</div>}
      <img className="likeIcon" src={likeIcon} alt="찜" />
      <div className="com_content">
        <p>
          {date}&nbsp;
          {time}
        </p>
        <h4>{name}</h4>
      </div>
    </div>
  );
};

export default BookPrefer;
