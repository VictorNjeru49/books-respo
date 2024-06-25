
import {useState,useEffect,useCallback, useReducer, useRef } from 'react';
import './App.scss'
import Uselocalstorage from './components/uselocalstorage';
import Reducerer,{Intialbooks} from './components/reducers/reducer';


function App() {
  const [books, dispatchBooks] = useReducer(Reducerer, Intialbooks);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = Uselocalstorage();

  const idInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);
  const publishInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(editingBook){
      idInputRef.current!.value = editingBook.id;
      titleInputRef.current!.value = editingBook.title;
      authorInputRef.current!.value = editingBook.author;
      publishInputRef.current!.value = editingBook.year
    }
  },[editingBook])
  

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = useCallback((pageNumber: any) => {
    
    setCurrentPage(pageNumber);
  }, []);

  const handleAddBook = (e: React.FocusEvent) => {
    e.preventDefault();
    if (newBook.title && newBook.author && newBook.year) {
      dispatchBooks({
        type: 'ADD_BOOK',
        payload: { ...newBook },
      });
      setNewBook({ title: '', author: '', year: '' });
      titleInputRef.current?.focus();
    }
  };


  const handleEditBook = (e, book: any) => {
    book.title =(e.target.value) 
    book.author = (e.target.value)
    book.year = (e.target.value)
    setEditingBook(book);
  };

  const handleUpdateBook = (book) => {
    dispatchBooks({type: 'UPDATE_BOOK',payload: editingBook,
    });
    setEditingBook(book);
  };

  const handleDeleteBook = (bookId) => {
    dispatchBooks({type: 'DELETE_BOOK', payload: bookId,});
  };


  return (
    <div className="container">
      <h1>Books</h1>

      <div className="form">
        <input type="text" placeholder="Title" value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          ref={titleInputRef}
        />
        <input type="text" placeholder="Author" value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input type="text" placeholder="Year" value={newBook.year}
          onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search by title..."
    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Privelledges</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr
              key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.year}</td>
                  <td>
                    <button onChange={()=>handleEditBook}>Edit</button>
                    <button onClick={()=>{handleDeleteBook(book.id)}}>Delete</button>
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
          Page {currentPage} of {totalPages+1}
          
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
