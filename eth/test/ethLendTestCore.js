const EthLendTestCore = artifacts.require('./EthLendTestCore.sol')
const assert = require('assert')
const { should } = require('./helpers')

let contractInstance

contract('EthLendTestCore', ([creator, upvoter]) => {
  beforeEach(async () => {
    contractInstance = await EthLendTestCore.deployed()
  })
  
  it('should add a new review', async () => {
    await contractInstance.createReview('Title', 'Author', 'Content', { from: creator })
    const nbReviews = await contractInstance.getNbReviews()
    
    assert.equal(nbReviews, 1, 'The review was not created successfully')
  })
  
  it('should upvote a review without tip', async () => {
    await contractInstance.createReview('Title', 'Author', 'Content', { from: creator })
    
    await contractInstance.upvoteReview('0', {from: upvoter})
    let review = await contractInstance.getReview('0')
    
    assert.equal(review[4].toNumber(), 1, 'The review was not upvoted successfully')
  })
  
  it('should upvote a review with tip', async () => {
    await contractInstance.createReview('Title', 'Author', 'Content', { from: creator })
    const creatorBalanceBeforeTip = web3.eth.getBalance(creator).toNumber()
    let tip = 10
    
    await contractInstance.upvoteReview('0', {from: upvoter, value: tip * 1e+18})
    
    web3.eth.getBalance(creator).should.be.bignumber.above(creatorBalanceBeforeTip)
  })
})