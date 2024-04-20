// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "hardhat/console.sol";

enum DataLocation {
    ONCHAIN,
    ARWEAVE,
    IPFS,
    CUSTOM
}

struct Attestation {
    uint64 schemaId;
    uint64 linkedAttestationId;
    uint64 attestTimestamp;
    uint64 revokeTimestamp;
    address attester;
    uint64 validUntil;
    DataLocation dataLocation;
    bool revoked;
    bytes[] recipients;
    bytes data;
}

interface ISP {
    function getAttestation(uint64 attestationId) external view returns (Attestation memory);
}

contract DeleGateWallet {

    address public owner;    
    address public signProtocolAddress;
    uint64 schemaId;
    bool public isInitialized;

    function initialize(address _owner, address _signProtocolAddress, uint64 _schemaId) public {
        require(!isInitialized, "Already initialized");
        isInitialized = true;
        owner = _owner;      
        signProtocolAddress = _signProtocolAddress;
        schemaId = _schemaId;
    }

    function execute(address to, uint256 value, bytes calldata data, uint64 attestationId) public {
        Attestation memory attestation = ISP(signProtocolAddress).getAttestation(attestationId);
        require(attestation.attester == owner, "Attestation not from owner");
        require(attestation.schemaId == schemaId, "Schema ID mismatch");
        require(attestation.validUntil < block.timestamp, "Attestation expired");
        require(!attestation.revoked, "Attestation revoked");
        bool isRecipient = false;
        for (uint i = 0; i < attestation.recipients.length; i++) {
            if (convertReceipentToAddress(attestation.recipients[i]) == msg.sender) {
                isRecipient = true;
                break;
            }
        }
        require(isRecipient, "Not a recipient of attestation");
        (address wallet, bytes4 registeredFunctionSig) = convertDataToWalletAndFunction(attestation.data);
        // require(wallet == address(this), "Wallet address mismatch");
        bytes4 actualFunctionSig = getFunctionSigFromData(data);
        require(registeredFunctionSig == actualFunctionSig, "Function signature mismatch");
        (bool success, ) = to.call{value: value}(data);
        require(success, "Transaction failed");
    }
    
    function getFunctionSigFromData(bytes calldata data) public pure returns (bytes4) {
        return bytes4(data[:4]);
    }

    function getAttestation(uint64 attestationId) public view returns (Attestation memory) {
        Attestation memory attestation = ISP(signProtocolAddress).getAttestation(attestationId);
        address receipent = convertReceipentToAddress(attestation.recipients[0]);
        (address wallet, bytes4 functionSig) = convertDataToWalletAndFunction(attestation.data);
        console.log("debug in contract");
        console.log(receipent);
        console.log(wallet);
        console.logBytes4(functionSig);
        return attestation;
    }

    function convertDataToWalletAndFunction(bytes memory data) public pure returns (address, bytes4) {
        (address wallet, bytes memory functionSigBytes) = abi.decode(data, (address, bytes));
        bytes4 functionSig =  bytes4(functionSigBytes);
        return (wallet, functionSig);
    }

    function convertReceipentToAddress(bytes memory receipent) public pure returns (address) {
        return toAddress(abi.decode(receipent, (string)));
    }

    function toAddress(string memory s) public pure returns (address) {
        bytes memory _bytes = hexStringToAddress(s);
        require(_bytes.length >= 1 + 20, "toAddress_outOfBounds");
        address tempAddress;
        assembly {
            tempAddress := div(mload(add(add(_bytes, 0x20), 1)), 0x1000000000000000000000000)
        }
        return tempAddress;
    }

    function hexStringToAddress(string memory s) public pure returns (bytes memory) {
        bytes memory ss = bytes(s);
        require(ss.length%2 == 0); // length must be even
        bytes memory r = new bytes(ss.length/2);
        for (uint i=0; i<ss.length/2; ++i) {
            r[i] = bytes1(fromHexChar(uint8(ss[2*i])) * 16 +
                        fromHexChar(uint8(ss[2*i+1])));
        }
        return r;
    }

    function fromHexChar(uint8 c) public pure returns (uint8) {
        if (bytes1(c) >= bytes1('0') && bytes1(c) <= bytes1('9')) {
            return c - uint8(bytes1('0'));
        }
        if (bytes1(c) >= bytes1('a') && bytes1(c) <= bytes1('f')) {
            return 10 + c - uint8(bytes1('a'));
        }
        if (bytes1(c) >= bytes1('A') && bytes1(c) <= bytes1('F')) {
            return 10 + c - uint8(bytes1('A'));
        }
        return 0;
    }

}
