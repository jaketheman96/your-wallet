import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, getCurrencies } from '../actions';

class Wallet extends React.Component {
  state = {
    id: 0,
    amount: 0,
    description: '',
    currencyInput: 'USD',
    paymentMethod: 'Dinheiro',
    category: 'Alimentação',
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    const result = getCurrencies();
    dispatch(result);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { dispatch } = this.props;
    this.setState((prev) => ({
      id: prev.id + 1,
    }));
    const allStates = {
      infos: this.state,
    };
    dispatch(addExpenses(allStates));
    this.totalPriceWithCurrency();
  }

  totalPriceWithCurrency = () => {
    const { wallet: { expenses } } = this.props;
    expenses.find((expense) => (
      console.log(expense.exchangeRates[`${expense.currencyInput}`])
    ));
  };

  render() {
    const { user, wallet: { currencies } } = this.props;
    const {
      amount,
      description,
      currencyInput,
      paymentMethod,
      category,
    } = this.state;
    return (
      <>
        <div className="user-welcome">
          <h3
            data-testid="email-field"
          >
            {`Ola ${user}`}
          </h3>
        </div>
        <div className="expenses" data-testid="total-field">
          <p>
            {amount}
          </p>
          <h2
            data-testid="header-currency-field"
          >
            BRL
          </h2>
        </div>
        <form className="form-expenses">
          <label htmlFor="amount">
            <p>Valor:</p>
            <input
              type="number"
              id="amount"
              name="amount"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ amount }
            />
          </label>
          <label htmlFor="description">
            <p>Descricao:</p>
            <input
              type="text"
              id="description"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="currencyInput">
            <p>Moeda</p>
            <select
              id="currencyInput"
              name="currencyInput"
              onChange={ this.handleChange }
              value={ currencyInput }
            >
              {currencies.map((currency) => (
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
              onChange={ this.handleChange }
              value={ paymentMethod }
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
            <select
              id="expense-tag"
              onChange={ this.handleChange }
              value={ category }
            >
              <option
                value="Alimentação"
              >
                Alimentação
              </option>
              <option
                value="Lazer"
              >
                Lazer
              </option>
              <option
                value="Trabalho"
              >
                Trabalho
              </option>
              <option
                value="Transporte"
              >
                Transporte
              </option>
              <option
                value="Saúde"
              >
                Saúde
              </option>
            </select>
          </label>
          <input
            type="button"
            value="Adicionar despesa"
            onClick={ this.handleClick }
          />
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { email } = state.user;
  return {
    ...state,
    user: email,
    wallet: state.wallet,
  };
};

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.shape.isRequired),
    currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
