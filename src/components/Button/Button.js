import s from './Button.module.css';
import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button className={s.Button} type="button" onClick={onClick}>
        ЗАГРУЗИТЬ ЕЩЕ
      </button>
    );
  }
}

export default Button;
