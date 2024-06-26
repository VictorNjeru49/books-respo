export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

export interface State {
  books: Book[];
  currentPage: number;
  booksPerPage: number;
  searchTerm: string;
}