import "../../styles/Eojin/Host_VenueNotice.css";
import { useState, useEffect } from "react";
import Editor from "../perform_Ready/Editor/Editor";

const Host_VenueNotice = ({ updateNotice, notice }) => {
    const [getNotice, setGetNotice] = useState('');

    const handleNotice = (notice) => {
        setGetNotice(notice);
    }

    useEffect(() => {
        updateNotice(getNotice);
    }, [getNotice]);

    return (
        <div className="Host_VenueNotice">
            <h4>유의사항</h4>
            <p>환불규정, 대관료, 예약금, 잔금에 대한 주의사항 등 공연장을 대관할 시 공연자가 꼭 알아야 할 것들을 입력해주세요</p>
            <div className="editor" style={{ display: notice === '' ? "block" : "none" }}>
                <Editor onContentChange={handleNotice} />
            </div>
            <div className="notice-section" style={{ display: notice !== '' ? "block" : "none" }}>
                <div dangerouslySetInnerHTML={{ __html: notice }} />
            </div>
        </div>
    )
}

export default Host_VenueNotice;