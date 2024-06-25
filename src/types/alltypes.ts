export interface Book {
    id: string;
    title: string;
    author: string;
    year: number;
  }

export interface State{
    books: Book[];
    searchQuery: string;
    currentPage : number;
    bookPerPage: number;
}
export type Action=
  {type: 'ADD_BOOK', payload: Book}
| {type: 'UPDATE_BOOK', payload: Book }
| {type: 'DELETE_BOOK', payload: Book }
| {type: 'SET_BOOK', payload: Book}
| {type: 'SEARCH_BOOK', payload: Book}