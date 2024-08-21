import "../../styles/Eojin/readyDownload.css";

const ReadyDownload = ({ text, img, url , id }) => {

    const fileUrl = url; // 다운로드할 파일의 URL

    const getFileNameFromUrl = (url) => {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname; // URL의 경로 부분만 가져옴
        const fileName = pathname.substring(pathname.lastIndexOf('/') + 1); // 파일 이름 추출
        return fileName;
    };

    const handleDoubleClick = () => {
        const fileName = getFileNameFromUrl(fileUrl);
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