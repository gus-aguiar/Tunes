import React from 'react';
import { string, shape } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    artist: '',
    album: '',
    musics: [],
    isLoading: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const musics = await getMusics(match.params.id);
    console.log(musics);
    const { artistName, collectionName } = musics[0];
    const filterMusicas = musics.filter(({ trackId }) => trackId);
    // console.log(filterMusicas);
    this.setState({
      artist: artistName,
      album: collectionName,
      musics: filterMusicas,
      isLoading: false,

    });
  }

  render() {
    const { artist, album, musics, isLoading } = this.state;
    if (isLoading) return <p>Carregando...</p>;

    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artist}</p>
        <p data-testid="album-name">{album}</p>
        { musics.map((music) => (
          <MusicCard
            artist={ artist }
            album={ album }
            music={ music }
            key={ music.trackId }
          />

        ))}
      </div>
    );
  }
}
Album.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
};

export default Album;
