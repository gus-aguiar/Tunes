import React from 'react';
import { shape, func } from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    isLoading: false,
    isDisabled: true,
    user: '',
  };

  handleChange = ({ target }) => {
    const validationInput = 3;
    if (target.value.length >= validationInput) {
      return this.setState({ isDisabled: false, user: target.value });
    }
    return this.setState({ isDisabled: true, user: target.value });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true }, async () => {
      await createUser({ name: user });
      this.setState({ isLoading: false });
      history.push('/search');
    });
  };

  render() {
    const { isDisabled, isLoading } = this.state;
    return isLoading ? (
      <p>Carregando...</p>
    ) : (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          onChange={ this.handleChange }
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};

export default Login;
