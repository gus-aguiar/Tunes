import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  async componentDidMount() {
    const { match } = this.props;
    const musics = await getMusics(match.params.id);
    console.log(musics);
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
      </div>
    );
  }
}

export default Album;
