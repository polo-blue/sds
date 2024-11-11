export default function getEnvVariable(key, defaultValue = null) {
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

