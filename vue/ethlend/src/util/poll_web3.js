import Web3 from 'web3'
import web3_module from '../store/modules/web3_module'
import store from '../store/store'
import Namespace from '../util/constants/namespace'

let pollWeb3 = function (state) {
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)

  setInterval(() => {
    if (web3 && web3_module.state.web3.web3Instance) {
      web3.eth.getCoinbase().then(coinbase => {
        if (coinbase !== web3_module.state.web3.coinbase) {
          let newCoinbase = coinbase
          web3.eth.getBalance(coinbase).then(newBalance => {
            store.dispatch(Namespace.POLL_WEB_3, {
              coinbase: newCoinbase,
              balance: parseInt(newBalance, 10)
            })
          }).catch(reason => {
            console.log(reason)
          })
        } else {
          web3.eth.getBalance(web3_module.state.web3.coinbase).then(polledBalance => {
            if (parseInt(polledBalance, 10) !== web3_module.state.web3.balance) {
              store.dispatch(Namespace.POLL_WEB_3, {
                coinbase: web3_module.state.web3.coinbase,
                balance: polledBalance
              })
            }
          }).catch(reason => {
            console.log(reason)
          })
        }
      }).catch(reason => console.log(reason))
    }
  }, 500)
}

export default pollWeb3
