export const Coins = (currency) =>
    // coins order by market_cap_desc, (24h,7d), currency given dynamically from my page
    // i will save my default currency on my views or at my store (redux)
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
    // data from coins/markets 
    // order -> gecko_desc
    // items -> per_page=10
    // item includes -> price_change_percentage=24h
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;


    // "bid_ask_spread_percentage" IS DIFFERENT IN EVERY MARKET
    // RETURN THE MARKETS WITH THE LOWEST "bid_ask_spread_percentage"
    //  MongoDb data aggregation or mySql database

    // Explained: What Is The Bid-Ask Spread and Slippage?
 // https://learn.bybit.com/trading/what-is-bid-ask-spread-and-slippage/
 // https://academy.binance.com/en/articles/bid-ask-spread-and-slippage-explained