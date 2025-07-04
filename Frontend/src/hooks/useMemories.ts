import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import Http from "@/services/Http";

const useMemories = () => {
  const getAllMemories = async (page: number = 1, limit: number = 50, activityId?: string) => {
    let url = `${API_BASE_URL}/${ENDPOINTS.GET_ALL_MEMORIES}?page=${page}&limit=${limit}`;
    if (activityId) {
      url += `&activityId=${activityId}`;
    }
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.error("Error fetching memories:", error);
      throw error;
    }
  };

  const getGalleryByEvents = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.MEMORY_BY_EVENTS}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.error("Error fetching gallery by events:", error);
      throw error;
    }
  };

  const getMemoriesByActivity = async (activityId: string, page: number = 1, limit: number = 20) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.MEMORY_BY_ACTIVITY}/${activityId}?page=${page}&limit=${limit}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.error("Error fetching memories by activity:", error);
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

  const uploadMemoryWithImage = async (formData: FormData) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.MEMORY_WITH_IMAGE}`;
    try {
      const res = await Http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res;
    } catch (error) {
      console.error("Error uploading memory with image:", error);
      throw error;
    }
  };

  const uploadImageOnly = async (formData: FormData) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.MEMORY_UPLOAD_IMAGE}`;
    try {
      const res = await Http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return { 
    getAllMemories, 
    getGalleryByEvents,
    getMemoriesByActivity,
    getMemoryById, 
    uploadMemoryWithImage,
    uploadImageOnly
  };
};

export { useMemories };
