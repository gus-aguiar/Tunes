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
    this.setState({ isLoading: true }, async () => {
      const xablau = await getUser();
      this.setState({ isLoading: false, userInfo: xablau });
    });
  };

  render() {
    const { userInfo: { name, email, image, description }, isLoading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <p>Carregando...</p>
          : (
            <div>
              <p>{name}</p>
              <p>{email}</p>
              <img data-testid="profile-image" src={ image } alt="imagem do usuário" />
              <p>{description}</p>
              <button type="button">
                {' '}
                <Link to="/profile/edit"> Editar perfil </Link>
                {' '}
              </button>
            </div>)}
      </div>
    );
  }
}

export default Profile;
