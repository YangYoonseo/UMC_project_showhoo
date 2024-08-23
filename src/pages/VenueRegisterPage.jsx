// VenueRegisterPage.jsx
// 탭 바꿔도 정보 사라지지 않게 하는 코드 추가

// 어진 : 한 api(공연장 등록 API) 사용하여 여러탭의 정보가 넘어가므로, 최종적으로 모든 data 이 페이지로 모아주면 됨
// 유의사항 탭, 대관일정 탭의 정보 125, 126번째 줄(holidays, notice ; 현재는 초기화해놓음)에 넣어주면 됨!

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Host_VenueTabs from "../components/VenueRegister_Introduce/Host_VenueTabs";
import Host_VenueIntroduction from "../components/VenueRegister_Introduce/Host_VenueIntroduction";
import Host_VenueFacility from "../components/VenueRegister_Introduce/Host_VenueFacility";
import Host_VenueNotice from "../components/VenueRegister_Introduce/Host_VenueNotice";
import Host_VenueSchedule from "../components/VenueRegister_Introduce/Host_VenueSchedule";
import Host_VenueReviews from "../components/VenueRegister_Introduce/Host_VenueReviews";
import edit_icon from "../assets/images/venueregisterpage_introduce/edit_icon.svg";
import register_image_btn from "../assets/images/venueregisterpage_introduce/register_image_btn.svg";
import Pop_Name from "../components/VenueRegister_Introduce/Pop_Name";
import Pop_Place from "../components/VenueRegister_Introduce/Pop_Place";
import Pop_Image from "../components/VenueRegister_Introduce/Pop_Image";
import Footer from "../components/common/Footer";
import Navbar_Concert from "../components/common/Navbar_Concert";
import Popup_register from "../components/VenueRegister_Introduce/popup_register";
import Popup_complete from "../components/VenueRegister_Introduce/popup_complete";
import VenueInfo from '../components/VenueDetails/VenueInfo'; // VenueDetailPage의 컴포넌트 가져오기
import VenueImages from '../components/VenueDetails/VenueImages';
import VenueTabs from '../components/VenueDetails/VenueTabs';
import VenueIntroduction from '../components/VenueDetails/VenueIntroduction';
import FacilityInfo from '../components/VenueDetails/FacilityInfo';
import Notice from '../components/VenueDetails/Notice';
import Schedule from '../components/VenueDetails/Schedule';
import Reviews from '../components/VenueDetails/Reviews';
import Navbar_Performer from '../components/common/Navbar_Performer';
import BookingForm from '../components/VenueDetails/BookingForm';

import "../styles/VenueRegisterPage.css";
import { FacilityContext } from "../components/VenueRegister_Introduce/FacilityContext";

