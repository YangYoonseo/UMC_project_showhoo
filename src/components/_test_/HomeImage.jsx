const FavoriteCard = ({ venue }) => {
    return (
      <div className="FavoriteCard">
        <h1>{venue.id}</h1>
        <h1>{venue.name}</h1>
      </div>
    );
  };
  
  export default FavoriteCard;

const HomeImage = () => {
    return (
        <div className="HomeImage1">
            <img src="../../assets/images/img_Home/Home_Image1.png" />
        </div>
    )
}