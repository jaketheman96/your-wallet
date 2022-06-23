const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE_WALLET, action) => {
  const { type, currencies } = action;
  switch (type) {
  case 'FETCH_SUCCESS':
    return {
      ...state,
      currencies,
    };
  default:
    return state;
  }
};

export default walletReducer;
