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
        bytes32 _salt = keccak256(abi.encodePacked(_owner, salt));
        address clone = Clones.cloneDeterministic(implementation, _salt);
        DeleGateWallet(clone).initialize(_owner, _signProtocolAddress, _schemaId);
        return clone;
    }

    function predictDeterministicAddress(address _owner, bytes32 salt) public view returns (address) {
        bytes32 _salt = keccak256(abi.encodePacked(_owner, salt));
        return Clones.predictDeterministicAddress(implementation, _salt);
    }

}
