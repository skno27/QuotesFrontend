import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "../styles/Quote.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

QuoteBox.propTypes = {
  quotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

function QuoteBox({ quotes, onDelete }) {
  const [quote, setQuote] = useState(quotes[0]);
  const [isLastQuote, setIsLastQuote] = useState(false);

  useEffect(() => {
    // document.body.style.backgroundColor = "#fff";
    document.body.style.backgroundColor = "#ABCED8";
    document.body.style.transition = "background-color 0s";

    setTimeout(() => {
      document.body.style.backgroundColor = quote.color;
      document.body.style.transition = "background-color 2s";
    }, 100);

    const wordElements = document.getElementsByClassName("words");
    for (let i = 0; i < wordElements.length; i++) {
      wordElements[i].style.color = quote.color;
      wordElements[i].style.transition = "5s";
    }

    const btns = document.getElementsByClassName("btn");
    for (let j = 0; j < btns.length; j++) {
      btns[j].style.backgroundColor = quote.color;
      btns[j].style.transition = "2s";
    }

    setIsLastQuote(quotes.indexOf(quote) === quotes.length - 1);
  }, [quote, quotes]);

  function newQuote() {
    const index = quotes.indexOf(quote);
    let newIndex = index + 1;
    if (newIndex === quotes.length) {
      newIndex = 0;
    }
    console.log(newIndex);
    setQuote(quotes[newIndex]);
  }

  function handleDelete() {
    onDelete(quote.id);

    if (isLastQuote) {
      // return to the default color
      document.body.style.backgroundColor = "";
      document.body.style.transition = "2s";
    }
  }
  return (
    <div className="quote-box-container text-center">
      <h3 className="words">
        <span className="hash">&ldquo;</span>
        {quote.body}
        <span className="hash">&rdquo;</span>
      </h3>
      <p className="words author">- {quote.author.name}</p>
      <div className="btn-row">
        <div className="left side">
          <button
            className="btn btn-lg text-white"
            id="tweet">
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </button>
        </div>

        <div className="space"></div>

        <div className="right side">
          <button
            id="new-quote"
            className="quote btn btn-lg text-white"
            onClick={newQuote}>
            Next Quote!
          </button>
        </div>
      </div>

      <button
        className="delete-button"
        onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default QuoteBox;
