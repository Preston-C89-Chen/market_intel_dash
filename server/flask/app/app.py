from flask import Flask
from data import *
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/')
def hello_world():
  print('Hello, World!')
  return 'Hello, World!'

@app.route('/financial_statement/{ticker}')
def financial_statement(ticker):
  print(ticker)
  
  return 

if __name__ == '__main__':
  app.run(port=8080,debug=True)
