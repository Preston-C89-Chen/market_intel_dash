const Alpaca = require('@alpacahq/alpaca-trade-api');

const alpaca = new Alpaca({
  keyId: 'YOUR_API_KEY',
  secretKey: 'YOUR_API_SECRET',
  paper: true, // Set to false if you're using a live account
});

// Example function to handle a trade
async function handleTrade(signal) {
  try {
    const order = await alpaca.createOrder({
      symbol: signal.symbol, // e.g., 'AAPL'
      qty: signal.qty,
      side: signal.side, // 'buy' or 'sell'
      type: 'market',
      time_in_force: 'day',
    });
    console.log('Order successfully placed:', order);
  } catch (error) {
    console.error('Order placement failed:', error.message);
  }
}