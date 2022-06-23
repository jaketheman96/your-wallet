const ADD_EMAIL = 'ADD_EMAIL';

const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export default addEmail;
