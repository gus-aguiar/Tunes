import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isDisabled: true,

  };

  handleChange = ({ target }) => {
    const validationInput = 2;
    if (target.value.length >= validationInput) {
      return this.setState({ isDisabled: false });
    }
    return this.setState({ isDisabled: true });
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}
export default Search;
