import axios from 'axios';
import { Tweet } from '../utils/types';
import * as dotenv from 'dotenv';

dotenv.config();

const rapidApiClient = axios.create({
  baseURL: `https://${process.env.RAPIDAPI_HOST}`,
  headers: {
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
  },
});

export const fetchRecentTweets = async (keywords: string[]): Promise<Tweet[]> => {
  try {
    const query = keywords.join(' OR ');
    console.log('Searching Twitter with query:', query);
    const response = await rapidApiClient.get('/search/', {
      params: { query, section: 'top', limit: 20 },
    });

    // Log the full response for debugging
    console.log('Full Twitter API response:', JSON.stringify(response.data, null, 2));

    // Traverse the deeply nested structure
    const instructions =
      response.data?.data?.search_by_raw_query?.search_timeline?.timeline?.instructions;
    if (!Array.isArray(instructions) || instructions.length === 0) {
      console.log('No instructions found in Twitter API response.');
      return [];
    }

    // Find the first instruction with entries
    const entries = instructions.find((inst: any) => Array.isArray(inst.entries))?.entries;
    if (!Array.isArray(entries) || entries.length === 0) {
      console.log('No entries found in Twitter API response.');
      return [];
    }

    // Filter and map tweets
    const tweets: Tweet[] = entries
      .filter((entry: any) => entry.content?.itemContent?.tweet_results?.result?.legacy)
      .map((entry: any) => {
        const legacy = entry.content.itemContent.tweet_results.result.legacy;
        return {
          id: legacy.id_str,
          text: legacy.full_text,
        };
      });

    if (tweets.length === 0) {
      console.log('No tweets found after mapping.');
    }

    return tweets;
  } catch (error) {
    console.error('Error fetching tweets from RapidAPI:', error);
    return [];
  }
}; 
 
// Twitter service for fetching and analyzing tweets
// Test cases for twitterService
