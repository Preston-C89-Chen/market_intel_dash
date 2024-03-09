const URL = 'https://live.tradovateapi.com/v1'

class TradovateApi {
  constructor() {
    if (TradovateApi.instance) {
      return TradovateApi.instance;
    }
    TradovateApi.instance = this;
  }
}

const credentials = {
    name:       "Your credentials here",
    password:   "Your credentials here",
    appId:      "Sample App",
    appVersion: "1.0",
    cid:        0,
    sec:        "Your API secret here"
}

async function getAccessToken() {
  let response = await fetch(URL + '/auth/accessTokenRequest', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  let result = await response.json()
  return result // { accessToken, mdAccessToken, userId, ... }
}

//...

async function main() {
  const { accessToken, mdAccessToken, userId } = await getAccessToken()

  //use access token
}


async function getAccounts() {
  let response = await fetch(URL + '/account/list', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}` //Access Token use in HTTP requests
      }
  })
  let result = await response.json()
  return result
}

const oso = {
  action: 'Sell',
  orderType: 'Limit',
  price: 4200.00,
}

const initial = {
  accountSpec: yourUserName,
  accountId: yourAcctId,
  action: "Buy",
  symbol: "MESM1",
  orderQty: 1,
  orderType: "Limit",
  price: 4150.00,
  isAutomated: true, //must be true if this isn't an order made directly by a human,
  bracket1: oso
}

const response = await fetch(URL + '/order/placeOSO', {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${myAccessToken}`,
  },
  body: JSON.stringify(initial)
})

const createBracketOrder = 