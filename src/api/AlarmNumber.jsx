import axios from "axios";

const AlarmNumber = async (type) => {
  const token = sessionStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/notifications/count/${type}/1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("알림갯수", response.data.result);
    return response.data;
  } catch (error) {
    console.error("알림 갯수를 불러오는데 실패했습니다:", error);
  }
};

export default AlarmNumber;
