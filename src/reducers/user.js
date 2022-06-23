const INITIAL_STATE_USER = {
  email: '',
};

const userReducer = (state = INITIAL_STATE_USER, action) => {
  const { type, payload } = action;
  switch (type) {
  case 'ADD_EMAIL':
    return {
      ...state,
      email: payload,
    };
  default:
    return state;
  }
};

export default userReducer;
