import axios from "axios";

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
    console.log("공연장 찜 조회", response.data.result);
    return response.data;
} catch (error) {
    console.error("공연장 찜 조회에 실패했습니다:", error);
}
};

export default CheckSpaceLike;