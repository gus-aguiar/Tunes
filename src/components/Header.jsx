import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    isLoading: true,
    name: '',
  };

  componentDidMount() {
    this.logUser();
  }

  logUser = async () => {
    const user = await getUser();
    const { name } = user;
    this.setState({ name, isLoading: false });
  };

  render() {
    const { name, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <p data-testid="header-user-name">{name}</p>
        )}
        <nav>
          <Link to="/search" data-testid="link-to-search">
            Busca
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
