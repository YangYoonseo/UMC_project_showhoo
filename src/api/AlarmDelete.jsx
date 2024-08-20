import axios from "axios";

const AlarmDelete = async (id) => {
  const token = sessionStorage.getItem("accessToken");

  try {
    const response = await axios.delete(
      `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/notifications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("삭제", response.data);
  } catch (error) {
    console.error("알림 데이터를 삭제하는데 실패했습니다:", error);
  }
};

export default AlarmDelete;
