import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  state = {
    favoriteSongs: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({ isLoading: false, favoriteSongs });
    });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    if (isLoading) return <p>Carregando...</p>;
    return (
      <div data-testid="page-favorites">
        <Header />
        {favoriteSongs.map((music) => (
          <MusicCard
            music={ music }
            key={ music.trackId }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
