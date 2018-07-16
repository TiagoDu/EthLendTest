require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3();
const WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');

let privateKey = new Buffer(process.env["PRIVATE_KEY"], "hex")
let wallet = Wallet.fromPrivateKey(privateKey);
let apiKey = "YOUR_INFURA_API_KEY_HERE"
let ropstenProvider = new WalletProvider(wallet, "https://ropsten.infura.io/apiKey");
let kovanProvider = new WalletProvider(wallet, "https://kovan.infura.io/apiKey");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    kovan: {
      provider: kovanProvider,
      gas: 4600000,
      gasPrice: web3.utils.toWei("2", "gwei"),
      network_id: "42"
    },
    ropsten: {
      provider: ropstenProvider,
      gas: 4600000,
      gasPrice: web3.utils.toWei("2", "gwei"),
      network_id: "3"
    }
  }
};