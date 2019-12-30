const initialState = {
  nameChoice: 0,
  userNames: [
    'Ponas Degimapalaikys',
    'Ponia Degimapalaikaitė',
    ' '
  ]
};

export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_USER_NAME':
      if ((state.nameChoice + 1) <= 2) {
        return {
          ...state,
          nameChoice: state.nameChoice + 1
        };
      } else return {
        ...state, 
        nameChoice: 0 
      };

    default:
      return state;
  }
};