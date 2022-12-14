import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isDisabled: true,
    searchValue: '',
    isLoading: false,

  };

  handleChange = ({ target }) => {
    const validationInput = 2;
    if (target.value.length >= validationInput) {
      return this.setState({ isDisabled: false, searchValue: target.value });
    }
    return this.setState({ isDisabled: true, searchValue: target.value });
  };

  render() {
    const { isLoading } = this.state;
    const { isDisabled } = this.state;
    const { searchValue } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading
          ? <p>Carregando...</p>
          : (
            <div>
              <input
                data-testid="search-artist-input"
                type="text"
                onChange={ this.handleChange }
                value={ searchValue }
              />
              <button
                data-testid="search-artist-button"
                type="submit"
                disabled={ isDisabled }
              >
                Pesquisar
              </button>
            </div>)}

      </div>
    );
  }
}

export default Search;
