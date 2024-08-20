import unlikeImg from "../../../assets/img_Booking/unlike.svg";
import likeImg from "../../../assets/img_Booking/like.svg";
import React, { useState, useEffect } from "react";
import "../../../styles/Jisu/LikeButton.css";
import SpaceLike from "../../../api/jisu/SpaceLike";
import CheckSpaceLike from "../../../api/jisu/CheckSpaceLike";
import DeleteSpaceLike from "../../../api/jisu/DeleteSpaceLike";

function LikeButton({ spaceId, performerId }) {
    const [liked, setLiked] = useState(false);
    const [spacePreferId, setSpacePreferId] = useState(null);

    // 컴포넌트가 처음 렌더링될 때 찜 상태를 조회
    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await CheckSpaceLike(spaceId, performerId);
                if (response && response.result) {
                    setLiked(true); // 서버에서 받아온 찜 상태로 설정
                    setSpacePreferId(response.result.spacePreferId); // 서버에서 받아온 찜 ID 저장
                    // console.log( "spacePreferId: ",response.result.spacePreferId);
                }
            } catch (error) {
                console.error("초기 찜 상태 조회 실패:", error);
            }
        };

        fetchLikeStatus();
    }, [spaceId, performerId]);

    const handleLike = async () => {
        if (liked) {
            // 이미 찜된 상태에서 버튼을 다시 클릭하면 찜을 삭제
            try {
                if (spacePreferId) {
                    await DeleteSpaceLike(spacePreferId);
                    setLiked(false);
                    setSpacePreferId(null); // 찜 ID 초기화
                    console.log("=> 찜 상태 liked 이므로 찜 삭제");
                }
            } catch (error) {
                console.error("찜 삭제 실패:", error);
            }
        } else {
            // 찜되지 않은 상태에서 버튼을 클릭하면 찜을 추가
            try {
                const response = await SpaceLike(spaceId, performerId);
                if (response && response.result) {
                    setLiked(true);
                    setSpacePreferId(response.result); // 새로 생성된 찜 ID 저장
                    console.log("찜 추가 성공");
                }
            } catch (error) {
                console.error("찜 추가 실패:", error);
            }
        }
    };

    return (
        <button
            className="like-button"
            onClick={handleLike}
        >
            <img src={liked ? likeImg : unlikeImg} alt="like-button-icon" />
        </button>
    );
}

export default LikeButton;