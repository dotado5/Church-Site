import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import Http from "@/services/Http";

const useArticles = () => {
  const getAllArticles = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.GET_ALL_ARTICLES}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.error("Error in getAllArticles:", error);
      throw error;
    }
  };

  const getAllArticlesWithAuthors = async (page: number = 1, limit: number = 10) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.ARTICLES_WITH_AUTHORS}?page=${page}&limit=${limit}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.error("Error in getAllArticlesWithAuthors:", error);
      throw error;
    }
  };

  const getArticleByIdWithAuthor = async (id: string) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.ARTICLE_WITH_AUTHOR}/${id}/with-author`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.error("Error in getArticleByIdWithAuthor:", error);
      throw error;
    }
  };

  return { getAllArticles, getAllArticlesWithAuthors, getArticleByIdWithAuthor };
};

export { useArticles };
