import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
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
            <th>Editar/Excluir</th>
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
              <td>
                {Number(element.value * element.exchangeRates[element.currency].ask)
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                {element.exchangeRates[element.currency].name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => {
  const { expenses } = state.wallet;
  return {
    ...state,
    expenses,
  };
};

export default connect(mapStateToProps, null)(Table);
