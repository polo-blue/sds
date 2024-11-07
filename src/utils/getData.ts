import fs from 'node:fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.API_URL || '';
const CACHE_DIR = process.env.CACHE_DIR || './.cache';
const version = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' daily version to refresh cache from Cloudflare

export const getData = async (type: string): Promise<any | null> => {
  if (!API_URL) {
    console.error("API_URL is not defined in .env");
    return null;
  }

  const cacheFilePath = `${CACHE_DIR}/${type}.json`;
  const apiUrl = `${API_URL}${type}?version=${version}`;

  // Ensure cache directory exists
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  // Check if cached file exists
  if (fs.existsSync(cacheFilePath)) {
    try {
      const rawData = fs.readFileSync(cacheFilePath, 'utf-8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error("Failed to read or parse cached data:", error);
      return null;
    }
  }

  // Fetch data from API and cache it
  try {
    const response = await fetch(apiUrl);
    const jsonObject = await response.json();

    if (jsonObject.success) {
      fs.writeFileSync(cacheFilePath, JSON.stringify(jsonObject.data, null, 2));
      return jsonObject.data;
    } else {
      console.warn(`API response unsuccessful for type: ${type}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};
