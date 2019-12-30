// smoke
export const increaseSmokeCount = () => ({
  type: 'INCREASE_SMOKE_COUNT'
});

export const clearSmokeCount = () => ({
  type: 'CLEAR_SMOKE_COUNT'
});

export const setSmokeCount = (customSmokeAmount) => ({
  type: 'SET_SMOKE_COUNT',
  customSmokeAmount
});

export const changeUserName = () => ({
  type: 'CHANGE_USER_NAME'
});

// score
export const increaseScoreSmoking = () => ({
  type: 'INCREASE_SCORE_SMOKING'
});

export const increaseScoreSpecial = (customAmount) => ({
  type: 'INCREASE_SCORE_SPECIAL',
  customAmount
});

export const setScore = (customScoreAmount) => ({
  type: 'SET_SCORE',
  customScoreAmount
});

export const clearScore = () => ({
  type: 'CLEAR_SCORE'
});

export const increasemultiplierReward = () => ({
  type: 'INCREASE_MULTIPLIER_PENALTY'
});

export const resetmultiplierReward = () => ({
  type: 'RESET_MULTIPLIER_PENALTY'
});
