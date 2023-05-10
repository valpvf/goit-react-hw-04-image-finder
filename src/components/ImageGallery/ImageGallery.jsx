import { useEffect, useState } from 'react';
import PT from 'prop-types';

import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import getSearchGalleryApi from 'services/galleryApi';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

const ImageGallery = ({ query }) => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const getReceivedGallery = async () => {
      setIsLoading(true);
      try {
        const data = await getSearchGalleryApi(query, page);
        setGallery(gallery => [...gallery, ...data.hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== search || setPage(page) !== page) {
      query && getReceivedGallery();
      setSearch(query);
    }

    if (query !== search) {
      setPage(1);
      setGallery([]);
    }
  }, [page, query]);

  const changePage = () => {
    setPage(page + 1);
  };

  const toggleModal = (modalData = null) => {
    setModalData(modalData);
  };

  return (
    <>
      <ul className="ImageGallery">
        <ImageGalleryItem gallery={gallery} openModal={toggleModal} />
      </ul>
      <div className="wrapBtn">
        {gallery.length > 0 && gallery.length % 12 === 0 && !isLoading && (
          <Button onClick={changePage} />
        )}
        {isLoading && <Loader />}
      </div>
      {modalData && <Modal modalData={modalData} closeModal={toggleModal} />}
    </>
  );
};

ImageGallery.propTypes = {
  query: PT.string,
};

export default ImageGallery;
