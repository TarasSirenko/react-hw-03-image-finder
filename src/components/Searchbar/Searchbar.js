import React, { Component } from 'react';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    currentInpunValue: '',
  };

  changeInpntValue = e => {
    this.setState({ currentInpunValue: e.currentTarget.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.currentInpunValue);
  };

  render() {
    const { currentInpunValue } = this.state;
    const {
      SearchFormButton,
      SearchFormButtonLabel,
      Searchbar,
      SearchFormInput,
      SearchForm,
    } = s;
    return (
      <header className={Searchbar}>
        <form className={SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={SearchFormButton}>
            <span className={SearchFormButtonLabel}>Search</span>
          </button>

          <input
            value={currentInpunValue}
            className={SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.changeInpntValue}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
