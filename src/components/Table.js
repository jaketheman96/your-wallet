import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem } from '../actions/index';

class Table extends React.Component {
  handleClick = ({ target }) => {
    const { dispatch, subtractTotal } = this.props;
    const { id, value } = target;
    dispatch(deleteItem(id));
    subtractTotal(value);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="redTable">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element) => (
            <tr key={ element.id }>
              <td>
                {element.description}
              </td>
              <td>
                {element.tag}
              </td>
              <td>
                {element.method}
              </td>
              <td>
                {`${Number(element.value).toFixed(2)}`}
              </td>
              <td>
                {element.exchangeRates[element.currency].code}
              </td>
              <td>
                {Number(element.exchangeRates[element.currency].ask).toFixed(2)}
              </td>
              <td id="value-converted">
                {`${Number(element.value * element.exchangeRates[element.currency].ask)
                  .toFixed(2)} BRL`}
              </td>
              <td>
                {element.exchangeRates[element.currency].name}
              </td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.handleClick }
                  id={ element.id }
                  value={
                    Number(element.value * element.exchangeRates[element.currency].ask)
                  }
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
  subtractTotal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { expenses } = state.wallet;
  return {
    ...state,
    expenses,
  };
};

export default connect(mapStateToProps, null)(Table);
