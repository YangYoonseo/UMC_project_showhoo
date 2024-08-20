import { useProfileId } from "../components/com_Performer/ProfileProvider";
import { useContext, useState } from "react";
import { VenueContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "../styles/yoonseo/RentalDetails.css";
import axios from "axios";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Footer from "../components/common/Footer";
import ProfileProvide from "../components/com_Performer/ProfileProvide";
import Button from "../components/common/Button";

import RefundPolicy from "../components/popup_Performer/RefundPolicy";
import Notice from "../components/popup_Performer/Notice";
import RentalApply from "../components/popup_Performer/RentalApply";
import RentalCompleted from "../components/popup_Performer/RentalCompleted";

import uil_calender from "../assets/img_Performer/uil_calender.svg";
import ion_people_outline from "../assets/img_Performer/ion_people_outline.svg";
import Frame22 from "../assets/img_Performer/Frame22.svg";
import bx_area from "../assets/img_Performer/bx_area.svg";
import Line40 from "../assets/img_Performer/Line40.svg";
import octicon_copy_16 from "../assets/img_Performer/octicon_copy_16.png";

const RentalDetails = () => {
  const { selectedProfileId } = useProfileId();
  const nav = useNavigate();
  const { venues } = useContext(VenueContext);
  const [refundPopup, setRefundPopup] = useState(false);
  const [noticePopup, setNoticePopup] = useState(false);
  const [applyPopup, setApplyPopup] = useState(false);
  const [completedPopup, setCompletedPopup] = useState(false);

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [refundChecked, setRefundChecked] = useState(false);
  const [noticeChecked, setNoticeChecked] = useState(false);

  const location = useLocation();
  const spaceId = 1;

  const {
    selectedDate = "2024-08-23",
    expectedAudienceMin = "10",
    expectedAudienceMax = "40",
    rentalFee = "200000",
    rentalSum = "300000",
    selectedAdditionalServices = "0",
  } = location.state || {};
  console.log("정보 연동 완료");
  console.log({ selectedDate });
  console.log({ expectedAudienceMin });
  console.log({ expectedAudienceMax });
  console.log({ rentalFee });
  console.log({ rentalSum });
  console.log({ selectedAdditionalServices });
  console.log({ spaceId });
  console.log("선택된 프로필 ID:", selectedProfileId); // 선택된 프로필 ID 출력

  const CopyEvent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("복사");
    } catch (error) {
      alert("복사 실패");
    }
  };

  const handleAllCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsAllChecked(checked);
    setRefundChecked(checked);
    setNoticeChecked(checked);
  };

  const ApplyForRental = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const performerId = sessionStorage.getItem("performerId");
      const data = {
        date: selectedDate,
        audienceMin: expectedAudienceMin,
        audienceMax: expectedAudienceMax,
        performerProfileId: selectedProfileId,
        rentalFee: rentalFee,
        rentalSum: rentalSum,
        // 이건 나중에 수정 필요
        selectedAdditionalServices: [selectedAdditionalServices],
      };
      const response = await axios.post(
        `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/${spaceId}/spaceApply/${performerId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("대관 신청 성공", response.data);
      nav("/mypage");
    } catch (error) {
      console.log("대관 신청 에러", error);
    }
  };

  return (
    <div className="RentalDetails">
      <Navbar_Perforemr />
      <Footer />
      <div className="RentalDetails_content">
        <button className="detail_back_button" onClick={() => nav(-1)}>
          &lt;
        </button>
        <h3 className="Product_title1">대관 신청하기</h3>
        <div className="information">
          <h4>신청 정보</h4>
          <div className="information_date">
            <div className="Frame256">
              <img src={uil_calender} alt="" />
              <p>{selectedDate}</p>
            </div>
          </div>

          <div className="information_poeple">
            <div className="Frame257">
              <img src={ion_people_outline} alt="" />
              <p>
                {expectedAudienceMin} ~ {expectedAudienceMax}명
              </p>
            </div>
          </div>

          <div className="information_video">
            <div className="Frame258">
              <img src={Frame22} alt="" />
              <p>{selectedAdditionalServices}</p>
            </div>
          </div>
        </div>
        <div className="pay">
          <h4>결제하기</h4>
          <p className="pay_explain">
            입금자명은{" "}
            <strong>&nbsp;'소속/공연자 팀명/대표자 이름'&nbsp;</strong> 으로
            해주세요
          </p>

          <p>입금 계좌</p>
          <p>(예금주) 쇼호</p>

          <p>우리 은행 1002061254000</p>
          <div
            className="copy_accout"
            onClick={() => CopyEvent("우리 은행 1002061254000")}
          >
            <img src={octicon_copy_16} alt="" />
            <p>계좌 복사하기</p>
          </div>
        </div>
        <ProfileProvide />
        {/* {console.log("내가 누른 프로필", selectedProfileId)} */}
        <div className="checkbox1">
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={handleAllCheckboxChange}
          />
          <p>결제 내용 확인 및 동의</p>
        </div>
        <div className="checkbox2">
          <div className="checkbox2_1">
            <span>
              <input
                type="checkbox"
                checked={refundChecked}
                onChange={() => setRefundChecked(!refundChecked)}
              />
              <p>환불규정</p>
            </span>
            <p
              className="see"
              onClick={() => {
                setRefundPopup(true);
              }}
            >
              보기
            </p>
          </div>
          <div className="checkbox2_2">
            <span>
              <input
                type="checkbox"
                checked={noticeChecked}
                onChange={() => setNoticeChecked(!noticeChecked)}
              />
              <p>유의사항</p>
            </span>

            <p
              className="see"
              onClick={() => {
                setNoticePopup(true);
              }}
            >
              보기
            </p>
          </div>
        </div>
        <Button
          text={"대관 신청하기"}
          type={"green"}
          onClick={() => {
            setApplyPopup(true);
          }}
        />

        {refundPopup && (
          <RefundPolicy
            onClose={() => {
              setRefundPopup(false);
            }}
          />
        )}

        {noticePopup && (
          <Notice
            onClose={() => {
              setNoticePopup(false);
            }}
          />
        )}

        {applyPopup && (
          <RentalApply
            onClose={() => {
              setApplyPopup(false);
            }}
            onCompletedOpen={() => {
              ApplyForRental();
              setApplyPopup(false);
              setCompletedPopup(true);
            }}
          />
        )}

        {completedPopup && (
          <RentalCompleted
            onClose={() => {
              setCompletedPopup(false);
            }}
          />
        )}

        <div className="rental_card">
          <img src={venues[0].image} alt="" className="venue_img" />
          <h3 className="venue_name">{venues[0].name}</h3>
          <p className="venue_location">{venues[0].location}</p>
          <div className="rental_card_capacity">
            <img src={ion_people_outline} alt="" />
            <p>{venues[0].capacity}</p>
          </div>
          <div className="rental_card_size">
            <img src={bx_area} alt="" />
            <p>
              {venues[0].size}m<sup>2</sup>
            </p>
          </div>
          <img src={Line40} alt="" className="Line42" />

          <div className="rental_price">
            <h3>대관비용</h3>
            <p>대관료</p>
            <p>₩{rentalFee}</p>
            <p>추가 서비스</p>
            <p>₩{parseFloat(rentalSum) - parseFloat(rentalFee)}</p>
            <img src={Line40} alt="" className="Line41" />
            <p>총 합계</p>
            <p>₩{rentalSum}</p>
            <img src={Line40} alt="" className="Line43" />
            <p>예약금</p>
            <p>₩200,000</p>
            <p>* 추가 서비스비는 공연 준비를 진행하면서 수정될 수 있습니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetails;
