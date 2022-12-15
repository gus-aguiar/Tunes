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
    // console.log(musics);
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

    return (
      <div data-testid="page-album">
        <Header />
        { isLoading
          ? <p>Carregando...</p>
          : <MusicCard artist={ artist } album={ album } musics={ musics } />}
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
