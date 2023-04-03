import s from './ImageGalleryItem.module.css';
import React from 'react';

// smallImg, alt, largeImg, onClick;

const ImageGalleryItem = ({ smallImg, alt, largeImg, onClick }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img
        src={smallImg}
        alt={alt}
        className={s.ImageGalleryItemImage}
        data-modal={largeImg}
      />
    </li>
  );
};

export default ImageGalleryItem;
