import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import Http from "@/services/Http";

const usePastorCorner = () => {
  const getLatestPastorCorner = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.LATEST_PASTOR_CORNER}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPastorCorners = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.PASTOR_CORNER}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getPastorCornersByPastor = async (pastorId: string) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.PASTOR_CORNER}/pastor/${pastorId}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { getLatestPastorCorner, getAllPastorCorners, getPastorCornersByPastor };
};

export default usePastorCorner; 