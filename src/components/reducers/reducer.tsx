import { Book, Action, State } from "../../types/alltypes"

export const Intitialstate: State={
    books: [],
    searchQuery: '',
    currentPage : 1,
    bookPerPage: 5
}
export const Intialbooks:Book[]=[
  {
    id:'BN303', title:'Romeo de Juilet', author:'William Shakespeare', year: 1934
  },
  {
    id:'NT202', title:'Timeline', author:'John', year: 2001
  },
  {
    id:'NT202', title:'Timeline', author:'John', year: 2001
  },
  {
    id:'NT202', title:'Timeline', author:'John', year: 2001
  },
  {
    id:'NT202', title:'Timeline', author:'John', year: 2001
  }
]

function Reducerer(state: Book[], action: Action) {
    switch (action.type) {
      case 'ADD_BOOK':
        return [...state, action.payload!];
      case 'UPDATE_BOOK':
        return state.map((book) =>book.id === action.payload!.id ? action.payload! : book
        );

      case 'DELETE_BOOK':
        return state.filter((bookId) => bookId.id !== action.payload!.id);

        case 'SEARCH_BOOK':
          return state.filter((book) => book.title.toLowerCase());
      default:
        
        return state;
    }
  }
  export default Reducerer