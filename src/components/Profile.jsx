import PropTypes from "prop-types";

Profile.propTypes = {
  quotes: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

function Profile({ quotes, username }) {
  const handleClick = () => {
    // user quoteBox modal
  };

  return (
    <div
      className="user-info-container"
      onClick={handleClick}>
      <h2 className="profile-username">Username: {username}</h2>
      {quotes ? <p>{quotes.length} Quotes</p> : <p>0 Quotes</p>}
    </div>
  );
}

export default Profile;