const VenueRegisterPage = () => {
  const [selectedTab, setSelectedTab] = useState("introduction");
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [venueName, setVenueName] = useState("공연장 이름");
  const [venueLocation, setVenueLocation] = useState("공연장 위치");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [venueData, setVenueData] = useState(null); // 공연장 정보를 위한 상태 추가

  // spaceId가져오되 상태로 관리
  const [spaceId, setSpaceId] = useState(() => {
    return localStorage.getItem("spaceId") || null;
  });
  


  const [introductionDescription, setIntroductionDescription] = useState("");
  const [venueArea, setVenueArea] = useState("");
  const [venueCapacity, setVenueCapacity] = useState("");
  const [Category, setCategory] = useState("");
  const [rentalTime, setRentalTime] = useState("");
  const [feeDescriptiontest, setFeeDescriptiontest] = useState("");
  const [offSeasonFeestest, setOffSeasonFeestest] = useState({});
  const [peakSeasonFeestest, setPeakSeasonFeestest] = useState({});
  const [accountDetailstest, setAccountDetailstest] = useState({});
  const [serviceDescriptiontest, setServiceDescriptiontest] = useState("");
  const [serviceOptionstest, setServiceOptionstest] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [notice, setNotice] = useState("");


  // 시설 안내 데이터 context에서 가져오기
  const {
    soundEquipment,
    lightingEquipment,
    stageMachinery,
    spaceDrawing,
    spacestaff,
    spaceSeat,
    setStageMachinery, 
    setSoundEquipment, 
    setLightingEquipment, 
    setSpaceDrawing, 
    setSpacestaff, 
    setSpaceSeat 
  } = useContext(FacilityContext);

  useEffect(() => {
    if (spaceId && spaceId !== "null") {
      // 공연장 등록 정보가 있는 경우
      fetchVenueInfo();
    } else {
      // 공연장 등록 정보가 없는 경우
      resetVenueData();
    }
  }, [spaceId]);


  //spaceUserId 연결
  const spaceUserId = sessionStorage.getItem("spaceUserId");

  const openNameModal = () => setIsNameModalOpen(true);
  const closeNameModal = () => setIsNameModalOpen(false);

  const openPlaceModal = () => setIsPlaceModalOpen(true);
  const closePlaceModal = () => setIsPlaceModalOpen(false);

  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  // 이름 업데이트 함수
  const updateVenueName = (newName) => {
    setVenueName(newName);
    closeNameModal();
  };

  // 장소 업데이트 함수
  const updateVenueLocation = (newLocation) => {
    setVenueLocation(newLocation);
    closePlaceModal();
  };

  // 이미지 업데이트 함수
  const updateUploadedImages = (imageUrls) => {
    setUploadedImages(imageUrls);
    console.log("이미지 URL 배열 전달 확인:", imageUrls);
  };

  // 유의사항 업데이트 함수
  const updateNotice = (notice) => {
    setNotice(notice);
  };

  // holiday 업데이트 함수
  const updateHoliday = (date) => {
    // 변환된 날짜 배열을 holidays 상태로 설정
    setHolidays(date);
  };

  // 날짜 맵핑 함수
  const dayOfWeekMapping = {
    월: "MONDAY",
    화: "TUESDAY",
    수: "WEDNESDAY",
    목: "THURSDAY",
    금: "FRIDAY",
    토: "SATURDAY",
    일: "SUNDAY",
  };

  // 등록 이력 있는 경우 -> 공연장 정보를 불러오는 함수
  const fetchVenueInfo = async () => {
    try {
      const response = await axios.get(`https://showhoo.site/spaces/${spaceId}/description`);
      if (response.data.isSuccess) {
        const data = response.data.result;
        setVenueData({
          name: data.name,
          rating: data.grade,
          reviews: data.reviews || 0,
          address: data.location,
          rentalFee: data.rentalFee,
          capacity: data.seatingCapacity,
          parking: data.parking || "정보 없음",
          description: {
            about: data.description,
            area: data.area,
            capacity: `좌석: 약 ${data.seatingCapacity}석 내외 / 입석: 약 ${data.standingCapacity}명 내외`,
            rentalTime: data.rentalHours,
            rentalFee: data.rentalFee,
            additionalServices: data.additionalServices.map(service => `${service.title}: ${service.price}`).join('<br>'),
            tel: data.tel || "정보 없음",
            location: data.location,
          },
        });
      } else {
        console.error("공연장 정보를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("공연장 정보 불러오기 실패:", error);
    }
  };

  // 등록 이력 없는 경우 -> 초기화
  const resetVenueData = () => {
    setVenueName("공연장 이름");
    setVenueLocation("공연장 위치");
    setUploadedImages([]);
    setIntroductionDescription("");
    setVenueArea("");
    setVenueCapacity("");
    setCategory("");
    setRentalTime("");
    setFeeDescriptiontest("");
    setOffSeasonFeestest({});
    setPeakSeasonFeestest({});
    setAccountDetailstest({});
    setServiceDescriptiontest("");
    setServiceOptionstest([]);
    setHolidays(null);
    setNotice("");
  };

  // 공연장 새로 등록 함수
  const registerVenue = async () => {
    try {
      // rentalFees 및 peakSeasonRentalFees 변환
      const rentalFees = Object.keys(offSeasonFeestest).map((day) => ({
        dayOfWeek: dayOfWeekMapping[day],
        fee: parseInt(offSeasonFeestest[day], 10),
      }));

      const peakSeasonRentalFees = Object.keys(peakSeasonFeestest).map(
        (day) => ({
          dayOfWeek: dayOfWeekMapping[day],
          fee: parseInt(peakSeasonFeestest[day], 10),
        })
      );

      // additionalServices 변환
      const additionalServices = serviceOptionstest.map((service) => ({
        title: service.name,
        price: parseInt(service.price, 10),
      }));

      const spaceRegisterRequestDTO = {
        name: venueName,
        description: introductionDescription,
        rentalHours: rentalTime,
        location: venueLocation,
        area: venueArea,
        seatingCapacity: parseInt(venueCapacity, 10),
        standingCapacity: parseInt(venueCapacity, 10),
        bankName: accountDetailstest.bank,
        bankAccount: accountDetailstest.accountNumber,
        bankOwner: accountDetailstest.holder,
        photoUrls: uploadedImages,
        rentalFees,
        peakSeasonRentalFees,
        additionalServices,
        spaceType: Category,
        holidays: holidays, // 어진 part
        notice: notice, // 어진 part
      };
      // 시설 자료
      const getsoundEquipment = soundEquipment;
      const getlightingEquipment = lightingEquipment;
      const getstageMachinery = stageMachinery;
      const getspaceDrawing = spaceDrawing;
      const getspacestaff = spacestaff;
      const getspaceSeat = spaceSeat;

      // 전송할 데이터 확인
      console.log(
        "서버로 전송할 데이터(spaceRegisterRequestDTO):",
        spaceRegisterRequestDTO
      );

      const formData = new FormData();
      formData.append(
        "spaceRegisterRequestDTO",
        JSON.stringify(spaceRegisterRequestDTO)
      );
      formData.append("soundEquipment", getsoundEquipment);
      formData.append("lightingEquipment", getlightingEquipment);
      formData.append("stageMachinery", getstageMachinery);
      formData.append("spaceDrawing", getspaceDrawing);
      formData.append("spacestaff", getspacestaff);
      formData.append("spaceSeat", getspaceSeat);
      
      console.log("서버로 전송할 데이터:", formData);

      // 공연장 등록 : API 요청
      const response = await axios.post(
        `https://showhoo.site/spaces/${spaceUserId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("등록 결과:", response.data);
      if (response.data.isSuccess && response.data.result.spaceId) {
        setSpaceId(response.data.result.spaceId);
        localStorage.setItem("spaceId", response.data.result.spaceId);
        alert("공연장 등록이 성공적으로 완료되었습니다.");
      } else {
        throw new Error("spaceId가 반환되지 않았습니다.");
      }
    } catch (error) {
      console.error("공연장 등록 실패:", error);
      alert("공연장 등록 중 오류가 발생했습니다.");
    }
  };

  const onRegister = () => {
    setIsRegister(true);
  };

  const onComplete = () => {
    setIsRegister(false);
    setIsComplete(true);
    registerVenue(); // 공연장 등록 API 호출
  };

  const closePopup = () => {
    setIsRegister(false);
    setIsComplete(false);
  };

 
  useEffect(() => {
    console.log("<탭 변경>");
    console.log("추가서비스 옵션:", serviceOptionstest);
  }, [selectedTab]);

  // 여기서 공연장 등록 페이지를 렌더링할지, 상세 정보를 렌더링할지 결정
  if (spaceId && spaceId !== "null") {
    // 공연장 등록 이력이 있는 경우 상세 정보 렌더링
    return (
      <div className="navfot">
        <Navbar_Concert />
        <Footer />
        <div className="venue-detail-page">
          <VenueInfo data={venueData} spaceId={spaceId} />
          <VenueImages spaceId={spaceId} />
          <div className="venue-content">
            <div className="venue-main-content">
              <VenueTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
              {selectedTab === "introduction" && <VenueIntroduction spaceId={spaceId} />}
              {selectedTab === "facility" && <FacilityInfo name={venueData.name} spaceId={spaceId} />}
              {selectedTab === "notice" && <Notice spaceId={spaceId} />}
              {selectedTab === "schedule" && <Schedule spaceId={spaceId} />}
              {/* 이 리뷰 탭만 다르게 렌더링 하면 될 듯! */}
              {selectedTab === "reviews" && <Reviews spaceId={spaceId} />}
            </div>
            {/* <BookingForm spaceId={spaceId} /> */}
          </div>
        </div>
      </div>
    );
  } else {
    // 공연장 등록 이력이 없는 경우 등록 페이지 렌더링
    return (
      <div className="navfot">
        <Navbar_Concert />
        <Footer />
        <div className="venue-register-page">
          <div className="venue-name-wrapper">
            <h1 className="venue-name">{venueName}</h1>
            <img
              src={edit_icon}
              className="name_edit_icon"
              onClick={openNameModal}
            />
          </div>
          <p className="venue-location">{venueLocation}</p>
          <button className="registerbtn" onClick={onRegister}>
            등록하기
          </button>
          {isRegister && <Popup_register prev={closePopup} next={onComplete} />}
          {isComplete && <Popup_complete check={closePopup} />}

          <div className="imagepanel1">
            {uploadedImages[0] && (
              <img
                src={uploadedImages[0]}
                alt="Venue 1"
                className="imagepanel-img"
              />
            )}
          </div>
          <div className="imagepanel2">
            {uploadedImages[1] && (
              <img
                src={uploadedImages[1]}
                alt="Venue 2"
                className="imagepanel-img"
              />
            )}
          </div>
          <div className="imagepanel3">
            {uploadedImages[2] && (
              <img
                src={uploadedImages[2]}
                alt="Venue 3"
                className="imagepanel-img"
              />
            )}
          </div>
          <div className="imagepanel4">
            {uploadedImages[3] && (
              <img
                src={uploadedImages[3]}
                alt="Venue 4"
                className="imagepanel-img"
              />
            )}
          </div>
          <div className="imagepanel5">
            {uploadedImages[4] && (
              <img
                src={uploadedImages[4]}
                alt="Venue 5"
                className="imagepanel-img"
              />
            )}
          </div>
          <img
            src={register_image_btn}
            className="register_image_btn"
            onClick={openImageModal}
          ></img>

          <div className="venue-content">
            <div className="venue-main-content">
              <Host_VenueTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <div className="main-content">
                {selectedTab === "introduction" && (
                  <Host_VenueIntroduction
                    openPlaceModal={openPlaceModal}
                    venueLocation={venueLocation}
                    introductionDescription={introductionDescription}
                    setIntroductionDescription={setIntroductionDescription}
                    venueArea={venueArea}
                    setVenueArea={setVenueArea}
                    venueCapacity={venueCapacity}
                    setVenueCapacity={setVenueCapacity}
                    Category={Category}
                    setCategory={setCategory}
                    rentalTime={rentalTime}
                    setRentalTime={setRentalTime}
                    feeDescriptiontest={feeDescriptiontest}
                    setFeeDescriptiontest={setFeeDescriptiontest}
                    offSeasonFeestest={offSeasonFeestest}
                    setOffSeasonFeestest={setOffSeasonFeestest}
                    peakSeasonFeestest={peakSeasonFeestest}
                    setPeakSeasonFeestest={setPeakSeasonFeestest}
                    accountDetailstest={accountDetailstest}
                    setAccountDetailstest={setAccountDetailstest}
                    serviceDescriptiontest={serviceDescriptiontest}
                    setServiceDescriptiontest={setServiceDescriptiontest}
                    serviceOptiontests={serviceOptionstest}
                    setServiceOptionstest={setServiceOptionstest}
                  />
                )}
                <div
                  style={{
                    display: selectedTab === "facility" ? "block" : "none",
                  }}
                >
                  <Host_VenueFacility openPlaceModal={openPlaceModal} />
                </div>
                <div
                  style={{
                    display: selectedTab === "notice" ? "block" : "none",
                  }}
                >
                  <Host_VenueNotice
                    openPlaceModal={openPlaceModal}
                    updateNotice={updateNotice}
                  />
                </div>
                <div
                  style={{
                    display: selectedTab === "schedule" ? "block" : "none",
                  }}
                >
                  <Host_VenueSchedule
                    openPlaceModal={openPlaceModal}
                    updateHoliday={updateHoliday}
                  />
                </div>
                <div
                  style={{
                    display: selectedTab === "reviews" ? "block" : "none",
                  }}
                >
                  <Host_VenueReviews
                    openPlaceModal={openPlaceModal}
                    spaceId={spaceId}
                  />
                </div>
              </div>
            </div>
          </div>
          <Pop_Name
            isOpen={isNameModalOpen}
            onClose={closeNameModal}
            onConfirm={updateVenueName}
          />
          <Pop_Place
            isOpen={isPlaceModalOpen}
            onClose={closePlaceModal}
            onConfirm={updateVenueLocation}
          />
          <Pop_Image
            isOpen={isImageModalOpen}
            onClose={closeImageModal}
            onConfirm={updateUploadedImages}
          />
        </div>
      </div>
    );
  }
};

export default VenueRegisterPage;

