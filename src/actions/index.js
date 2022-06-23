const ADD_EMAIL = 'ADD_EMAIL';

const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export default addEmail;

export const FETCH_FAILED = 'FETCH_FAILED';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export const fetchFailed = (error) => ({
  type: FETCH_FAILED,
  error,
});

export const fetchSuccess = (currencies) => ({
  type: FETCH_SUCCESS,
  currencies,
});

export const getCurrencies = () => async (dispatch) => {
  try {
    const urlApi = 'https://economia.awesomeapi.com.br/json/all';
    const fetchUrl = await fetch(urlApi);
    const response = await fetchUrl.json();
    const withoutUsdt = Object.keys(response).filter((item) => item !== 'USDT');
    dispatch(fetchSuccess(withoutUsdt));
  } catch (error) {
    dispatch(fetchFailed());
  }
};
