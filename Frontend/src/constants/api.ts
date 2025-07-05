// Use local backend for development (your backend is running on port 8000)
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
const API_BASE_URL = "http://localhost:8000";

const ENDPOINTS = {
  GET_ALL_ARTICLES: "article",
  GET_ALL_ACTIVITIES: "activity",
  GET_ALL_AUTHORS: "author",
  GET_ALL_MEMORIES: "memory",
  MEMORY_BY_EVENTS: "memory/by-events",
  MEMORY_BY_ACTIVITY: "memory/activity",
  MEMORY_UPLOAD_IMAGE: "memory/upload-image",
  MEMORY_WITH_IMAGE: "memory/with-image",
  COORDINATOR: "coordinator",
  FEATURED_COORDINATOR: "coordinator/featured",
  MESSAGE: "message",
  LATEST_MESSAGE: "message/latest",
  ARTICLES_WITH_AUTHORS: "article/with-authors",
  ARTICLE_WITH_AUTHOR: "article",
};

export { API_BASE_URL, ENDPOINTS };
