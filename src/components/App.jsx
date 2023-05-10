import { useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

export const App = () => {
  const [search, setSearch] = useState('');

  const setQuery = query => {
    setSearch(query);
  };

  return (
    <div>
      <Searchbar setQuery={setQuery} />
      <ImageGallery query={search} />
    </div>
  );
};
