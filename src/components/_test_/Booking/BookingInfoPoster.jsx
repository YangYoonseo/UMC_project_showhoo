import info_poster from "../../../assets/img_Booking/info_poster.svg"

// 공연자 - 공연장 대관 - 공연장 정보 제공
// 화면에 뜨는 공연 포스터 컴포넌트입니다.

const BookingInfoPoster = () => {
    return (<div className="BookingPoster">
        <img src={info_poster} alt="info_poster" />
    </div>
    );
};

export default BookingInfoPoster;