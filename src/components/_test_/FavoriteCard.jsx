const FavoriteCard = ({ venue }) => {
  return (
    <div className="FavoriteCard">
      <h1>{venue.id}</h1>
      <h1>{venue.name}</h1>
    </div>
  );
};

export default FavoriteCard;
