import axios from "axios";

const Http = {
  get: async (url: string) => {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      console.error("GET request failed:", url, error);
      throw error;
    }
  },

  post: async (url: string, body: any, config?: any) => {
    try {
      const response = await axios.post(url, body, config);
      return response;
    } catch (error) {
      console.error("POST request failed:", url, error);
      throw error;
    }
  },
};

export default Http;
