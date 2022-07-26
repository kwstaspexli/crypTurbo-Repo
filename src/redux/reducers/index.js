import { combineReducers } from "redux";
import { 
  coinsReducer, 
  singleCoinReducer, 
  currencyReducer, 
  trendingReducer, 
  daysReducer, 
  singleCoinTickersReducer, 
  singleCoinCategoriesReducer 
} from "./cryptosReducer";


const reducers = combineReducers({
  coins: coinsReducer,
  coin: singleCoinReducer,
  coin_tickers: singleCoinTickersReducer,
  coin_categories: singleCoinCategoriesReducer,
  currency: currencyReducer,
  days: daysReducer,
  trending: trendingReducer,
});
export default reducers;
