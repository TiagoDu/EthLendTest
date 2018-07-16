import web3 from '../../util/get_web3';
import pollWeb3 from '../../util/poll_web3'
import ethLendContracts from '../../util/ethlend_contracts'
import Namespace from '../../util/constants/namespace'
import util from 'util'

const state = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    currentProvider: null,
    error: null
  },
  contracts: {},
  reviews: []
};

const actions = {
  [Namespace.REGISTER_WEB_3]: ({commit}) => {
    console.log(Namespace.REGISTER_WEB_3 + ' action being executed')
    web3.then(result => {
      console.log('committing result to ' + Namespace.REGISTER_WEB_3_INSTANCE + ' mutation')
      commit(Namespace.REGISTER_WEB_3_INSTANCE, result)
      ethLendContracts.initEthLendContract().then(instance => {
        commit(Namespace.REGISTER_ETH_LEND_CONTRACT_INSTANCE, instance)
        getReviews()
      }).catch(e => {
        console.error('Error instantiating contract : ' + e)
      })
    }).catch(e => {
      console.log('error in action registerWeb3', e)
    })
  },
  [Namespace.POLL_WEB_3]: ({commit}, payload) => {
    console.log(Namespace.POLL_WEB_3 + ' action being executed')
    commit(Namespace.POLL_WEB_3_INSTANCE, payload)
  },
  [Namespace.SUBMIT_REVIEW]: ({commit}, payload) => {
    console.log(Namespace.SUBMIT_REVIEW + ' action being executed')
    ethLendContracts.submitReview(state.web3.coinbase, payload).then(value => {
      setTimeout(function() {
        getReviews()
      }, 2000)
    }).catch(e => {
      console.error('Error submitting review: ' + e)
    })
  },
  [Namespace.UPVOTE_REVIEW]: ({commit}, payload) => {
    console.log(Namespace.UPVOTE_REVIEW + ' action being executed')
    ethLendContracts.upvoteReview(state.web3.coinbase, state.web3.web3Instance(), payload).then(value => {
      console.log('Review upvoted : ', value)
    }).catch(e => {
      console.error('Error submitting review: ' + e)
    })
  }
};

const mutations = {
  [Namespace.POLL_WEB_3_INSTANCE]: (state, payload) => {
    console.log([Namespace.POLL_WEB_3] + ' mutation being executed', payload)
    state.web3.coinbase = payload.coinbase
    state.web3.balance = parseInt(payload.balance, 10)
  },
  [Namespace.REGISTER_WEB_3_INSTANCE]: (state, payload) => {
    console.log(Namespace.REGISTER_WEB_3_INSTANCE + ' mutation being executed', payload)
    let result = payload
    let web3Copy = state.web3
    web3Copy.coinbase = result.coinbase
    web3Copy.networkId = result.networkId
    web3Copy.balance = parseInt(result.balance, 10)
    web3Copy.isInjected = result.injectedWeb3
    web3Copy.web3Instance = result.web3
    web3Copy.currentProvider = result.provider
    state.web3 = web3Copy
    pollWeb3()
  },
  [Namespace.REGISTER_ETH_LEND_CONTRACT_INSTANCE]: (state, payload) => {
    console.log(Namespace.REGISTER_ETH_LEND_CONTRACT_INSTANCE + ' mutation being executed', payload)
    state.contracts.EthLend = payload
    state.contracts.EthLend.setProvider(state.web3.currentProvider);
  }
};

const getters = {
  web3: state => {
    return state.web3
  },
  reviews: state => {
    return state.reviews
  }
};

function getReviews() {
  ethLendContracts.getReviews().then(reviews => {
    console.log(util.inspect(reviews))
    state.reviews = []
    for (let i = 0; i < reviews.length; i++) {
      let review = {}
      review.id = reviews[i][0].toNumber()
      review.title = reviews[i][1]
      review.author = reviews[i][2]
      review.content = reviews[i][3]
      review.upvotes = reviews[i][4].toNumber()
      state.reviews.push(review)
    }
  }).catch(e => {
    console.error('Error submitting review: ' + e)
  })
}

export default {
  state,
  mutations,
  actions,
  getters
};
