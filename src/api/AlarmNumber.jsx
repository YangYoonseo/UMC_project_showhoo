import axios from "axios";

const AlarmNumber = async (type) => {
  const url = "https://showhoo.site";

  const token = sessionStorage.getItem("accessToken");
  // 3개 공통이라 performerId로 해놓음
  const performerId = sessionStorage.getItem("performerId");

  try {
    const response = await axios.get(
      `${url}/notifications/count/${type}/${performerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("알림갯수", response.data.result);
    return response.data;
  } catch (error) {
    console.error("알림 갯수를 불러오는데 실패했습니다:", error.response);
  }
};

export default AlarmNumber;
