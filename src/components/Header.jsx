import React from 'react';
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
        {isLoading ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{name}</p>}
      </header>
    );
  }
}

export default Header;
