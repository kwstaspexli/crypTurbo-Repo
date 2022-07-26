import { ActionTypes } from "../actions/action-types";
const intialState = {
  coins: [],
  currency: {label:"EURO", value:"eur", symbol:"€"},
  days: "1",
  trending: [],
  coin_categories: []
};

export const coinsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.COINS:
      return { ...state, coins: payload };
    default:
      return state;
  }
};

// currency
export const currencyReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CURRENCY:
      return { ...state, currency: payload };
    default:
      return state;
  }
};

//days
export const daysReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.DAYS:
      return { ...state, days: payload };
    default:
      return state;
  }
};

export const trendingReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.TRENDING:
      return { ...state, trending: payload };
    default:
      return state;
  }
};

export const singleCoinReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SINGLE_COIN:
      return { ...state, ...payload };
    // case ActionTypes.REMOVE_SELECTED_CRYPTO:
    //   return {};
    default:
      return state;
  }
};

export const singleCoinTickersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SINGLE_COIN_TICKERS:
      return { ...state, ...payload };
    // case ActionTypes.REMOVE_SELECTED_CRYPTO:
    //   return {};
    default:
      return state;
  }
};

export const singleCoinCategoriesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SINGLE_COIN_CATEGORIES:
      return { ...state, coin_categories: payload };
    default:
      return state;
  }
};
