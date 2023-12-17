import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/BookList.scss";
import { Table } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Booklist() {
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState("");
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState({});
    const [isSearchSaved, setIsSearchSaved] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedField, setSelectedField] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);

    
    useEffect(() => {
        let filtered = books;
        if (searchQuery || selectedField) {
            filtered = filtered.filter((book) => {
                const nameMatch = book.name.toLowerCase().includes(searchQuery.toLowerCase());
                const fields = book.fields.split(",");
                const fieldMatch = !selectedField || fields.includes(selectedField);
                return nameMatch && fieldMatch;
            });
        }
        setFilteredBooks(filtered);
    }, [searchQuery, selectedField, books]);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
        setTimeout(() => {
        setBooks([
            {
                id: 1,
                name: "The Catcher in the Rye",
                description: "A classic novel about teenage angst.",
                author: "J.D. Salinger",
                fields: "history,biography,classics",
                dop: "2023-01-15",
            },
            {
                id: 2,
                name: "To Kill a Mockingbird",
                description: "A powerful exploration of racism and morality.",
                author: "Harper Lee",
                fields: "romance,self-help",
                dop: "2023-02-22",
            },
            {
                id: 3,
                name: "1984",
                description: "A dystopian novel by George Orwell.",
                author: "George Orwell",
                fields: "carfts-hobbies,non-fiction",
                dop: "2023-03-10",
            },
            {
                id: 4,
                name: "The Great Gatsby",
                description: "A novel about the American dream.",
                author: "F. Scott Fitzgerald",
                fields: "fiction,history",
                dop: "2023-04-05",
            },
        ]);
        setIsLoading(false);
        }, 1000);
    }, []);

    const handleDelete = (id) => {
        // Filter out the book with the specified ID
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
        console.log(`Deleting book with ID: ${id}`);
    };

    const RequestBook = (id) => {
        alert("Book Requested");
        console.log(`Requesting book with ID: ${id}`);
    };

    const saveSearch = () => {
        if (filteredBooks.length === 0) {
            setErr("No books to save");
            return;
        }
        if (isSearchSaved) {
            setErr("Search already saved");
            return;
        }
        if (filteredBooks.length > 5) {
            setErr("Can't save more than 5 books");
            return;
        }

        const savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];
        const newSearch = filteredBooks.map((book) => {
            return {
                bookId: book.id,
                bookName: book.name,
                timeStampe: new Date().toDateString(),
            };
        });
        savedSearches.push(newSearch);
        // filter out duplicate searches by bookId
        const uniqueSearches = savedSearches.filter((search, index, self) => {
            return index === self.findIndex((s) => s.bookId === search.bookId);
        });
        localStorage.setItem("savedSearches", JSON.stringify(uniqueSearches));
        setIsSearchSaved(true);
        alert("Search saved");
        window.location.reload();
    };

    if (isLoading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <div>Loading...</div>
            </div>
        );
    }

  return (
    <>
      {err && (
        <div className="error fixed-top">
          <span>{err}</span>
          <button className="close-btn" onClick={() => setErr("")}>
            X
          </button>
        </div>
      )}
      <div>
            <h2 className="main-title">Books</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search books by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button className="clear-button" onClick={() => setSearchQuery("")}>
                    <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
                <select
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                >
                    <option value="">All Fields</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                    <option value="biography">Biography</option>
                    <option value="history">History</option>
                    <option value="self-help">Self-Help</option>
                    <option value="historical-fiction">Historical Fiction</option>
                    <option value="classics">Classics</option>
                    <option value="romance">Romance</option>
                    <option value="carfts-hobbies">Crafts & Hobbies</option>
                </select>
            </div>
            
            <div className="save-search">
                <button
                    className={`save-search-button ${isSearchSaved ? 'saved' : ''}`}
                    onClick={saveSearch}
                    disabled={!searchQuery || filteredBooks.length === 0}
                    >
                    Save Search
                </button>
            </div>

            {/* add save search button and style it here */}

            <div className="table-container">
                    <Table>
                        <thead>
                            <tr>
                            <th>Book Name</th>
                            <th>Description</th>
                            <th>Author</th>
                            <th>Field</th>
                            <th>DOP</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((d) => (
                            <tr key={d.id}>
                                <td>{d.name}</td>
                                {d.description.length > 50 ? (
                                <td>{d.description.slice(0, 50) + "..."}</td>
                                ) : (
                                <td>{d.description}</td>
                                )}
                                <td>{d.author}</td>
                                <td>{d.fields}</td>
                                <td>{d.dop.slice(0, 10)}</td>
                                <td className="td">
                                <div className="buttonsList">
                                    {user && user.role === "admin" ? (
                                    <>
                                        {/* Admin */}
                                        <Link
                                            className="myButton"
                                            to={`/books/update/${d.id}`}
                                        >
                                            Update
                                        </Link>
                                        <button
                                            className="btn btn-danger button delete-btn"
                                            onClick={() => handleDelete(d.id)}
                                        >
                                            <span></span>
                                        </button>
                                        <Link className="myButton" to={`/books/book/${d.id}`}>
                                            View
                                        </Link>
                                    </>
                                    ) : (
                                    <>
                                        {/* User */}
                                        <button onClick={() => RequestBook(d.id)}>
                                            Request
                                        </button>
                                        <Link to={`/books/book/${d.id}`}>
                                            <button>Details</button>
                                        </Link>
                                        {/* save book */}
                                    </>
                                    )}
                                </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
            </div>
      </div>
    </>
  );
}

export default Booklist;
