import { useProfileId } from "../components/com_Performer/ProfileProvider";
import { useEffect, useState } from "react";

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
  const url = "https://showhoo.site";
  const { selectedProfileId } = useProfileId();
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(true);
  const [venue, setVenue] = useState();
  const [loading2, setLoading2] = useState(true);
  const [venuePhotos, setVenuePhotos] = useState();
  const [loading3, setLoading3] = useState();

  const nav = useNavigate();

  const [refundPopup, setRefundPopup] = useState(false);
  const [noticePopup, setNoticePopup] = useState(false);
  const [applyPopup, setApplyPopup] = useState(false);
  const [completedPopup, setCompletedPopup] = useState(false);

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [refundChecked, setRefundChecked] = useState(false);
  const [noticeChecked, setNoticeChecked] = useState(false);

  const location = useLocation();
  // 임시용

  const {
    spaceId = 18,
    selectedDate = "2024-08-23",
    expectedAudienceMin = "10",
    expectedAudienceMax = "40",
    rentalFee = "200000",
    rentalSum = "300000",
    selectedAdditionalServices = "0",
    selectedServicesTitle = "추가 예시",
  } = location.state || {};
  console.log("정보 연동 완료");
  console.log({ spaceId });
  console.log({ selectedDate });
  console.log({ expectedAudienceMin });
  console.log({ expectedAudienceMax });
  console.log({ rentalFee });
  console.log({ rentalSum });
  console.log({ selectedAdditionalServices });
  console.log({ selectedServicesTitle });
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

  // 공연장 사진 받아오기
  useEffect(() => {
    const VenuePoster = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${url}/spaces/${spaceId}/header`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("공연장 사진", response.data.result.photos);
        setVenuePhotos(response.data.result.photos);
        setLoading3(false);
      } catch (error) {
        console.log("공연장 사진 불러오기 에러", error);
      }
    };
    VenuePoster();
  }, [spaceId]); // 의존성 배열에 spaceId 추가

  // 공연장 정보 받아오기
  useEffect(() => {
    const VenueDetail = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${url}/spaces/${spaceId}/description`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("공연장 정보 불러오기", response.data.result);
        setVenue(response.data.result);
        setLoading2(false);
      } catch (error) {
        console.log("공연장 정보 불러오기 오류", error);
      }
    };
    VenueDetail();
  }, [spaceId]); // 의존성 배열에 spaceId 추가

  // 계좌정보 받아오기
  useEffect(() => {
    const SpacePay = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${url}/spaces/${spaceId}/pay`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("계좌정보 불러오기", response.data.result);
        setAccount(response.data.result);
        setLoading(false);
      } catch (error) {
        console.log("계좌정보 불러오기 오류", error);
      }
    };
    SpacePay();
  }, [spaceId]); // 의존성 배열에 spaceId 추가

  // 대관 신청하기
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
        selectedAdditionalServices:
          selectedAdditionalServices.length > 0
            ? selectedAdditionalServices
            : [],
      };

      const response = await axios.post(
        `${url}/spaces/${spaceId}/spaceApply/${performerId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("대관 신청 성공", response.data);
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
              <div className="selectedServicesTitle">
                {Array.isArray(selectedServicesTitle) ? (
                  selectedServicesTitle.length > 0 ? (
                    selectedServicesTitle.map((title, index) => (
                      <p key={index}>{`${title} `}</p>
                    ))
                  ) : (
                    <p>추가 서비스 없음</p>
                  )
                ) : typeof selectedServicesTitle === "string" ? (
                  <p>{selectedServicesTitle}</p>
                ) : (
                  <p>추가 서비스 없음</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div>로딩 중입니다...</div>
        ) : (
          <div className="pay">
            <h4>결제하기</h4>
            <p className="pay_explain">
              입금자명은{" "}
              <strong>&nbsp;'소속/공연자 팀명/대표자 이름'&nbsp;</strong> 으로
              해주세요
            </p>

            <p>입금 계좌</p>
            <p>(예금주) {account.bankOwner} </p>

            <p>
              {account.bankName} {account.bankAccount}
            </p>
            <div
              className="copy_accout"
              onClick={() =>
                CopyEvent(`${account.bankName} ${account.bankAccount}`)
              }
            >
              <img src={octicon_copy_16} alt="" />
              <p>계좌 복사하기</p>
            </div>
          </div>
        )}

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
            !isAllChecked
              ? alert("결제 내용 확인 및 동의 필요")
              : setApplyPopup(true);
          }}
        />

        {refundPopup && (
          <RefundPolicy
            onClose={() => {
              setRefundPopup(false);
            }}
            spaceId={spaceId}
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
              nav("/mypage");
            }}
          />
        )}

        {loading2 ? (
          <p>로딩중입니다...</p>
        ) : (
          <div className="rental_card">
            {loading3 ? (
              <p> 사진 로딩 중...</p>
            ) : Array.isArray(venuePhotos) && venuePhotos.length > 0 ? (
              <img src={venuePhotos[0]} alt="" className="venue_img" />
            ) : (
              <p>사진이 없습니다</p>
            )}

            <h3 className="venue_name">{venue.name}</h3>
            <p className="venue_location">{venue.location}</p>
            <div className="rental_card_capacity">
              <img src={ion_people_outline} alt="" />
              <p>
                {venue.seatingCapacity} ~ {venue.standingCapacity}명
              </p>
            </div>
            <div className="rental_card_size">
              <img src={bx_area} alt="" />
              <p>
                {venue.area}m<sup>2</sup>
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
        )}
      </div>
    </div>
  );
};

export default RentalDetails;
