const initialState = {
  smokeCount: 0,
  cigarettePrice: 0.2
};

export default smokeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_SMOKE_COUNT':
      return { 
        ...state,
        smokeCount: state.smokeCount + 1
      };

    case 'CLEAR_SMOKE_COUNT':
      return {
        ...state, 
        smokeCount: 0
      };

    case 'SET_SMOKE_COUNT':
       return {
        ...state, 
        smokeCount: action.customSmokeAmount
      };

    default:
      return state;
  }
};
