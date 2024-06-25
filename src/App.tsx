
import React, {useState,useEffect,useCallback, useReducer, useRef } from 'react';
import './App.scss'
import Uselocalstorage from './components/uselocalstorage';
import Reducerer,{Intialbooks} from './components/reducers/reducer';
import { Book } from './types/alltypes';


function App() {
  const [books, dispatch] = useReducer(Reducerer, Intialbooks);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [storedBooks, setStoredBooks] = Uselocalstorage('books', books);

  const idInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const authorInputRef = useRef(null);
  const yearInputRef = useRef(null);

  useEffect(() => {
    setStoredBooks(books);
  }, [books, setStoredBooks]);

  useEffect(() => {
    if (editingBook) {
      idInputRef.current.value = editingBook.id;
      titleInputRef.current.value = editingBook.title;
      authorInputRef.current.value = editingBook.author;
      yearInputRef.current.value = editingBook.year;
    }
  }, [editingBook]);

  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = useCallback(pageNumber => {
    setCurrentPage(pageNumber);
  }, []);

  const handleAddBook = (e) => {
    e.preventDefault();
    const newBook = {
      id: Date.now().toString(),
      title: titleInputRef.current.value,
      author: authorInputRef.current.value,
      year: parseInt(yearInputRef.current.value)
    };
    dispatch({ type: 'ADD_BOOK', payload: newBook });
    titleInputRef.current.value = '';
    authorInputRef.current.value = '';
    yearInputRef.current.value = '';
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = () => {
    const updatedBook = {
      id: editingBook.id,
      title: titleInputRef.current.value,
      author: authorInputRef.current.value,
      year: parseInt(yearInputRef.current.value)
    };
    dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId) => {
    dispatch({ type: 'DELETE_BOOK', payload: bookId });
  };

  return (
    <div className="container">
      <h1>Book Repository</h1>
      <div className="form">
        <input type="text" placeholder="Title" ref={titleInputRef} />
        <input type="text" placeholder="Author" ref={authorInputRef} />
        <input type="text" placeholder="Year" ref={yearInputRef} />
        {editingBook ? (
          <button onClick={handleUpdateBook}>Update Book</button>
        ) : (
          <button onClick={handleAddBook}>Add Book</button>
        )}
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book:Book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>
                <button onClick={() => handleEditBook(book)}>Edit</button>
                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App
