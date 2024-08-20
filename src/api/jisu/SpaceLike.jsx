import axios from "axios";

/* 공연장 찜 등록 API */

const SpaceLike = async (spaceId, performerId) => {
    /* 엑세스 토큰 가져오기 */
    const token = sessionStorage.getItem("accessToken");

    try {
        const response = await axios.post(
            /* (get/post) 요청 보내기, 아래는 URL */
        `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/prefer`,
            /* 아래는 리퀘스트 바디 */
            {
                spaceId: spaceId,
                performerId: performerId,
            },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                /* 타입 이거 왜 넣는거임? */
            },
        }
            /* Headers: 요청의 헤더에 Authorization: Bearer ${token}을 추가하여
            인증 정보를 함께 보냅니다. */
        );
    /* 디버깅 */
    console.log("공연장", spaceId, "찜 등록", response.data.result);
    return response.data;
} catch (error) {
    console.error("공연장 찜 등록에 실패했습니다:", error);
}
};

export default SpaceLike;