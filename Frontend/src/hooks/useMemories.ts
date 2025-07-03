import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import Http from "@/services/Http";

const useMemories = () => {
  const getAllMemories = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.GET_ALL_MEMORIES}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.error("Error fetching memories:", error);
      throw error;
    }
  };

  const getMemoryById = async (id: string) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.GET_ALL_MEMORIES}/${id}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.error("Error fetching memory:", error);
      throw error;
    }
  };

  const getMemoriesByActivity = async (activityId: string) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.GET_ALL_MEMORIES}?activityId=${activityId}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.error("Error fetching memories by activity:", error);
      throw error;
    }
  };

  return { 
    getAllMemories, 
    getMemoryById, 
    getMemoriesByActivity 
  };
};

export { useMemories };
