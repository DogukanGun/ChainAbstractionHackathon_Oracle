import { Tally, Process, Bytes, u128 } from "@seda-protocol/as-sdk/assembly";

export function tallyPhase(): void {

  const reveals = Tally.getReveals();
  let totalPoint:u128 = u128.Zero;

  // Iterate over each reveal, parse its content as an unsigned integer (u64), and store it in the prices array.
  for (let i = 0; i < reveals.length; i++) {
    const point:u128 = reveals[i].reveal.toU128();
    totalPoint = u128.add(totalPoint,point);
  }
  totalPoint = u128.div(totalPoint,u128.fromString(reveals.length.toString()))
  Process.success(Bytes.fromNumber<u128>(totalPoint, true));
}
