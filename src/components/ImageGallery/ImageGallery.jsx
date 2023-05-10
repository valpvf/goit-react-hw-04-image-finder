import { Component, useCallback, useEffect, useState } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  
  useEffect(() => {
    if (query !== search) {
      return { page: 1, search, gallery };
    }
    return null;
  }, [gallery, query, search]);

  const getReceivedGallery = async () => {
    console.log('query >>', query);
    setIsLoading(true);
    try {
      const data = await getSearchGalleryApi(query, page);
      query && setGallery(() => [...gallery, ...data.hits]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // snapshot
    console.log(setPage(page));
    if ((search !== query && query) || setPage(page) !== page) {
      getReceivedGallery();
    }

    // if (prev.gallery !== gallery && page !== 1) {
    //   window.scrollTo({ top: snapshot - 140, behavior: 'smooth' });
    // }
  }, [page, query, search]);
  // );

  const changePage = () => {
    setPage(page + 1);
  };

  const toggleModal = (modalData = null) => {
    setModalData({ modalData });
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

// class ImageGallery extends Component {
//   state = {
//     gallery: [],
//     page: 1,
//     query: '',
//     isLoading: false,
//     error: null,
//     isModalOpen: false,
//     modalData: null,
//   };

//   static getDerivedStateFromProps(props, state) {
//     const { query } = props;
//     if (query !== state.query) {
//       return { page: 1, query, gallery: [] };
//     }
//     return null;
//   }

//   getSnapshotBeforeUpdate() {
//     return document.body.clientHeight;
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (
//       (prevProps.query !== this.props.query && this.props.query) ||
//       prevState.page !== this.state.page
//     ) {
//       this.getReceivedGallery();
//     }

//     if (prevState.gallery !== this.state.gallery && this.state.page !== 1) {
//       window.scrollTo({ top: snapshot - 140, behavior: 'smooth' });
//     }
//   }

//   getReceivedGallery = async () => {
//     this.setState({ isLoading: true });
//     try {
//       const data = await getSearchGalleryApi(this.props.query, this.state.page);
//       this.setState(prevState => ({
//         gallery: [...prevState.gallery, ...data.hits],
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   changePage = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   toggleModal = (modalData = null) => {
//     this.setState({ modalData });
//   };

//   render() {
//     const { gallery, isLoading, modalData } = this.state;
//     return (
//       <>
//         <ul className="ImageGallery">
//           <ImageGalleryItem gallery={gallery} openModal={this.toggleModal} />
//         </ul>
//         <div className="wrapBtn">
//           {this.state.gallery.length > 0 &&
//             this.state.gallery.length % 12 === 0 &&
//             !isLoading && <Button onClick={this.changePage} />}
//           {isLoading && <Loader />}
//         </div>
//         {modalData && (
//           <Modal modalData={modalData} closeModal={this.toggleModal} />
//         )}
//       </>
//     );
//   }
// }

ImageGallery.propTypes = {
  query: PT.string,
};

export default ImageGallery;
