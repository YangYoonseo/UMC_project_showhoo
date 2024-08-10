import unlikeImg from "../../../assets/img_Booking/unlike.svg";
import likeImg from "../../../assets/img_Booking/like.svg";
import React, { useState } from "react";

function LikeButton() {
    const [liked, setLiked] = useState(false);

    return (
            <button
                style={{
                    width: "31.27px",
                    height: "31.27px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "white",
                    display: "flex", // Flexbox를 사용하여 자식 요소를 가운데 정렬
                    alignItems: "center", // 수직 가운데 정렬
                    justifyContent: "center", // 수평 가운데 정렬
                }}
                onClick={() => {
                    setLiked(!liked);
                }}
            >
                <img src={liked ? likeImg : unlikeImg} alt="like-button-icon" />
            </button>
    );
}

export default LikeButton;
