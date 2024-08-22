import axios from "axios";

const AlarmDelete = async (id) => {
  const token = sessionStorage.getItem("accessToken");
  const url = "https://showhoo.site";

  try {
    const response = await axios.delete(`${url}/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("삭제", response.data);
    console.log("Alert should be triggered now.");
    alert("알림 삭제");
    window.location.reload();
  } catch (error) {
    console.error("알림 데이터를 삭제하는데 실패했습니다:", error);
  }
};

export default AlarmDelete;
