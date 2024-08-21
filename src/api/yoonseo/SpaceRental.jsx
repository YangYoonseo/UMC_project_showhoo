import axios from "axios";

const SpaceRental = async () => {
  const token = sessionStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      "http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/spaceApply/1",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("대관 내역 불러오기", response.data.result);

    const updatedRentals = response.data.result.map((rental) => {
      const currentDate = new Date();
      const rentalDate = new Date(rental.date);

      //  지난 공연이면 state = -2
      if (rentalDate < currentDate) {
        return { ...rental, status: -2 };
      }
      return rental;
    });
    return updatedRentals;
  } catch (error) {
    console.log("대관 내역 불러오기 실패", error);
  }
};

export default SpaceRental;
