var MedikChain = artifacts.require("./MedikChain.sol");

module.exports = function(deployer) {
  deployer.deploy(MedikChain);
};
