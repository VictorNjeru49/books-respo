import React, { useState } from 'react';
import '../App.scss';

const Searchbooks = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  return (
    <>
      <div className="searchbtn">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Books"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
};

export default Searchbooks;
