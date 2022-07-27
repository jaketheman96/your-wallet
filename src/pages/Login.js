import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import addEmail from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  }

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(addEmail(email));
    history.push('/carteira');
  }

  // reference: https://www.w3resource.com/javascript/form/email-validation.php#:~:text=To%20get%20a%20valid%20email,%5D%2B)*%24%2F.
  handleButton = () => {
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { password, email } = this.state;
    const numLength = 6;
    if (password.length >= numLength && email.match(emailFormat)) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.handleButton());
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <div className="login">
        <form className="loginForm">
          <div
            className="wallet-image"
            style={ { display: 'flex' } }
          >
            <h1
              style={ { color: 'grey' } }
            >
              YourWallet!
            </h1>
            <img
              src="https://media.discordapp.net/attachments/971614587029954591/994040120258867220/Design_sem_nome-removebg-preview.png"
              alt="wallet"
              width="50%"
            />
          </div>
          <label
            htmlFor="email"
            className="labelLogin"
          >
            <p>Email: </p>
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
              className="loginInput"
              required
            />
          </label>
          <label
            htmlFor="password"
            className="labelLogin"
          >
            <p>Password:</p>
            <input
              type="password"
              id="password"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
              className="loginInput"
              required
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ isButtonDisabled }
            className="loginButton"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
