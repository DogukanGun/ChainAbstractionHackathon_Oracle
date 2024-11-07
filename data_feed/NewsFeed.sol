// SPDX-License-Identifier: MIT

pragma solidity 0.8.25;

import "@seda-protocol/contracts/src/SedaProver.sol";


contract NewsFeed {
    bytes32 public dataRequestId;
    bytes32 public oracleProgramId;
    SedaProver public sedaProverContract;

    constructor(address _sedaProverContract, bytes32 _oracleProgramId) {
        sedaProverContract = SedaProver(_sedaProverContract);
        oracleProgramId = _oracleProgramId;
    }

    function transmit(string news_title) public returns (bytes32) {
        SedaDataTypes.DataRequestInputs memory inputs = SedaDataTypes
            .DataRequestInputs(
                oracleProgramId,                // Oracle Program ID (0x...)
                news_title,                     // Inputs for the data request (ETH-USDC)
                oracleProgramId,                // Tally binary ID (same as DR binary ID in this example)
                hex"00",                        // Tally inputs
                1,                              // Replication factor (number of nodes required to execute the DR)
                hex"00",                        // Consensus filter (set to `None`)
                1,                              // Gas price
                5000000,                        // Gas limit
                abi.encodePacked(block.number)  // Additional info (block number as memo)
            );

        dataRequestId = sedaProverContract.postDataRequest(inputs);

        return dataRequestId;
    }

    function latestAnswer() public view returns (uint128) {
        require(dataRequestId != bytes32(0), "No data request transmitted");

        SedaDataTypes.DataResult memory dataResult = sedaProverContract
            .getDataResult(dataRequestId);

        if (dataResult.consensus) {
            return uint128(bytes16(dataResult.result));
        }

        return 0;
    }
}