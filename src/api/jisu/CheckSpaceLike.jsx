import axios from "axios";

/* 공연장 찜 유무 조회 API */

const CheckSpaceLike = async (spaceId, performerId) => {
    const token = sessionStorage.getItem("accessToken");

    try {
        const response = await axios.get(
        `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/prefer/${spaceId}/${performerId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
    /* 디버깅 */
    console.log("[시작 렌더링]", spaceId, "번 공연장 찜 조회", response.data.result);
    return response.data;
} catch (error) {
    console.error("공연장 찜 조회에 실패했습니다:", error);
}
};

export default CheckSpaceLike;