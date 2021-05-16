const BrandonCoin = artifacts.require('../contracts/BrandonCoin.sol');

module.exports = function (deployer) {
  deployer.deploy(BrandonCoin);
};
