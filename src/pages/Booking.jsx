import "../styles/Eojin/Booking.css";
import { useState } from "react";

import Navbar_Booking from "../components/common/Navbar_Booking";
import Footer from "../components/common/Footer";
import Book_component from "../components/booking/Book_component";
import mockdata from "../components/booking/mockdata";

import Star1 from "../assets/img_Ready/Star1.svg";
import Star2 from "../assets/img_Ready/Star2.svg";
import search from "../assets/img_Booking/Booking/search.svg";

const Booking = () => {
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const [filteredConcerts, setFilteredConcerts] = useState(mockdata); // 필터링된 결과 상태

    const handleSearch = () => {
        const filtered = mockdata.filter(concert =>
            concert.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredConcerts(filtered);
    };

    return (
        <div className="Booking">
            <Navbar_Booking />
            <Footer />
            <div className="Booking_container">
                <div className="Booking_Header">
                    <img className="Star1" src={Star1} alt="Star" />
                    <h2><span className="highlight">ShowHoo</span>에서 다양한 <br />공연들을 만나보세요</h2>
                    <img className="Star2" src={Star2} alt="Star" />
                </div>
                <div className="Booking_search">
                    <input
                        placeholder="공연 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="img" onClick={handleSearch}>
                        <img className="search" src={search} alt="search" />
                    </div>
                </div>
                <div className="Booking_content">
                    {filteredConcerts.map((concert) => (
                        <Book_component
                            key={concert.id}
                            id={concert.id}
                            img={concert.poster}
                            name={concert.name}
                            date={concert.date}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Booking;
