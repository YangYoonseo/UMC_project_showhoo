import "../../styles/readyDownload.css";

const ReadyDownload = ({text, img, url}) => {
    const fileUrl = url; // 다운로드할 파일의 URL
    const fileName = 'file.pdf'

    const handleDoubleClick = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="readyDownload" onDoubleClick={handleDoubleClick}>
            <img src={img} alt="download" />
            <p>{text}</p>
        </div>
    )
}

export default ReadyDownload;