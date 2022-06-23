import { combineReducers } from 'redux';
import userReducer from './user';
import walletReducer from './wallet';

export const INICIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

const rootReducer = combineReducers({ user: userReducer, wallet: walletReducer });

export default rootReducer;
