import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    isLoading: false,
    isDisabled: true,
    name: '',
    description: '',
    image: '',
    email: '',
  };

  componentDidMount() {
    this.recoverLogin();
  }

  recoverLogin = async () => {
    this.setState({ isLoading: true });
    const userInfo = await getUser();
    this.setState({
      isLoading: false,
      name: userInfo.name,
      description: userInfo.description,
      email: userInfo.email,
      image: userInfo.image,
    });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => this.validationChange());
  };

  validationChange = () => {
    const { name, email, description, image } = this.state;
    const mailValidation = email.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/);
    const error = [
      !name.length,
      !email.length,
      !description.length,
      !image.length,
      !mailValidation,
    ];
    const caseSuccess = error.every((event) => !event);
    this.setState({ isDisabled: !caseSuccess });
  };

  handleClick = () => {
    this.setState({ isLoading: true }, async () => {
      const { name, description, email, image } = this.state;
      const { history } = this.props;
      await updateUser(
        {
          name,
          description,
          email,
          image,
        },
      );
      this.setState({ isLoading: false });
      history.push('/profile');
    });
  };

  render() {
    const { name, description, email, image, isLoading, isDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <p>Carregando...</p>
          : (
            <form>
              <label htmlFor="name">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nome"
                  value={ name }
                  data-testid="edit-input-name"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={ email }
                  data-testid="edit-input-email"
                  onChange={ this.handleChange }

                />
              </label>
              <label htmlFor="description">
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Descrição"
                  value={ description }
                  data-testid="edit-input-description"
                  onChange={ this.handleChange }

                />
              </label>
              <label htmlFor="image">
                <input
                  type="text"
                  id="image"
                  name="image"
                  placeholder="Fotinha"
                  value={ image }
                  data-testid="edit-input-image"
                  onChange={ this.handleChange }

                />
              </label>
              <button
                type="submit"
                data-testid="edit-button-save"
                onClick={ this.handleClick }
                disabled={ isDisabled }
              >
                Editar perfil
              </button>

            </form>
          )}
        ;
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
