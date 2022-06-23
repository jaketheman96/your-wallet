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
        <form>
          <fieldset>
            <h2>Your TrybeWallet!</h2>
            <label htmlFor="email">
              <p>Email: </p>
              <input
                type="email"
                id="email"
                name="email"
                value={ email }
                data-testid="email-input"
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="password">
              <p>Password:</p>
              <input
                type="password"
                id="password"
                name="password"
                value={ password }
                data-testid="password-input"
                onChange={ this.handleChange }
                required
              />
            </label>
            <br />
            <input
              type="button"
              value="Entrar"
              onClick={ this.handleClick }
              disabled={ isButtonDisabled }
            />
          </fieldset>
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
