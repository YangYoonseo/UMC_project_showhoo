import unlikeImg from "../../../assets/img_Booking/unlike.svg";
import likeImg from "../../../assets/img_Booking/like.svg";
import React, { useState } from "react";
import "../../../styles/Jisu/LikeButton.css"; // CSS 파일 import

function LikeButton() {
    const [liked, setLiked] = useState(false);

    return (
        <button
            className="like-button" // CSS 클래스 적용
            onClick={() => {
                setLiked(!liked);
            }}
        >
            <img src={liked ? likeImg : unlikeImg} alt="like-button-icon" />
        </button>
    );
}

export default LikeButton;