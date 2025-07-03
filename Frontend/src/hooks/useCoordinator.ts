import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import Http from "@/services/Http";

const useCoordinator = () => {
  const getAllCoordinators = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.COORDINATOR}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getFeaturedCoordinator = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.FEATURED_COORDINATOR}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllCoordinators, getFeaturedCoordinator };
};

export default useCoordinator;
