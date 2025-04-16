import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import Http from "@/services/Http";

const useActivities = () => {
  const getAllActivities = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.GET_ALL_ACTIVITIES}`;
    try {
      const res = await Http.get(url);

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllActivities };
};

export { useActivities };
