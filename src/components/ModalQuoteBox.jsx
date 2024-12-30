import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "../styles/Quote.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import getOppositeColor from "../utils/getOppositeColor";
import api from "../api";

ModalQuoteBox.propTypes = {
  quotes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ModalQuoteBox.defaultProps = {
  quotes: [],
};

function ModalQuoteBox({ quotes }) {
  const [quote, setQuote] = useState(quotes.length > 0 ? quotes[0] : []);
  const [comment, setComment] = useState("");
  const [quoteComments, setQuoteComments] = useState([]);

  useEffect(() => {
    if (!quote) return;

    // Update the background and text colors dynamically
    const wordElements = document.querySelectorAll(".modal-words");
    const buttonElements = document.querySelectorAll(".modal-btn");

    // Set the background color for the container

    // Set the text color for words
    wordElements.forEach((element) => {
      element.style.color = quote.color;
      element.style.transition = "color 2s";
    });

    // Set button styles
    buttonElements.forEach((button) => {
      button.style.backgroundColor = quote.color;
      button.style.color = quote.color === "WHITE" ? "black" : "white";
      button.style.transition = "background-color 2s, color 2s";
    });

    const getComments = async () => {
      try {
        const response = await api.get(`/quotes/${quote.id}/comments`);
        setQuoteComments(response.data.comments);
      } catch (err) {
        alert("Failed to fetch comments.");
      }
    };

    getComments();
  }, [quote]);

  if (!quote) {
    return (
      <div>
        <p>No quotes available.</p>
      </div>
    );
  }

  const buttonStyles = () => {
    const oppositeColor = getOppositeColor(quote.color);
    const isBackgroundWhite = quote.color.toUpperCase() === "#FFFFFF";

    return {
      backgroundColor: oppositeColor,
      color: isBackgroundWhite ? "black" : "white",
      border: `1px solid ${oppositeColor}`,
      transition: "background-color 0.3s, color 0.3s",
    };
  };

  const likeQuote = async () => {
    try {
      const response = await api.post(`/quotes/${quote.id}/likes`);
      if (response.status === 200) alert("Liked quote");
    } catch (err) {
      alert("Failed to like quote.");
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/quotes/${quote.id}/comments`, {
        body: comment,
      });
      if (response.status === 201) {
        setQuoteComments((prevComments) => [...prevComments, response.data]);
        setComment("");
        alert("Comment submitted");
      }
    } catch (err) {
      alert("Failed to submit comment.");
    }
  };

  const nextQuote = () => {
    const nextIndex = quotes.indexOf(quote) + 1;
    setQuote(quotes[nextIndex % quotes.length]);
  };

  return (
    <div className="modal-quote-container">
      <h3 className="modal-words">
        <span className="hash">&ldquo;</span>
        {quote.body}
        <span className="hash">&rdquo;</span>
      </h3>
      <p className="modal-words author">- {quote.author.name}</p>
      <div className="btn-row">
        <div className="left side">
          <button
            style={buttonStyles()}
            className="modal-btn btn btn-lg text-white"
            id="like"
            onClick={likeQuote()}
            aria-label="Like this quote">
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <button
            style={buttonStyles()}
            className="modal-btn btn btn-lg text-white"
            id="tweet">
            <FontAwesomeIcon icon={faTwitter} />
          </button>
        </div>
        <div className="right side">
          <button
            style={buttonStyles()}
            className="modal-quote modal-btn btn btn-lg"
            onClick={nextQuote}>
            Next Quote
          </button>
        </div>
      </div>
      <div className="comments-container">
        <div className="comment-list">
          {quoteComments.length > 0 ? (
            <ul>
              {quoteComments.map((quoteComment) => (
                <li key={quoteComment.id}>{quoteComment.body}</li>
              ))}
            </ul>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
        <div className="comment-form-div">
          <form
            className="comment-form"
            onSubmit={submitComment}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="comment-btn btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalQuoteBox;
