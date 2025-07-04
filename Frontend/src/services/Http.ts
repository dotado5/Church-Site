import axios from "axios";

const Http = {
  get: async (url: string) => {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  post: async (url: string, body: any, config?: any) => {
    try {
      const response = await axios.post(url, body, config);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default Http;
