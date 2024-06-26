import { Book, State } from "../../types/alltypes";
import generateId from "../../utils/genrateid";
export type Action =
  | { type: 'ADD_BOOK'; payload: Omit<Book, 'id'> }
  | { type: 'UPDATE_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'SET_EDITING_BOOK'; payload:Book};

export const InitialState: State = {
  books: [],
  currentPage: 1,
  booksPerPage: 5,
  searchTerm: '',
 
};

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, { ...action.payload, id: generateId() }] };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map((book) => (book.id === action.payload.id ? action.payload : book)),
      };
    case 'DELETE_BOOK':
      return { ...state, books: state.books.filter((book) => book.id !== action.payload) };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    default:
      return state;
  }
};
export default Reducer;