let EthLendStorage = artifacts.require("EthLendTestStorage");

module.exports = function(deployer) {
  deployer.deploy(EthLendStorage)//.then(() => new Promise(resolve => setTimeout(() => resolve(), 60000)))
};