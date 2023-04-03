import s from './Error.module.css';
import React from 'react';

const Error = ({ message }) => {
  return <p className={s.Error}>{message}</p>;
};

export default Error;
