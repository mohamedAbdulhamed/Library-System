import { useState, useEffect } from "react";
import "../style/BookSearches.scss";

function BookSearches() {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem("bookSearches");
    const searches = storedSearches ? JSON.parse(storedSearches) : [];
    setSearches(searches);
  }, []);

  return (
    <div className="book-searches">
      <h2>Book Searches</h2>
      <table>
        <thead>
          <tr>
            <th>Search Name</th>
            <th>Search Date</th>
          </tr>
        </thead>
        <tbody>
          {searches.map((search, index) => (
            <tr key={index} className="search-item">
              <td>{search.name}</td>
              <td>{new Date(search.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookSearches;