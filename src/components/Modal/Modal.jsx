import { useEffect } from 'react';
import { ModalContainer, Overlay } from './Modal.styled';

export const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleKeydown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalContainer>
        <img src={largeImageURL} alt={tags} />
      </ModalContainer>
    </Overlay>
  );
};
