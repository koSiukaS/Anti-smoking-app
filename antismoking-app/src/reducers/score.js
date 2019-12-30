const initialState = {
  rewardForSmoking: 2500,
  rewardForHealthy: 250,
  multiplierReward: 1,
  multiplierPenalty: 1,
  totalScore: 0,
};

export default scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_SCORE_SMOKING':
      return { 
        ...state,
        totalScore: state.totalScore + state.multiplierReward * state.rewardForSmoking
      };

    case 'INCREASE_SCORE_SPECIAL':
      return { 
        ...state,
        totalScore: state.totalScore + state.multiplierReward * action.customAmount
      };

    case 'SET_SCORE':
      return { 
        ...state,
        totalScore: action.customScoreAmount
      };

    case 'CLEAR_SCORE':
      return { 
        ...state,
        totalScore: 0
      };
    
    case 'INCREASE_MULTIPLIER_PENALTY':
      return { 
        ...state,
        multiplierReward: state.multiplierReward + 1
      };

    case 'RESET_MULTIPLIER_PENALTY':
      return { 
        ...state,
        multiplierReward: 1 
      };

    default:
      return state;
  }
};
