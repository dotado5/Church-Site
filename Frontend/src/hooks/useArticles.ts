import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import Http from "@/services/Http";

const useArticles = () => {
  const getAllArticles = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.GET_ALL_ARTICLES}`;
    try {
      const res = await Http.get(url);

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllArticles };
};

export { useArticles };
