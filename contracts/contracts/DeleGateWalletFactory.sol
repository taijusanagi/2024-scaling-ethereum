// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./DeleGateWallet.sol";


contract DeleGateWalletFactory {

    address public implementation;    

    constructor(address _implementation) {
        implementation = _implementation;
    }

    function createDelegateWallet(address _owner, address _signProtocolAddress, uint64 _schemaId, bytes32 salt) public returns (address) {
        address clone = Clones.cloneDeterministic(implementation, salt);
        DeleGateWallet(clone).initialize(_owner, _signProtocolAddress, _schemaId);
        return clone;
    }

    function predictDeterministicAddress(bytes32 salt) public view returns (address) {
        return Clones.predictDeterministicAddress(implementation, salt);
    }

}
