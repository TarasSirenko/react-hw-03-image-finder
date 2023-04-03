import s from './ImageGallery.module.css';
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.js';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import api from '../../Api/Api';
import ErrorMesage from 'components/ErrorMesage/ErrorMesage';

class ImageGallery extends Component {
  state = {
    response: null,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { text, page } = this.props;

    if (prevProps !== this.props) {
      if (text === prevProps.text && page === prevProps.page) return;

      this.setState({ status: 'pending' });

      setTimeout(() => {
        api
          .fetchImage(text, page)
          .then(response => {
            if (response.total === 0) {
              this.setState({ status: 'rejected' });
              return Promise.reject(
                new Error(`Нет изображений по запросу ${text}`),
              );
            }

            if (prevProps.page !== page) {
              this.setState(prevState => ({
                response: [...prevState.response, ...response.hits],
                status: 'resolved',
              }));
              setTimeout(() => {
                document.body.scrollTop += 100;
              }, 2000);
            }

            if (prevProps.text !== text)
              this.setState({ response: response.hits, status: 'resolved' });
          })
          .catch(error => {
            this.setState({ error });
          });
      }, 500);
      return;
    }
  }

  render() {
    const { response, status, error } = this.state;
    const { clickBtn, page, itemClick } = this.props;
    // if (status === 'idle') return;

    if (status === 'pending') {
      if (page === 1) return <Loader />;
      if (page > 1)
        return (
          <>
            <ul className={s.Gallery}>
              {response.map(
                ({ id, webformatURL, tags, largeImageURL }, index) => {
                  return (
                    <ImageGalleryItem
                      key={id}
                      smallImg={webformatURL}
                      alt={tags}
                      largeImg={largeImageURL}
                      onClick={itemClick}
                    />
                  );
                },
              )}
            </ul>
            <Loader />;
          </>
        );
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.Gallery}>
            {response.map(
              ({ id, webformatURL, tags, largeImageURL }, index) => (
                <ImageGalleryItem
                  key={id}
                  smallImg={webformatURL}
                  alt={tags}
                  largeImg={largeImageURL}
                  onClick={itemClick}
                />
              ),
            )}
          </ul>
          <Button onClick={clickBtn} />
        </>
      );
    }

    if (status === 'rejected') return <ErrorMesage message={error.message} />;
  }
}

export default ImageGallery;
