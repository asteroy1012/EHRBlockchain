var EHR = artifacts.require("./Ehr.sol");

module.exports = function (deployer) {
  deployer.deploy(EHR);
};