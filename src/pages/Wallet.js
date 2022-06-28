import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, getCurrencies } from '../actions';

class Wallet extends React.Component {
  state = {
    id: 0,
    value: 0,
    currency: '',
    method: '',
    tag: '',
    description: '',
    totalPrice: 0,
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    const result = getCurrencies();
    await dispatch(result);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { dispatch } = this.props;
    const { id,
      value,
      description,
      currency,
      method,
      tag } = this.state;
    this.setState((prev) => ({
      id: prev.id + 1,
    }));
    const allStates = { id, value, description, currency, method, tag };
    await dispatch(addExpenses(allStates));
    await this.sumTotalPrice();
  }

  sumTotalPrice = async () => {
    const { wallet: { expenses } } = this.props;
    if (!expenses) {
      this.setState({ totalPrice: 0 });
    } else {
      let result = 0;
      expenses
        .map((total) => (
          total.value * total.exchangeRates[total.currency].ask))
        .forEach((element) => {
          result += element;
        });
      this.setState({
        totalPrice: result.toFixed(2),
        value: 0,
        description: '',
        currency: '',
        method: '',
        tag: '',
      });
    }
  }

  render() {
    const {
      user,
      wallet: {
        currencies,
      },
    } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      totalPrice,
    } = this.state;
    return (
      <>
        <div className="user-welcome">
          <h3 data-testid="email-field">
            {`Ola ${user}`}
          </h3>
        </div>
        <div className="expenses">
          <h2 data-testid="total-field">
            {totalPrice}
          </h2>
          <h2 data-testid="header-currency-field">
            BRL
          </h2>
        </div>
        <form className="form-expenses">
          <label htmlFor="value">
            <p>Valor:</p>
            <input
              type="number"
              id="value"
              name="value"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="currency" aria-label="Moeda">
            <p>Moeda</p>
            <select
              id="currency"
              name="currency"
              onChange={ this.handleChange }
              alue={ currency }
            >
              <option defaultValue=""> </option>
              {currencies.map((element) => (
                <option
                  value={ element }
                  key={ element }
                >
                  {element}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="method"
          >
            <p> Metodo de pagamento:</p>
            <select
              data-testid="method-input"
              id="method"
              name="method"
              onChange={ this.handleChange }
              value={ method }
            >
              <option defaultValue="">None selected</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label
            htmlFor="tag"
          >
            <p>Categoria:</p>
            <select
              data-testid="tag-input"
              id="tag"
              onChange={ this.handleChange }
              value={ tag }
              name="tag"
            >
              <option defaultValue="">None selected</option>
              <option value="Lazer">Lazer</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
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
          <br />
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
