import numpy as np

# calculate projected cash flows for the next 5 years
cash_flows = []
wacc = 0.10
## the company's free cash flow is expected to grow at indefinetly into the future

def getPerpetualGrowthRate(revenue_rates):
  avg_growth = np.mean(revenue_rates)
  ## plugged in value value based on assumptions
  ## 3% was the historical avg now its expected to be 2.5%
  long_term_gdp_growth_rate = 0.025
  long_term_inflation_rate = 0.02  
  perpetual_growth_rate = min(avg_growth, long_term_gdp_growth_rate)
  perpetual_growth_rate - max(perpetual_growth_rate, long_term_inflation_rate)
  ## maintaining real value cash flows must grow with the rate of inflation
  return perpetual_growth_rate

def getCashFlows():
  return 

def getWACC(market_cap, total_debt, mr = 0.08, rfr = 0.02,):
  risk_free_rate = rfr  # e.g., current yield on 10-year Treasury bond
  market_return = mr  # assumed market return
  beta = 1.2  # company's beta
  equity_market_premium = market_return - risk_free_rate

  interest_rate_on_debt = 0.04  # company's debt interest rate
  tax_rate = 0.21  # corporate tax rate

  market_value_equity = market_cap  # market cap
  market_value_debt = total_debt  # total debt

  # Cost of Equity
  cost_of_equity = risk_free_rate + beta * equity_market_premium

  # Cost of Debt
  cost_of_debt = interest_rate_on_debt * (1 - tax_rate)
  # WACC
  total_value = market_value_equity + market_value_debt
  wacc = (market_value_equity / total_value) * cost_of_equity + (market_value_debt / total_value) * cost_of_debt
  return wacc


def getPV(cash_flows,discount_rate):
  present_values = []
  for i in range(len(cash_flows)):
    pv = cash_flows[i] / ((1 + discount_rate) ** (i + 1))
    present_values.append(pv)
  return sum(present_values)

def get_intrinsic_value(market_cap, total_debt, cash_flows, discount_rate, revenue_rates):
 
  #WACC is often used as the discount rate.
  wacc = getWACC(market_cap, total_debt, mr = 0.08, rfr = 0.02,)
  perpetual_growth_rate = getPerpetualGrowthRate(revenue_rates)
  pv_of_cash_flows = getPV(cash_flows,discount_rate)

  last_projected_cash_flow = cash_flows[-1]
  terminal_value = last_projected_cash_flow * (1 + perpetual_growth_rate) / (wacc - perpetual_growth_rate)
  pv_of_terminal_value = terminal_value / ((1 + wacc) ** len(cash_flows))
  intrinsic_value = pv_of_cash_flows + pv_of_terminal_value
  return intrinsic_value




