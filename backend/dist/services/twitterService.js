"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRecentTweets = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const rapidApiClient = axios_1.default.create({
    baseURL: `https://${process.env.RAPIDAPI_HOST}`,
    headers: {
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    },
});
const fetchRecentTweets = (keywords) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const query = keywords.join(' OR ');
        console.log('Searching Twitter with query:', query);
        const response = yield rapidApiClient.get('/search/', {
            params: { query, section: 'top', limit: 20 },
        });
        // Log the full response for debugging
        console.log('Full Twitter API response:', JSON.stringify(response.data, null, 2));
        // Traverse the deeply nested structure
        const instructions = (_e = (_d = (_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.search_by_raw_query) === null || _c === void 0 ? void 0 : _c.search_timeline) === null || _d === void 0 ? void 0 : _d.timeline) === null || _e === void 0 ? void 0 : _e.instructions;
        if (!Array.isArray(instructions) || instructions.length === 0) {
            console.log('No instructions found in Twitter API response.');
            return [];
        }
        // Find the first instruction with entries
        const entries = (_f = instructions.find((inst) => Array.isArray(inst.entries))) === null || _f === void 0 ? void 0 : _f.entries;
        if (!Array.isArray(entries) || entries.length === 0) {
            console.log('No entries found in Twitter API response.');
            return [];
        }
        // Filter and map tweets
        const tweets = entries
            .filter((entry) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = entry.content) === null || _a === void 0 ? void 0 : _a.itemContent) === null || _b === void 0 ? void 0 : _b.tweet_results) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d.legacy; })
            .map((entry) => {
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
    }
    catch (error) {
        console.error('Error fetching tweets from RapidAPI:', error);
        return [];
    }
});
exports.fetchRecentTweets = fetchRecentTweets;
// Twitter service for fetching and analyzing tweets
// Test cases for twitterService
