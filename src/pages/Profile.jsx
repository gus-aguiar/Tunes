import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    userInfo: {},
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState(async () => {
      const xablau = await getUser();
      this.setState({ userInfo: xablau });
    });
  };

  render() {
    const { userInfo: { name, email, image, description } } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <p>{name}</p>
        <p>{email}</p>
        <img data-testid="profile-image" src={ image } alt="imagem do usuário" />
        <p>{description}</p>
        <button type="button">
          {' '}
          <Link to="/profile/edit"> Editar perfil </Link>
          {' '}
        </button>
      </div>
    );
  }
}

export default Profile;
