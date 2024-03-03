import orm
import sys
import os
# print(sys.path)
from orm import AlpacaAPI
from datetime import datetime
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.examples import Momentum
from lumibot.brokers import Alpaca
from lumibot.strategies.strategy import Strategy
from lumibot.traders import Trader

from lumibot import Strategy
from lumibot.brokers import Alpaca
from lumibot.data import AlpacaData
from lumibot.traders import LiveTrader
from talib import RSI, SMA
import numpy as np


alpaca = AlpacaAPI()
ALPACA_CONFIG = {
    "API_KEY": alpaca.api_key,
    "API_SECRET": alpaca.secret_key,
    "ENDPOINT": alpaca.base_url
}


# ## macd strategy
# ## buy trending sectors


# # class MyStrategy(Strategy):
# #     def on_trading_iteration(self):
# #         if self.first_iteration:
# #             aapl_price = self.get_last_price("AAPL")
# #             quantity = self.portfolio_value // aapl_price
# #             order = self.create_order("AAPL", quantity, "buy")
# #             self.submit_order(order)


class MACDStrategy(Strategy):
    def initialize(self):
        self.symbol = 'AAPL'  # Example stock
        self.macd_fast = 12
        self.macd_slow = 26
        self.macd_signal = 9

    def on_market_data(self, data):
        # Implement MACD logic here
      pass


# # # Setup and run the strategy
# # trader = Trader()
# # broker = Alpaca(ALPACA_CONFIG)
# # print("broker",broker)
# # strategy = MyStrategy(broker=broker)
# # trader.add_strategy(strategy)
# # trader.run_all()

class MeanReversionStrategy(Strategy):
    def initialize(self):
        self.spy = "SPY"
        self.tqqq = "TQQQ"
        self.uvxy = "UVXY"
        self.spy_ma_period = 200
        self.tqqq_rsi_period = 10
        self.rsi_threshold = 79

    def on_market_data(self, data):
        # Fetch historical prices
        spy_prices = data.get_price_history(self.spy, window=self.spy_ma_period)
        tqqq_prices = data.get_price_history(self.tqqq, window=self.tqqq_rsi_period)

        # Calculate SPY's 200-day SMA
        spy_sma = SMA(spy_prices['close'], timeperiod=self.spy_ma_period)[-1]

        # Calculate TQQQ's 10-day RSI
        tqqq_rsi = RSI(tqqq_prices['close'], timeperiod=self.tqqq_rsi_period)[-1]

        # Decision Tree Logic
        if spy_prices['close'][-1] > spy_sma:
            if tqqq_rsi > self.rsi_threshold:
                self.place_order(self.uvxy, quantity=1, order_type='market', direction='buy')
            else:
                self.place_order(self.tqqq, quantity=1, order_type='market', direction='buy')
        else:
            if tqqq_rsi > self.rsi_threshold:
                self.place_order(self.spy, quantity=1, order_type='market', direction='buy')
            else:
                self.place_order(self.tqqq, quantity=1, order_type='market', direction='buy')

# Setup for live trading (or backtesting)
broker = Alpaca(...)
data_source = AlpacaData(broker)
strategy = MeanReversionStrategy()
trader = LiveTrader(broker, data_source)
trader.add_strategy(strategy)

# Running live trading (or backtesting)
trader.run()
