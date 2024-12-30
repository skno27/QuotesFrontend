import { useState, useEffect } from "react";
import api from "../api";
import QuoteBox from "../components/QuoteBox";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../utils/useAuth";

function Home() {
  const [quotes, setQuotes] = useState([]);
  const [color, setColor] = useState("RED");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const { userId } = useAuth();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await api.get(`/users/${userId}/quotes`);
        setQuotes([...response.data.quotes]);
      } catch (error) {
        alert("Failed to fetch quotes.");
      }
    };
    fetchQuotes();
  }, [userId]);

  if (!userId) {
    return <div>Loading...</div>;
  }
  // const userId = decoded.id;

  const deleteQuote = async (id) => {
    try {
      const response = await api.delete(`/quotes/${id}`);
      if (response.status === 204) {
        alert("Quote deleted");
        setQuotes((prevQuotes) =>
          prevQuotes.filter((quote) => quote.id !== id)
        );
      } else {
        alert("Failed to delete quote.");
      }
    } catch (error) {
      alert("Error deleting quote.");
    }
  };

  const createQuote = async (e) => {
    e.preventDefault();
    const data = { color, body, author };
    try {
      const response = await api.post("/quotes", data);
      if (response.status === 201) {
        setQuotes((prevQuotes) => [...prevQuotes, response.data]);
        setColor("RED");
        setBody("");
        setAuthor("");
        alert("Quote created");
      } else {
        alert("Failed to create quote.");
      }
    } catch (error) {
      alert("Error creating quote.");
    }
  };

  return (
    <div id="home-container">
      <div>
        {quotes.length > 0 && (
          <div>
            <h1 className="text-center">Quotes</h1>
            <QuoteBox
              quotes={quotes}
              onDelete={deleteQuote}
            />
          </div>
        )}
      </div>
      <br />
      <h2 className="text-center">Create a Quote</h2>
      <form onSubmit={createQuote}>
        <label htmlFor="color">Color</label>
        <br />
        <select
          name="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}>
          <option
            value=""
            disabled>
            Select a Color
          </option>

          <option value="RED">Red</option>
          <option value="GREEN">Green</option>
          <option value="BLUE">Blue</option>
          <option value="YELLOW">Yellow</option>
          <option value="ORANGE">Orange</option>
          <option value="PURPLE">Purple</option>
          <option value="BLACK">Black</option>
          <option value="WHITE">White</option>
        </select>
        <br />
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          cols="20"
          rows="5"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}></textarea>

        <label htmlFor="author">Author</label>
        <br />
        <input
          type="text"
          id="author"
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <br />

        <br />
        <input
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}

export default Home;
