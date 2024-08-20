import unlikeImg from "../../../assets/img_Booking/unlike.svg";
import likeImg from "../../../assets/img_Booking/like.svg";
import React, { useState, useEffect } from "react";
import "../../../styles/Jisu/LikeButton.css";
import SpaceLike from "../../../api/jisu/SpaceLike";
import CheckSpaceLike from "../../../api/jisu/CheckSpaceLike";

function LikeButton({ spaceId, performerId }) {
    const [liked, setLiked] = useState(false);

    // 컴포넌트가 처음 렌더링될 때 찜 상태를 조회
    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await CheckSpaceLike(spaceId, performerId);
                if (response && response.result) {
                    setLiked(response.result); // 서버에서 받아온 찜 상태로 설정
                }
            } catch (error) {
                console.error("초기 찜 상태 조회 실패:", error);
            }
        };

        fetchLikeStatus();
    }, [spaceId, performerId]);

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