import set_env
from utils import calc_earnings_yield, calc_roic,calculate_magic_formula_rank

financial_data = {
    "AAPL": {"ebit": 75000000000, "ev": 2000000000000, "net_working_capital": 10000000000, "net_fixed_assets": 50000000000},
    "GOOGL": {"ebit": 35000000000, "ev": 1500000000000, "net_working_capital": 9000000000, "net_fixed_assets": 80000000000},
}

def test_calc_earnings_yield():
  result = calc_earnings_yield(financial_data["AAPL"])
  assert result == 0.0375
  return result

def test_calc_roic():
  result = calc_roic(financial_data["AAPL"])
  assert result == 1.25
  return result

def test_magic_formula():
  result = calculate_magic_formula_rank(financial_data["AAPL"])
  assert result == 0.046875
  return False