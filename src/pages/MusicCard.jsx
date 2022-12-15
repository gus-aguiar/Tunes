import PropTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  componentDidMount() {
    this.recoverFavorites();
  }

  recoverFavorites = async () => {
    const favoriteSongs = await getFavoriteSongs();
    console.log(favoriteSongs);
    const { music } = this.props;
    const { trackId } = music;
    console.log(trackId);

    if (favoriteSongs.some((song) => song.trackId === trackId)) {
      this.setState({
        isChecked: true,
        isLoading: false,
      });
    }
  };

  handleChange = async () => {
    const { music } = this.props;
    const { isChecked } = this.state;
    if (!isChecked) {
      this.setState({ isLoading: true });
      await addSong(music);
      this.setState({
        isLoading: false, isChecked: true,
      });
    } else {
      this.setState({ isLoading: true });
      await removeSong(music);
      this.setState({
        isLoading: false, isChecked: false,
      });
    } this.recoverFavorites();
  };

  showmusic = ({ trackId, trackName, previewUrl }) => {
    const { isChecked } = this.state;
    return (
      <div key={ trackId }>
        <p>{ trackName }</p>

        <label htmlFor="favorita">
          <input
            type="checkbox"
            id="favorita"
            name="checkbox"
            value="1"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleChange }
            checked={ isChecked }
          />
          Favorita

        </label>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>);
  };

  render() {
    const { artist, album, music } = this.props;
    const { isLoading } = this.state;
    return (
      isLoading
        ? <p>Carregando...</p>
        : (
          <div>
            <p data-testid="artist-name">{artist}</p>
            <p data-testid="album-name">{album}</p>
            <div>
              {this.showmusic(music)}
            </div>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  music: PropTypes.arrayOf().isRequired,
};

export default MusicCard;
