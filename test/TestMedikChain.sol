pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MedikChain.sol";

contract TestsMedikChain {

  function testItStoresAValue() public {
    Assert.equal(true, 1==2, "This test should fail because it is not implemented");
  }

}
