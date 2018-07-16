import Web3 from 'web3'
import TruffleContract from 'truffle-contract'

/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

let get_web3 = new Promise(function (resolve, reject) {
  // Check for injected web3 (mist/metamask)
  let web3js = window.web3
  if (typeof web3js !== 'undefined') {
    let web3 = new Web3(web3js.currentProvider)
    resolve({
      web3() {
        return web3
      }
    })
  } else {
    // GANACHE FALLBACK
    //console.log('Ganache fallback')
    //let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

    //reject(new Error('Unable to connect to Metamask'))
  }
}).then(result => {
  return new Promise(function (resolve, reject) {
    let provider = result.web3().currentProvider
    result = Object.assign({}, result, {provider})
    result.web3().eth.net.isListening()
    .then(() => {
      console.log("connected")
      let injectedWeb3 = true
      result = Object.assign({}, result, {injectedWeb3})
      resolve(result)
    })
    .catch(e => reject(new Error('Not connected to node : ' + e)))
  })
}).then(result => {
  return new Promise(function (resolve, reject) {
    // Retrieve network ID
    console.log('Trying to retrieve network id')
    result.web3().eth.net.getId((err, networkId) => {
      if (err) {
        // If we can't find a networkId keep result the same and reject the promise
        reject(new Error('Unable to retrieve network ID'))
        console.log('Unable to retrieve network ID')
      } else {
        // Assign the networkId property to our result and resolve promise
        console.log('Network id : ' + networkId)
        result = Object.assign({}, result, {networkId})
        resolve(result)
      }
    })
  })
})
.then(result => {
  return new Promise(function (resolve, reject) {
    // Retrieve coinbase
    result.web3().eth.getCoinbase((err, coinbase) => {
      if (err) {
        reject(new Error('Unable to retrieve coinbase'))
      } else {
        result = Object.assign({}, result, {coinbase})
        resolve(result)
      }
    })
  })
})
.then(result => {
  return new Promise(function (resolve, reject) {
    // Retrieve balance for Coinbase
    result.web3().eth.getBalance(result.coinbase, (err, balance) => {
      if (err) {
        reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
      } else {
        result = Object.assign({}, result, {balance})
        resolve(result)
      }
    })
  })
})

export default get_web3
