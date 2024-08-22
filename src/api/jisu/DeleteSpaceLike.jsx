import axios from "axios";

// 공연장 찜 삭제 API

const DeleteSpaceLike = async (spacePreferId) => {
    const token = sessionStorage.getItem("accessToken");

    try {
        const response = await axios.delete(
            `https://showhoo.site/spaces/prefer/${spacePreferId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // 디버깅
        console.log(`공연장 찜 ID ${spacePreferId} 삭제 성공:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`공연장 찜 ID ${spacePreferId} 삭제에 실패했습니다:`, error);
    }
};

export default DeleteSpaceLike;