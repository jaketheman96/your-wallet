const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default walletReducer;
