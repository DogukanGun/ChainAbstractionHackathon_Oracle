import {
  Bytes,
  Console,
  Process,
  httpFetch,
} from "@seda-protocol/as-sdk/assembly";
class NewsFeedResponse {
  message!: number;
}

export function executionPhase(): void {

  const coin = Process.getInputs().toUtf8String();
  Console.log(`Fetching sentiments for coin: ${coin}`);
  const response = httpFetch(
    `https://news.dogukangun.de/news/sentiment/${coin}`
  );

  if (!response.ok) {
    Console.error(
      `HTTP Response was rejected: ${response.status.toString()} - ${response.bytes.toUtf8String()}`
    );
    Process.error(Bytes.fromUtf8String("Error while fetching price feed"));
  }

  const data = response.bytes.toJSON<NewsFeedResponse>();
  Process.success(Bytes.fromNumber(data.message));
}
