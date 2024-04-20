// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

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

    function execute(address to, uint256 value, bytes memory data, uint64 attestationId) public {
        Attestation memory attestation = ISP(signProtocolAddress).getAttestation(attestationId);
        require(attestation.attester == owner, "Attestation not from owner");
        require(attestation.validUntil < block.timestamp, "Attestation expired");
        require(!attestation.revoked, "Attestation revoked");
        bool isRecipient = false;
        for (uint i = 0; i < attestation.recipients.length; i++) {
            if (address(uint160(bytes20(attestation.recipients[i]))) == msg.sender) {
                isRecipient = true;
                break;
            }
        }
        require(isRecipient, "Not a recipient of attestation");
        bytes4 functionSingatureInData = abi.decode(data, (bytes4));
        bytes4 functionSignatureInAttestation = abi.decode(attestation.data, (bytes4));
        require(functionSingatureInData == functionSignatureInAttestation, "Function signature mismatch");
        (bool success, ) = to.call{value: value}(data);
        require(success, "Transaction failed");
    }

}
