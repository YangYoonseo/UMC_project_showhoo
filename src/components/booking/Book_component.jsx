import "../../styles/Eojin/Book_component.css";
import { useState, useEffect } from "react";
import likeIcon from "../../assets/img_Booking/Booking/likeIcon.svg";
import nonlikeIcon from "../../assets/img_Booking/Booking/nonlikeIcon.svg";

const Book_component = ({ id, img, name, date, onClick }) => {
    const [past, setPast] = useState(false);
    const [like, setLike] = useState(false);

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

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    return (
        <div className="Book_component" onClick={onClick}>
            <img className={`img img_${past}`} src={img} alt="poster" />
            {past && <div className="past">지난 공연</div>}
            <img
                className="likeIcon"
                src={like ? likeIcon : nonlikeIcon }
                alt={like ? "찜" : "찜X"}
                onClick={(e) => {
                    e.stopPropagation(); // 부모의 onClick 이벤트 중단
                    onLike();
                }} 
            />
            <div className="com_content">
                <p>{formatDate(date)}</p>
                <h4>{name}</h4>
            </div>          
        </div>
    );
}

export default Book_component;
