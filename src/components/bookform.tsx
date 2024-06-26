import React, { useRef, FC } from 'react';
import { Book } from '../types/alltypes';
import '../App.scss'

interface BookFormProps {
  onSubmit: (book: Omit<Book, 'id'>) => void;
  editingBook: Book | null;
  onUpdate: (book: Book) => void;
}

const BookForm: FC<BookFormProps> = ({ onSubmit, editingBook, onUpdate }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleRef.current && authorRef.current && yearRef.current) {
      const newBook = {
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: parseInt(yearRef.current.value),
      };
      onSubmit(newBook);
      titleRef.current.value = '';
      authorRef.current.value = '';
      yearRef.current.value = '';
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleRef.current && authorRef.current && yearRef.current && editingBook) {
      const updatedBook = {
        id: editingBook.id,
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: parseInt(yearRef.current.value),
      };
      onUpdate(updatedBook);
      titleRef.current.value = '';
      authorRef.current.value = '';
      yearRef.current.value = '';
    }
  };

  return (
    <form onSubmit={editingBook ? handleUpdate : handleSubmit}>
      <input ref={titleRef} placeholder="Title" defaultValue={editingBook?.title} required />
      <input ref={authorRef} placeholder="Author" defaultValue={editingBook?.author} required />
      <input ref={yearRef} placeholder="Year" type="number" defaultValue={editingBook?.year} required />
      <button type="submit">{editingBook ? 'Update' : 'Add'} Book</button>
    </form>
  );
};

export default BookForm;
