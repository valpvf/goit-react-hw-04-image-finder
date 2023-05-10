import PT from 'prop-types';

import { useCallback } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalData, closeModal }) => {
  const { src, alt } = modalData;

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleCloseEsc = useCallback(
    e => {
      if (e.code === 'Escape') closeModal();
      window.removeEventListener('keydown', handleCloseEsc);
    },
    [closeModal]
  );

  window.addEventListener('keydown', handleCloseEsc);

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  modalData: PT.objectOf(PT.string),
  closeModal: PT.func,
};

export default Modal;
