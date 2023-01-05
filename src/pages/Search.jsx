import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    isDisabled: true,
    searchValue: '',
    isLoading: false,
    errorMusic: false,
    artist: undefined,
    albums: [],

  };

  handleChange = ({ target }) => {
    const validationInput = 2;
    if (target.value.length >= validationInput) {
      return this.setState({ isDisabled: false, searchValue: target.value });
    }
    return this.setState({ isDisabled: true, searchValue: target.value });
  };

  handleClick = async () => {
    const { searchValue } = this.state;
    this.setState({
      isLoading: true,
      errorMusic: false,
      artist: undefined,
      searchValue: '',
    }, async () => {
      const albums = await searchAlbumsAPI(searchValue);
      this.setState({
        isLoading: false,
        albums,
        artist: searchValue,
        errorMusic: true,
      });
    });
  };

  showContent = (content) => content
    .map(({ collectionName, artistName, collectionId, artworkUrl100 }) => (
      <div key={ collectionId }>
        <img
          src={ artworkUrl100 }
          alt={ collectionName }
        />
        <p>{`Album: ${collectionName}`}</p>
        <p>{`ArtistName: ${artistName}`}</p>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Album
        </Link>
      </div>
    ));

  render() {
    const { isLoading, isDisabled, searchValue, artist, albums, errorMusic } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {' '}
        {!errorMusic
          ? <div />
          : (
            <div>
              {
                albums.length === 0 && errorMusic
                  ? (
                    <p>Nenhum álbum foi encontrado</p>
                  ) : (
                    <p>{`Resultado de álbuns de: ${artist}`}</p>
                  )
              }
            </div>
          )}
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
                onClick={ this.handleClick }
                disabled={ isDisabled }
              >
                Pesquisar
              </button>
              {this.showContent(albums)}
            </div>)}

      </div>
    );
  }
}

export default Search;
