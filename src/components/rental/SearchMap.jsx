import { useEffect } from "react";

const SearchMap = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = /* 카카오 발급 API */
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=a9e4abfaa51a0bf5b7c4fc56d8944539";
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
        const container = document.getElementById("map"); /* 지도 담을 영역의 DOM 레퍼런스 */
            const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 중심좌표 (위도, 경도)
            level: 3, // 지도 레벨 (확대, 축소 정도)
            };

        const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        };
    }, []);

    return <div id="map" style={{ width: "500px", height: "1200px" }}></div>;
}

export default SearchMap;