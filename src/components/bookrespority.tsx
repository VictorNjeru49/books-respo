import { useReducer, useEffect, useCallback, useState } from 'react';
import '../App.scss'
import { Book } from '../types/alltypes';
import useLocalStorage from '../hooks/uselocalstorage';
import BookForm from './bookform';
import Reducer, { InitialState } from './reducers/reducer';

const BookRepository = () => {
  const [state, dispatch] = useReducer(Reducer, InitialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [localStorageBooks, setLocalStorageBooks] = useLocalStorage<Book[]>('books', []);

  useEffect(() => {
    if (localStorageBooks.length) {
      dispatch({ type: 'SET_BOOKS', payload: localStorageBooks });
    }
  }, [localStorageBooks]);

  useEffect(() => {
    if (editingBook) {
      dispatch({ type: 'SET_EDITING_BOOK', payload: editingBook });
    }
  }, [editingBook]);

  useEffect(() => {
    setLocalStorageBooks(state.books);
  }, [state.books, setLocalStorageBooks]);

  const handleAddBook = (book: Omit<Book, 'id'>) => {
    dispatch({ type: 'ADD_BOOK', payload: book });
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = (book: Book) => {
    dispatch({ type: 'UPDATE_BOOK', payload: book });
    setEditingBook(null);
  };

  const handleDeleteBook = (id: string) => {
    dispatch({ type: 'DELETE_BOOK', payload: id });
  };

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const filteredBooks = state.books.filter((book) =>
    book.title.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className='container'>
      <BookForm onSubmit={handleAddBook} editingBook={editingBook} onUpdate={handleUpdateBook} />
      <input className='search'
        type="text"
        placeholder="Search by title"
        value={state.searchTerm}
        onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
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
      <div className="nextpage">
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
};

export default BookRepository;
