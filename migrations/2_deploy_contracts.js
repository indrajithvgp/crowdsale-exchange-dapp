let MyToken = artifacts.require("./MyToken.sol");
let MyTokensale = artifacts.require("./MyTokensale.sol");

module.exports = async function(deployer) {
  let address = web3.eth.getAccounts()
  await deployer.deploy(MyToken, 100);
  await deployer.deploy(MyTokensale, 1, address[0], MyToken.address);
  let instance = await MyToken.deployed()
  await instance.transfer(MyTokensale, 100)

};
