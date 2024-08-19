import unlikeImg from "../../../assets/img_Booking/unlike.svg";
import likeImg from "../../../assets/img_Booking/like.svg";
import React, { useState } from "react";
import "../../../styles/Jisu/LikeButton.css";
import SpaceLike from "../../../api/jisu/SpaceLike";

function LikeButton({ spaceId, performerId }) {
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        setLiked(!liked);
        try {
            const response = await SpaceLike(spaceId, performerId);
            /* LikeButton 컴포넌트는 SpaceLike 함수를 호출하여
            사용자가 버튼을 클릭할 때 서버에 찜 상태를 전송합니다. */
            console.log("찜 상태:", response);
        } catch (error) {
            console.error("찜 상태 변경 실패:", error);
        }
    };

    return (
        <button
            className="like-button" // CSS 클래스 적용
            onClick={handleLike}
        >
            <img src={liked ? likeImg : unlikeImg} alt="like-button-icon" />
        </button>
    );
}

export default LikeButton;