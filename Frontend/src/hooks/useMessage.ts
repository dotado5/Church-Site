import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import Http from "@/services/Http";

const useMessage = () => {
  const getLatestMessage = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.LATEST_MESSAGE}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMessages = async () => {
    const url = `${API_BASE_URL}/${ENDPOINTS.MESSAGE}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getMessagesByCoordinator = async (coordinatorId: string) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.MESSAGE}/coordinator/${coordinatorId}`;
    try {
      const res = await Http.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const createMessage = async (messageData: any) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.MESSAGE}`;
    try {
      const res = await Http.post(url, messageData);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const updateMessage = async (id: string, messageData: any) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.MESSAGE}/${id}`;
    try {
      const res = await Http.put(url, messageData);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessage = async (id: string) => {
    const url = `${API_BASE_URL}/${ENDPOINTS.MESSAGE}/${id}`;
    try {
      const res = await Http.delete(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { 
    getLatestMessage, 
    getAllMessages, 
    getMessagesByCoordinator,
    createMessage,
    updateMessage,
    deleteMessage
  };
};

export default useMessage; 