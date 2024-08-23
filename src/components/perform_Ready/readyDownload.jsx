import "../../styles/Eojin/readyDownload.css";

const ReadyDownload = ({ text, img, url , id }) => {

    const fileUrl = url; // 다운로드할 파일의 URL

    const handleDoubleClick = () => {
        const fileName = text;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="readyDownload" onDoubleClick={handleDoubleClick}>
            <img className={`img img_${id}`} src={img} alt="download" />
            <p>{text}</p>
        </div>
    )
}

export default ReadyDownload;