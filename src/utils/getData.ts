const version = (Math.random() + 1).toString(36).substring(7); // random version to refresh cache from Cloudflare

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export function getEnvVariable(key, defaultValue = null) {
  // First we check import.meta.env (for ES6 environments)
  if (typeof import.meta !== 'undefined' && typeof import.meta.env !== 'undefined') {
    return import.meta.env[key] || defaultValue;
  }
  
  // Then check process.env (for Node.js environment)
  if (typeof process !== 'undefined' && typeof process.env !== 'undefined') {
    return process.env[key] || defaultValue;
  }
  
  // If no variable is found, the default value is returned
  return defaultValue;
}
const API_URL = getEnvVariable('API_URL', 'https://default-api.com');


export const apiInfo = (name: string) => {
  return API_URL
}

export const getData = async <T>(type: string): Promise<T | null> => {
    const API = `${API_URL}${type}?version=${version}`;
    
    try {
        const response = await fetch(API);

        if (!response.ok) {
            console.error(`Request failed with status ${response.status}: ${response.statusText}`);
            return null;
        }

        const jsonObject: ApiResponse<T> = await response.json();

        // Return data if API call is successful
        if (jsonObject.success) {
            return jsonObject.data;
        } else {
            console.error('API returned success: false');
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};


export default { apiInfo, getData };