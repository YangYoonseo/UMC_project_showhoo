import "../../../styles/Jisu/NotionNav.css"

const NotionNav = () => {
    return (
        <div
            className="NotionNav"
            onClick={() => {
                window.open("https://factual-manuscript-fc2.notion.site/d55d39f5dcbf4645889fc8178a4132c2?v=8594d6374ecb40619e7225decdadf102", "_blank");
            }}
        >
            쇼호 노션 바로가기
        </div>
    );
}

export default NotionNav;
