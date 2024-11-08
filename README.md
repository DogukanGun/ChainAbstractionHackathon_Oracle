
# ChainAbstractionHackathon_Oracle

## WEB UI

### HOME PAGE
<img width="1505" alt="Screenshot 2024-11-09 at 00 24 06" src="https://github.com/user-attachments/assets/96eb3959-d061-4a9f-a461-919860b0ac24">

### SEARCH NEWS

<img width="1444" alt="Screenshot 2024-11-09 at 00 24 30" src="https://github.com/user-attachments/assets/f9b00660-a8d4-4e5c-80ca-e83a761e91e6">

### GET SCORE
<img width="1356" alt="Screenshot 2024-11-09 at 00 25 41" src="https://github.com/user-attachments/assets/27481baf-1258-4916-a2b8-be54861a6af6">

## Overview

**ChainAbstractionHackathon_Oracle** is a project designed to bring news sentiment analysis to on-chain trading systems. By leveraging real-time news sentiment, it enables smarter and more responsive trade bot operations, addressing a gap in traditional on-chain bots that lack external data access.

This project was built during a hackathon to showcase how decentralized oracles can bridge off-chain data with blockchain applications, using a sentiment analysis model to interpret news data and relay it to the oracle.

## Problem Statement

On-chain trade bots operate in an isolated environment without direct access to external events, including news. Typically, these bots require user interaction to respond to sudden market changes following news events. This limitation can hinder bots' effectiveness and timeliness in volatile markets.

## Solution

This project introduces an API-driven solution that:
1. Scrapes news based on specified currencies.
2. Conducts sentiment analysis using an LLM (Large Language Model) for natural language processing.
3. Transmits the analyzed sentiment score to a decentralized oracle (SEDA oracle), enabling on-chain systems to react autonomously to market-relevant news sentiment.

## How It Works

1. **News Collection**: The API fetches news articles relevant to specific cryptocurrencies or financial assets.
2. **Sentiment Analysis**: A sentiment analysis model processes the text to generate a score indicating positive, negative, or neutral sentiment.
3. **Oracle Interaction**: The sentiment score is relayed to the SEDA oracle, making it accessible to on-chain trading bots, which can then act upon the received sentiment data.

## Technical Details

- **Oracle**: Utilizes the SEDA oracle to link off-chain sentiment analysis with on-chain applications.
- **Sentiment Analysis Model**: Integrates an LLM-based sentiment analysis model for interpreting news content.
- **API**: Collects and analyzes news in real-time, structured to support dynamic data queries based on assets of interest.

## Project Directory

```
- news_api/               # News API
- /                       # Oracle Codes
- platform/               # Web App
- README.md               # Project documentation
```


## Future Improvements

- **Expanded Data Sources**: Integrate additional financial news sources.
- **Enhanced NLP Models**: Experiment with more advanced sentiment analysis models.
