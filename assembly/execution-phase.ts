import {
  Bytes,
  Console,
  Process,
  httpFetch,
} from "@seda-protocol/as-sdk/assembly";

class NewsFeedResponse {
  message!: string;
}

export function executionPhase(): void {

  const coin = Process.getInputs().toUtf8String();
  Console.log(`Fetching sentiments for coin: ${coin}`);
  const response = httpFetch(
    `https://chain.dogukangun.de/get_news/${coin}`
  );

  if (!response.ok) {
    Console.error(
      `HTTP Response was rejected: ${response.status.toString()} - ${response.bytes.toUtf8String()}`
    );
    Process.error(Bytes.fromUtf8String("Error while fetching price feed"));
  }

  const data = response.bytes.toJSON<NewsFeedResponse>();
  Process.success(Bytes.fromNumber(Number(data.message)));
}
