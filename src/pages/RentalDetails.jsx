import "../styles/RentalDetails.css";

import { useContext, useState } from "react";
import { ProfileContext } from "../App";
import { VenueContext } from "../App";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Footer from "../components/common/Footer";
import PerformerProfile from "../components/com_Performer/PerformerProfile";

// 팝업창
import RefundPolicy from "../components/popup_Performer/RefundPolicy";
import Notice from "../components/popup_Performer/Notice";
import RentalApply from "../components/popup_Performer/RentalApply";
import RentalCompleted from "../components/popup_Performer/RentalCompleted";

import uil_calender from "../assets/img_Performer/uil_calender.png";
import ion_people_outline from "../assets/img_Performer/ion_people_outline.png";
import Frame22 from "../assets/img_Performer/Frame22.png";
import bx_area from "../assets/img_Performer/bx_area.png";
import Line40 from "../assets/img_Performer/Line40.png";

const RentalDetails = () => {
  const profiles = useContext(ProfileContext);
  const venues = useContext(VenueContext);
  const [refundPopup, setRefundPopup] = useState(false);
  const [noticePopup, setNoticePopup] = useState(false);
  const [applyPopup, setApplyPopup] = useState(false);
  const [completedPopup, setCompletedPopup] = useState(false);

  return (
    <div className="RentalDetails">
      <Navbar_Perforemr />
      <Footer />
      <div className="RentalDetails_content">
        <button className="detail_back_button">&lt;</button>
        <h3 className="Product_title1">대관 신청하기</h3>
        <div className="information">
          <h4>신청 정보</h4>
          <div className="information_date">
            <div className="Frame256">
              <img src={uil_calender} alt="" />
              <p>2024-06-21</p>
            </div>
            <button className="update_button">수정</button>
          </div>

          <div className="information_poeple">
            <div className="Frame257">
              <img src={ion_people_outline} alt="" />
              <p>최대 100명</p>
            </div>

            <button className="update_button">수정</button>
          </div>

          <div className="information_video">
            <div className="Frame258">
              <img src={Frame22} alt="" />
              <p>공연 영상 제공</p>
            </div>

            <button className="update_button">수정</button>
          </div>
        </div>
        <div className="pay">
          <h4>결제하기</h4>
          <p className="pay_explain">입금자명은 '홍길동'으로 해주세요</p>

          <p>입금 계좌</p>
          <p>(예금주) 쇼호</p>

          <p>우리 은행 1002061254000</p>
          <button>계좌 복사하기</button>
        </div>
        <div className="profile_provide">
          <h4>공연장에게 프로필 제공하기</h4>
          <PerformerProfile
            profile={profiles[0]}
            className={"profile-card profile-detail1"}
          />
          <PerformerProfile
            profile={profiles[1]}
            className={"profile-card profile-detail2"}
          />
          <PerformerProfile
            profile={profiles[2]}
            className={"profile-card profile-detail3"}
          />
        </div>
        <div className="checkbox1">
          <input type="checkbox" />
          <p>결제 내용 확인 및 동의</p>
        </div>
        <div className="checkbox2">
          <div className="checkbox2_1">
            <span>
              <input type="checkbox" />
              <p>환불규정</p>
            </span>
            <p className="see">보기</p>
          </div>
          <div className="checkbox2_2">
            <span>
              <input type="checkbox" />
              <p>유의사항</p>
            </span>

            <p className="see">보기</p>
          </div>
        </div>
        <button
          className="application"
          onClick={() => {
            setRefundPopup(true);
          }}
        >
          대관 신청하기
        </button>

        {refundPopup && (
          <RefundPolicy
            onClose={() => {
              setRefundPopup(false);
            }}
            onNoticeOpen={() => {
              setRefundPopup(false);
              setNoticePopup(true);
            }}
          />
        )}

        {noticePopup && (
          <Notice
            onClose={() => {
              setNoticePopup(false);
            }}
            onApplyOpen={() => {
              setNoticePopup(false);
              setApplyPopup(true);
            }}
          />
        )}

        {applyPopup && (
          <RentalApply
            onClose={() => {
              setApplyPopup(false);
            }}
            onCompletedOpen={() => {
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
            <p>₩700,000</p>
            <p>추가비</p>
            <p>₩100,000</p>
            <img src={Line40} alt="" className="Line41" />
            <p>총 합계</p>
            <p>₩805,000</p>
            <img src={Line40} alt="" className="Line43" />
            <p>예약금</p>
            <p>₩200,000</p>
            <p>* 총 대관비를 반드시 확인하고 예약금을 지불하세요</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetails;
