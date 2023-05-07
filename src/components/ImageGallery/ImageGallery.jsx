import { Component } from 'react';
import PT from 'prop-types';

import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import getSearchGalleryApi from 'services/galleryApi';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    query: '',
    isLoading: false,
    error: null,
    isModalOpen: false,
    modalData: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { query } = props;
    if (query !== state.query) {
      return { page: 1, query, gallery: [] };
    }
    return null;
  }

  getSnapshotBeforeUpdate() {
    return document.body.clientHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      (prevProps.query !== this.props.query && this.props.query) ||
      prevState.page !== this.state.page
    ) {
      this.getReceivedGallery();
    }

    if (prevState.gallery !== this.state.gallery && this.state.page !== 1) {
      window.scrollTo({ top: snapshot - 140, behavior: 'smooth' });
    }
  }

  getReceivedGallery = async () => {
    this.setState({ isLoading: true });
    try {
      const data = await getSearchGalleryApi(this.props.query, this.state.page);
      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  toggleModal = (modalData = null) => {
    this.setState({ modalData });
  };

  render() {
    const { gallery, isLoading, modalData } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          <ImageGalleryItem gallery={gallery} openModal={this.toggleModal} />
        </ul>
        <div className="wrapBtn">
          {this.state.gallery.length > 0 &&
            this.state.gallery.length % 12 === 0 &&
            !isLoading && <Button onClick={this.changePage} />}
          {isLoading && <Loader />}
        </div>
        {modalData && (
          <Modal modalData={modalData} closeModal={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PT.string,
};

export default ImageGallery;
