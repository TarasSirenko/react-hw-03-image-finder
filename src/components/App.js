import React, { Component } from 'react';
import s from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

// import

class App extends Component {
  state = {
    searthText: '',
    currentPage: 1,
    currentItem: null,
  };

  onSubmit = text => {
    this.setState({ searthText: text, currentPage: 1 });
  };

  loadeMore = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };
  openModal = e => {
    const alt = e.target.alt;
    const srs = e.target.dataset.modal;
    this.setState({ currentItem: { alt, srs } });
  };
  closeModal = () => {
    this.setState({ currentItem: null });
  };

  render() {
    const { searthText, currentPage, currentItem } = this.state;
    return (
      <div className={s.App}>
        {currentItem && (
          <Modal item={currentItem} closeModal={this.closeModal} />
        )}
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          text={searthText}
          page={currentPage}
          clickBtn={this.loadeMore}
          itemClick={this.openModal}
        />
      </div>
    );
  }
}

export default App;
