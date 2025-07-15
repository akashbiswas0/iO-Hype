import { ioNetClient } from './ioNetClient';
import { AnalysisOutput, Tweet } from '../utils/types';

export const analyzeTweet = async (tweet: Tweet): Promise<AnalysisOutput | null> => {
  console.log(`Analyzing tweet: "${tweet.text}"`);

  const prompt = {
    model: 'meta-llama/Llama-3.3-70B-Instruct',
    messages: [
      {
        role: 'system',
        content: `You are an expert financial market analyst for the Solana ecosystem. Analyze the following tweet and return ONLY a single, minified JSON object with the exact fields: 'token_symbol' (string or null), 'sentiment_score' (a number from -1.0 to 1.0), 'tweet_category' (one of 'Project News', 'Influencer Shill', 'FUD', 'Technical Analysis', 'Community Hype', 'Memecoin', 'Whale Wallet', 'Buy Signal', 'Sell Signal', 'Other'), and 'signal_type' (one of 'Buy', 'Sell', 'Hold', 'Airdrop', 'Whale Activity', 'Memecoin', 'News', 'FUD', 'Other').

For token extraction: If the tweet mentions a token with a $ prefix (e.g., $WIF, $JUP, $BONK, $DOG, $PEPE, $SHIB, $DOGE, $ETH, $BTC), extract the symbol after the $ as the token_symbol. If multiple tokens are mentioned, select the one that is the main subject of the tweet (e.g., the one being hyped, bought, sold, or airdropped). Ignore unrelated hashtags or words that are not tokens. If no token is mentioned, use null.

All property names and string values MUST be in double quotes. Do NOT use single quotes. Do NOT use unquoted property names. Only output a single minified JSON object. If you do not know, return: {"token_symbol":null,"sentiment_score":0,"tweet_category":"Other","signal_type":"Other"}

EXAMPLES:
Tweet: "$SOL is going to the moon!"
Output: {"token_symbol":"SOL","sentiment_score":0.9,"tweet_category":"Community Hype","signal_type":"Buy"}

Tweet: "I think $WIF is a scam."
Output: {"token_symbol":"WIF","sentiment_score":-0.8,"tweet_category":"FUD","signal_type":"FUD"}

Tweet: "Solana mainnet upgrade announced."
Output: {"token_symbol":"SOL","sentiment_score":0.7,"tweet_category":"Project News","signal_type":"News"}

Tweet: "No token mentioned here."
Output: {"token_symbol":null,"sentiment_score":0,"tweet_category":"Other","signal_type":"Other"}

Tweet: "$WIF is the next big memecoin!"
Output: {"token_symbol":"WIF","sentiment_score":0.8,"tweet_category":"Memecoin","signal_type":"Memecoin"}

Tweet: "A whale just bought 10,000 $BONK."
Output: {"token_symbol":"BONK","sentiment_score":0.9,"tweet_category":"Whale Wallet","signal_type":"Whale Activity"}

Tweet: "Now is the time to buy $JUP!"
Output: {"token_symbol":"JUP","sentiment_score":0.95,"tweet_category":"Buy Signal","signal_type":"Buy"}

Tweet: "Sell your $DOG now before it crashes!"
Output: {"token_symbol":"DOG","sentiment_score":-0.95,"tweet_category":"Sell Signal","signal_type":"Sell"}

Tweet: "$PEPE is pumping hard!"
Output: {"token_symbol":"PEPE","sentiment_score":0.85,"tweet_category":"Community Hype","signal_type":"Buy"}

Tweet: "Huge $SHIB whale just bought 1B tokens."
Output: {"token_symbol":"SHIB","sentiment_score":0.8,"tweet_category":"Whale Wallet","signal_type":"Whale Activity"}

Tweet: "$DOGE is the future of payments."
Output: {"token_symbol":"DOGE","sentiment_score":0.9,"tweet_category":"Influencer Shill","signal_type":"Buy"}

Tweet: "Bearish on $ETH after the latest update."
Output: {"token_symbol":"ETH","sentiment_score":-0.6,"tweet_category":"Technical Analysis","signal_type":"Sell"}

Tweet: "$BTC is about to break out!"
Output: {"token_symbol":"BTC","sentiment_score":0.8,"tweet_category":"Technical Analysis","signal_type":"Buy"}

Tweet: "Airdrop: First 1000 wallets get $PEPE."
Output: {"token_symbol":"PEPE","sentiment_score":0.7,"tweet_category":"Memecoin","signal_type":"Airdrop"}

Tweet: "Warning: $JUP is about to dump hard. Sell now!"
Output: {"token_symbol":"JUP","sentiment_score":-0.98,"tweet_category":"Sell Signal","signal_type":"Sell"}

Tweet: "$BONK is a rug. Get out while you can!"
Output: {"token_symbol":"BONK","sentiment_score":-0.99,"tweet_category":"FUD","signal_type":"Sell"}

Tweet: "Time to sell $PEPE, it's overvalued."
Output: {"token_symbol":"PEPE","sentiment_score":-0.85,"tweet_category":"Sell Signal","signal_type":"Sell"}

Tweet: "$DOGE holders are panicking. I'm selling all my $DOGE."
Output: {"token_symbol":"DOGE","sentiment_score":-0.9,"tweet_category":"Sell Signal","signal_type":"Sell"}`
      },
      {
        role: 'user',
        content: tweet.text
      }
    ]
  };

  try {
    const response = await ioNetClient.post('/chat/completions', prompt);

    let rawContent = response.data.choices[0].message.content.trim();
    if (rawContent.startsWith('```')) {
      rawContent = rawContent.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '').trim();
    }
    // Extract the first {...} block
    let match = rawContent.match(/{[\s\S]*}/);
    if (!match) throw new Error('No JSON object found in model response');
    let jsonStr = match[0];

    // Remove any trailing characters after the closing brace of the first JSON object
    const closingIndex = jsonStr.lastIndexOf('}');
    if (closingIndex !== -1 && closingIndex < jsonStr.length - 1) {
      jsonStr = jsonStr.slice(0, closingIndex + 1);
    }

    // Fallback: add double quotes around property names if missing
    if (!jsonStr.includes('"token_symbol"')) {
      jsonStr = jsonStr.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
    }

    const analysisResult = JSON.parse(jsonStr);

    // Basic validation of the result
    if (!analysisResult || typeof analysisResult.sentiment_score !== 'number') {
        throw new Error('Invalid JSON structure in AI response');
    }

    return {
      tweetId: tweet.id,
      token: analysisResult.token_symbol,
      sentiment: analysisResult.sentiment_score,
      category: analysisResult.tweet_category,
    };

  } catch (error: any) {
    console.error(`Error analyzing tweet with IO.NET:`, error.response?.data || error.message);
    return null;
  }
}; 
 
// Sentiment analysis agent
// Refactor analyzeTweet for accuracy
// Add comments and documentation
// add analyzeTweet agent for tweet analysis 1178
// add analyzeTweet agent for tweet analysis 5547
// implement ioNetClient for agent communication 15162
// refactor tradeExecutor for better error handling 20
// add types to utils/types.ts 18059
// update twitterService to fetch latest tweets 31631
// fix bug in mainLoop logic 3073
// improve wallet connection reliability 14557
// add webSocketService for real-time updates 15849
// update routes in api 29035
// add tests for reasoningAgent 21529
// refactor analyzeTweet for performance 10044
// update tradeExecutor to support batch trades 15293
// add error handling to wallet 30614
// improve logging in mainLoop 14303
// update types in utils/types.ts 27756
// add comments to ioNetClient 16056
// fix bug in twitterService 30862
// refactor webSocketService for scalability 24504
// add input validation to api routes 2707
// update analyzeTweet to support hashtags 32343
// improve tradeExecutor error messages 25218
// add reconnect logic to wallet 28057
