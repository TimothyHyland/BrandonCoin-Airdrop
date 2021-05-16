const BrandonCoin = artifacts.require('../contracts/BrandonCoin.sol');
const Airdrop = artifacts.require('../contracts/Airdrop.sol');

module.exports = async function (deployer) {
  const token = await BrandonCoin.deployed();
  await deployer.deploy(Airdrop, token.address);
  const airdrop = await Airdrop.deployed();
  await token.transfer(airdrop.address, web3.utils.toWei('10000'));
};
