import { Tally, Process, Bytes, u128, Console } from "@seda-protocol/as-sdk/assembly";

export function tallyPhase(): void {

  const reveals = Tally.getReveals();
  const points: u128[] = [];

  // Iterate over each reveal, parse its content as an unsigned integer (u64), and store it in the prices array.
  for (let i = 0; i < reveals.length; i++) {
    const point = reveals[i].reveal.toU128();
    points.push(point);
  }

  if (points.length > 0) {
    const finalPoint = median(points);

    Process.success(Bytes.fromNumber<u128>(finalPoint, true));
  } else {
    Process.error(Bytes.fromUtf8String("No consensus among revealed results"));
  }
}

/**
 * Function to calculate the median of an array of unsigned integers.
 * @param numbers - Array of u64 numbers
 * @returns The median value
 */
function median(numbers: u128[]): u128 {
  const sorted: u128[] = numbers.sort();
  const middle = (Math.floor(sorted.length / 2));

  if (sorted.length % 2 === 0) {
    return u128.div(u128.add(sorted[middle - 1], sorted[middle]), u128.from(2));
  }

  return sorted[middle];
}
