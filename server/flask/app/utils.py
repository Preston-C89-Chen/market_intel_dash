def calc_earnings_yield(stock_data):
    ## Earnings Yield = EBIT / Enterprise Value
    return stock_data.get("ebit",0) / stock_data.get("ev",0)

def calc_roic(stock_data):
    ## Return on Invested Capital = NOPAT / Invested Capital
    capital_invested = stock_data.get("net_working_capital",0) + stock_data.get("net_fixed_assets",0)
    if capital_invested > 0:
        return stock_data.get("ebit",0) / capital_invested
    return 0

def calculate_magic_formula_rank(stock_data):
    ey = calc_earnings_yield(stock_data)
    roc = calc_roic(stock_data)
    return ey * roc
