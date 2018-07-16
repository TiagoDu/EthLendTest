var EthLendTestStorage = artifacts.require("EthLendTestStorage");
var EthLendTestCore = artifacts.require("EthLendTestCore");

module.exports = function(deployer) {
	deployer.deploy(EthLendTestCore, EthLendTestStorage.address).then(() => {
    EthLendTestStorage.deployed().then(inst => {
		console.log('Address : ' + EthLendTestCore.address)
			return inst.allowAccess(EthLendTestCore.address);
		})
	})
};