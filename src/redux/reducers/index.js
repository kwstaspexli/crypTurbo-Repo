import { combineReducers } from "redux";
import { coinsReducer, singleCoinReducer, currencyReducer, trendingReducer, daysReducer } from "./cryptosReducer";
const reducers = combineReducers({
  coins: coinsReducer,
  coin: singleCoinReducer,
  currency: currencyReducer,
  days: daysReducer,
  trending: trendingReducer
});
export default reducers;
