import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../actions';

class Wallet extends React.Component {
  state = {
    amount: 0,
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    const result = getCurrencies();
    dispatch(result);
  }

  render() {
    const { user, wallet } = this.props;
    const { amount } = this.state;
    return (
      <>
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
            <li>{amount}</li>
          </ul>
          <h2
            data-testid="header-currency-field"
          >
            BRL
          </h2>
        </div>
        <form>
          <label htmlFor="amount">
            <p>Valor:</p>
            <input
              type="number"
              id="amount"
              name="amount"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            <p>Descricao:</p>
            <input
              type="text"
              id="description"
              name="description"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="moeda">
            <p>Moeda</p>
            <select
              id="moeda"
              name="moeda"
            >
              {wallet.map((currency) => (
                <option
                  value={ currency }
                  key={ currency }
                >
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="payment-method"
            data-testid="method-input"
          >
            <p> Metodo de pagamento:</p>
            <select
              id="payment-method"
              name="payment-method"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>
          <label
            htmlFor="expense-tag"
            data-testid="tag-input"
          >
            <p>Categoria:</p>
            <select>
              <option
                value="Alimentação"
                id="expense-tag"
              >
                Alimentação
              </option>
              <option
                value="Lazer"
                id="expense-tag"
              >
                Lazer
              </option>
              <option
                value="Trabalho"
                id="expense-tag"
              >
                Trabalho
              </option>
              <option
                value="Transporte"
                id="expense-tag"
              >
                Transporte
              </option>
              <option
                value="Saúde"
                id="expense-tag"
              >
                Saúde
              </option>
            </select>
          </label>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { email } = state.user;
  const { currencies } = state.wallet;
  return {
    ...state,
    user: email,
    wallet: currencies,
  };
};

Wallet.propTypes = ({
  user: PropTypes.string.isRequired,
  wallet: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, null)(Wallet);
