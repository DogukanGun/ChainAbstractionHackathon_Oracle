import { executionPhase } from "./execution-phase";
import { tallyPhase } from "./tally-phase";
import { OracleProgram } from "@seda-protocol/as-sdk/assembly";


class NewsFeed extends OracleProgram {
  execution(): void {
    executionPhase();
  }

  tally(): void {
    tallyPhase();
  }
}

// Runs the price feed oracle program by executing both phases.
new NewsFeed().run();
