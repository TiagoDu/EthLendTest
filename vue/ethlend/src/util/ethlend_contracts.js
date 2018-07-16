import TruffleContract from 'truffle-contract'
import data from '../contracts/EthLendTestCore'
import store from '../store/store'

function getEthLendInstance() {
  let ethLend = store.state.web3_module.contracts.EthLend
  return ethLend.deployed()
}

let module = {
  initEthLendContract: function () {
    return new Promise(function (resolve, reject) {
      let EthLendContract = data;
      resolve(TruffleContract(EthLendContract));
    })
  },
  submitReview: function (account, payload) {
    return getEthLendInstance().then(function (instance) {
      return instance.createReview(payload.title, payload.content, payload.author, {from: account}).catch(function (err) {
        console.log(err.message)
      })
    })
  },
  upvoteReview: function (account, web3, payload) {
    return getEthLendInstance().then(function (instance) {
      let web3Payload = {}
      
      if (payload.tip !== undefined) {
        web3Payload.value = web3.utils.toWei(payload.tip.toString(), "ether")
      }
      
      web3Payload.from = account
      
      return instance.upvoteReview(payload.id.toString(), web3Payload).catch(function (err) {
        console.log(err.message)
      })
    })
  },
  getReviews: function () {
    return getEthLendInstance().then(function (instance) {
      return instance.getNbReviews().then(function (countReviews) {
        let promises = []
        if (countReviews > 0) {
          for (let i = 0; i < countReviews.toNumber(); i++) {
            promises.push(instance.getReview.call(i))
          }
      
          return Promise.all(promises)
        } else {
          console.log('No reviews')
          return countReviews;
        }
      }).catch(function (err) {
        console.log(err.message)
      })
    })
  }
}

export default module
