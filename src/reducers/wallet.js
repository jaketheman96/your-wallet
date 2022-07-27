import { ADD_CURRENCIES, ADD_EXPENSES } from '../actions/index';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE_WALLET, action) => {
  const { type, payload } = action;
  const { expenses } = state;
  switch (type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(payload.infos).filter((item) => item !== 'USDT'),
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: expenses.concat(payload),
    };
  case 'DELETE_ITEM':
    return {
      ...state,
      expenses: expenses.filter((element) => element.id !== Number(payload)),
    };
  default:
    return state;
  }
};

export default walletReducer;
