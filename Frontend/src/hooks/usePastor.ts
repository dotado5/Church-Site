import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import Http from "@/services/Http";

const usePastor = () => {
  const getActivePastor = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.ACTIVE_PASTOR}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPastors = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.PASTOR}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { getActivePastor, getAllPastors };
};

export default usePastor; 