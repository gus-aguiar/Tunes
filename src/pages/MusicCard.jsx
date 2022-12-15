import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  showmusic = (musics) => musics.map(({ previewUrl, trackName, trackId }) => (
    <div key={ trackId }>
      <p>{ trackName }</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
    </div>
  ));

  render() {
    const { artist, album, musics } = this.props;
    return (
      <div>
        <p data-testid="artist-name">{artist}</p>
        <p data-testid="album-name">{album}</p>
        <div>
          {this.showmusic(musics)}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  musics: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
