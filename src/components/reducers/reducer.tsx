import { Action, Book } from "../../types/alltypes";

export const Intialbooks:Book[] = [
  { id: 'BN303', title: 'Romeo and Juliet', author: 'William Shakespeare', year: 1934 },
  { id: 'NT202', title: 'Timeline', author: 'Michael Crichton', year: 2001 },
  { id: 'BN304', title: '1984', author: 'George Orwell', year: 1949 },
  { id: 'BN305', title: 'Moby Dick', author: 'Herman Melville', year: 1851 },
  { id: 'BN306', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 }
];

function Reducerer(state:Book[], action:Action) {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.payload];
    case 'UPDATE_BOOK':
      return state.map(book => book.id === action.payload.id ? action.payload : book);
    case 'DELETE_BOOK':
      return state.filter(book => book.id !== action.payload);
    default:
      return state;
  }
}

export default Reducerer;