import "../styles/Modal.css";
import ModalQuoteBox from "./ModalQuoteBox";
import PropTypes from "prop-types";

const Modal = ({ user, onClose, quotes }) => {
  console.log("Modal User:", user);
  console.log("Modal Quotes:", quotes);
  return (
    <div
      className="modal-overlay"
      onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}>
          X
        </button>
        <h2>
          {user?.username ? `${user.username}'s Quotes` : "User not found"}
        </h2>
        <div className="modal-quotes">
          {quotes && quotes.length > 0 ? (
            <ModalQuoteBox quotes={quotes} />
          ) : (
            <p>No quotes available.</p>
          )}
        </div>
      </div>
      <p></p>
    </div>
  );
};

Modal.propTypes = {
  user: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  quotes: PropTypes.array.isRequired,
};

export default Modal;
