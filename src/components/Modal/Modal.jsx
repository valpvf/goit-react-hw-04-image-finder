import PT from 'prop-types';

import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  handleBackdropClick = e => {
    if (e.target === e.currentTarget) this.props.closeModal();
  };

  handleCloseEsc = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseEsc);
  }

  render() {
    const { src, alt } = this.props.modalData;
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  modalData: PT.objectOf(PT.string),
  closeModal: PT.func,
};

export default Modal;
