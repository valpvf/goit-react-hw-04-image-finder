import { useState } from 'react';
import PT from 'prop-types';

const Searchbar = ({ setQuery }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setQuery(input);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className=".SearchForm-button">
          <span className="button-label">Search</span>
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  setQuery: PT.func,
};

export default Searchbar;
