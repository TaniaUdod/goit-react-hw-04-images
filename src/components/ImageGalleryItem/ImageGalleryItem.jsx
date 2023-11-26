import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { GalleryItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <>
      <GalleryItem>
        <Img src={image.webformatURL} alt={image.tags} onClick={toggleModal} />
        {showModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClose={toggleModal}
          />
        )}
      </GalleryItem>
    </>
  );
};
