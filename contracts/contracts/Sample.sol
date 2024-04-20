// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Sample {
    event Executed();

    function execute() public {
        emit Executed();
    }
}
