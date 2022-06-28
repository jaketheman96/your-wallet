const ADD_EMAIL = 'ADD_EMAIL';

const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export default addEmail;

export const fetchApi = async () => {
  try {
    const urlApi = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(urlApi);
    const result = await response.json();
    return {
      infos: result,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export const getCurrencies = () => async (dispatch) => {
  const apiReturned = await fetchApi();
  const response = apiReturned;
  dispatch({
    type: ADD_CURRENCIES,
    payload: response,
  });
};

export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addExpenses = (allInfos) => async (dispatch) => {
  const apiReturned = await fetchApi();
  allInfos.exchangeRates = apiReturned.infos;
  dispatch({
    type: ADD_EXPENSES,
    payload: allInfos,
  });
};
