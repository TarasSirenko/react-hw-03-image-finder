import s from './Modal.module.css';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = e => {
    if (e.code === 'Escape') {
      console.log('Escape');
      this.props.closeModal();
    }
  };
  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };
  render() {
    const { srs, alt } = this.props.item;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleOverlayClick}>
        <div className={s.Modal}>
          <img src={srs} alt={alt} className={s.Img} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
