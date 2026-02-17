import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Generic storage utility wrapper with TypeScript support
 */
export const storage = {
  /**
   * Save data to AsyncStorage
   */
  save: async <T>(key: string, value: T): Promise<boolean> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      return false;
    }
  },

  /**
   * Load data from AsyncStorage
   */
  load: async <T>(key: string): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      return null;
    }
  },

  /**
   * Remove data from AsyncStorage
   */
  remove: async (key: string): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      return false;
    }
  },

  /**
   * Clear all AsyncStorage data
   */
  clearAll: async (): Promise<boolean> => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing storage:", error);
      return false;
    }
  },
};
