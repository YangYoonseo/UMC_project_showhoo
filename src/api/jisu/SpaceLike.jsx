import axios from "axios";

const SpaceLike = async (spaceId, performerId) => {
    const token = sessionStorage.getItem("accessToken");
    try {
    const response = await axios.get(
    `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/prefer`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );
    console.log("공연장 찜 등록", response.data.result);
    return response.data;
} catch (error) {
    console.error("공연장 찜 등록에 실패했습니다:", error);
}
};

export default SpaceLike;