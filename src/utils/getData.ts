

const API_URL = process.env.API_URL || '';
const CACHE_DIR = process.env.CACHE_DIR || './.cache';
const version = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' daily version

// Dodajemy interfejs dla odpowiedzi API
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getData = async <T>(type: string, api: string): Promise<T | null> => {
  if (!api) {
    console.error("API_URL is not defined in .env");
    return null;
  }

  // Używamy path.join dla lepszej kompatybilności między systemami
  const cacheFilePath = path.join(CACHE_DIR, `${type}.json`);
  const apiUrl = `${API_URL}${type}?version=${version}`;

  // Ensure cache directory exists
  try {
    await fs.promises.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    console.error("Failed to create cache directory:", error);
    return null;
  }

  // Check if cached file exists
  try {
    if (fs.existsSync(cacheFilePath)) {
      const rawData = await fs.promises.readFile(cacheFilePath, 'utf-8');
      return JSON.parse(rawData);
    }
  } catch (error) {
    console.error("Failed to read or parse cached data:", error);
    // Kontynuujemy wykonanie, aby spróbować pobrać dane z API
  }

  // Fetch data from API and cache it
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const jsonObject: ApiResponse<T> = await response.json();

    if (jsonObject.success) {
      await fs.promises.writeFile(
        cacheFilePath, 
        JSON.stringify(jsonObject.data, null, 2)
      );
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

export default getData;