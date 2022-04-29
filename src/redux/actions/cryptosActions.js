import { ActionTypes } from "./action-types";

export const setCoins = (coins) => {
  return {
    type: ActionTypes.COINS,
    payload: coins,
  };
};

//currency
export const setCurrency = (currency) => {
  return {
    type: ActionTypes.CURRENCY,
    payload: currency,
  };
};

//days
export const setDays = (days) => {
  return {
    type: ActionTypes.DAYS,
    payload: days,
  };
};

export const setTrending = (trending) => {
  return {
    type: ActionTypes.TRENDING,
    payload: trending,
  };
};

export const setSingleCoin = (coin) => {
  return {
    type: ActionTypes.SINGLE_COIN,
    payload: coin,
  };
};
