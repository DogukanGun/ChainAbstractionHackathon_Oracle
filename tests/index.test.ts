import { afterEach, describe, it, expect, mock } from "bun:test";
import { file } from "bun";
import { testOracleProgramTally } from "@seda-protocol/dev-tools"
import { BigNumber } from 'bignumber.js'

const WASM_PATH = "build/debug.wasm";

const fetchMock = mock();

afterEach(() => {
  fetchMock.mockRestore();
});

describe("data request execution", () => {
  it('should tally all results in a single data point', async () => {
    const oracleProgram = await file(WASM_PATH).arrayBuffer();

    // Result from the execution test
    let buffer = Buffer.from([0, 33, 43, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const vmResult = await testOracleProgramTally(Buffer.from(oracleProgram), Buffer.from('tally-inputs'), [{
      exitCode: 0,
      gasUsed: 0,
      inConsensus: true,
      result: buffer,
    }]);

    expect(vmResult.exitCode).toBe(0);
    const hex = Buffer.from(vmResult.result!).toString('hex');
    const result = BigNumber(`0x${hex}`);
    expect(result).toEqual(BigNumber('2452300032'));
  });
});
