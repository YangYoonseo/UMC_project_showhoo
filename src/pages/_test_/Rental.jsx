import "../../styles/Jisu/rental.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import BookingInfoPoster from "../../components/_test_/Booking/BookingInfoPoster";
import RentalSearchBar from "../../components/_test_/Booking/RentalSearchBar";
import HotConcertHall from "../../components/_test_/Booking/HotConcertHall";
import Footer from "../../components/common/Footer";

const Rental = () => {
  // HOT 공연장과 찜한 공연장 리스트를 저장할 상태를 선언
  const [hotConcertHalls, setHotConcertHalls] = useState([]);
  const [preferredConcertHalls, setPreferredConcertHalls] = useState([]);

  // 컴포넌트가 마운트될 때 API를 호출하여 데이터를 가져옴
  useEffect(() => {
    const fetchConcertHalls = async () => {
      try {
        // axios를 사용하여 API에서 공연장 데이터를 가져옴
        const response = await axios.get(
          "http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces", {
          params: {
            performerId: 1, // performerId는 필요에 따라 변경 가능
          },
        });
        console.log("공연장 전체 조회 API 응답:", response.data); // 로그 추가

        // API 응답이 성공적인 경우 상태를 업데이트
        if (response.data.isSuccess) {
          setHotConcertHalls(response.data.result.gradeList);  // HOT 공연장 리스트
          setPreferredConcertHalls(response.data.result.spacePreferList);  // 찜한 공연장 리스트
        }
      } catch (error) {
        console.error("공연장 데이터를 가져오는데 실패했습니다:", error);
      }
    };
    fetchConcertHalls(); // API 호출 함수 실행
  }, []); // 빈 배열을 의존성 배열로 전달하여 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <div className="Rental">
      <Navbar_Perforemr />
      <Footer />
      <div className="RentalContent">
        <div className="BookingInfoContainer">
          <BookingInfoPoster />
          <div className="RentalSearchBar"> 
            <RentalSearchBar />
          </div>
        </div>

        <div className="concertText">이번 달 HOT 공연장</div>
        <div className="ConcertHallList">
          {/* HOT 공연장 리스트를 map으로 반복 렌더링 */}
          {hotConcertHalls.map((hall) => (
            <HotConcertHall key={hall.name} hall={hall} />
          ))}
        </div>
        
        <div className="concertText">또 가고 싶은 공연장</div>
        <div className="ConcertHallList">
          {preferredConcertHalls.map((hall) => (
            <HotConcertHall key={hall.name} hall={hall} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rental;
