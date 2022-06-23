import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    const result = getCurrencies();
    dispatch(result);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="user-welcome">
          <h3
            data-testid="email-field"
          >
            {`Ola ${user}`}
          </h3>
        </div>
        <div className="expenses">
          <ul
            data-testid="total-field"
          >
            <li>0</li>
          </ul>
          <h2
            data-testid="header-currency-field"
          >
            BRL
          </h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { email } = state.user;
  return {
    ...state,
    user: email,
  };
};

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
