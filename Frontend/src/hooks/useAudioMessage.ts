import { API_BASE_URL } from "@/constants/api";
import Http from "@/services/Http";

const useAudioMessage = () => {
  const getAllAudioMessages = async () => {
    const url = `${API_BASE_URL}/audio-messages`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getLatestAudioMessages = async (limit: number = 5) => {
    const url = `${API_BASE_URL}/audio-messages/latest?limit=${limit}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAudioMessagesByCategory = async (category: string, limit: number = 10) => {
    const url = `${API_BASE_URL}/audio-messages/category/${category}?limit=${limit}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularAudioMessages = async (limit: number = 10) => {
    const url = `${API_BASE_URL}/audio-messages/popular?limit=${limit}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAudioMessageById = async (id: string) => {
    const url = `${API_BASE_URL}/audio-messages/${id}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAudioMessageCategories = async () => {
    const url = `${API_BASE_URL}/audio-messages/categories`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const incrementPlayCount = async (id: string) => {
    const url = `${API_BASE_URL}/audio-messages/${id}/play`;
    try {
      const res = await Http.post(url, {});
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllAudioMessages,
    getLatestAudioMessages,
    getAudioMessagesByCategory,
    getPopularAudioMessages,
    getAudioMessageById,
    getAudioMessageCategories,
    incrementPlayCount,
  };
};

export default useAudioMessage; 