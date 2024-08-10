import "../../styles/Eojin/Book_component.css";
import { useState, useEffect } from "react";

const Book_component = ({ id, img, name, date, onClick }) => {
    const [past, setPast] = useState(false);

    const isPast = (date) => {
        const now = new Date();
        return date <= now;
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
            <div className="com_content">
                <p>{formatDate(date)}</p>
                <h4>{name}</h4>
            </div>          
        </div>
    );
}

export default Book_component;
