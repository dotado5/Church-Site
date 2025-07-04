// const API_BASE_URL = "https://api-2at6qg5khq-uc.a.run.app";
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
  PASTOR: "pastor",
  ACTIVE_PASTOR: "pastor/active",
  PASTOR_CORNER: "pastor-corner",
  LATEST_PASTOR_CORNER: "pastor-corner/latest",
  ARTICLES_WITH_AUTHORS: "article/with-authors",
  ARTICLE_WITH_AUTHOR: "article",
};

export { API_BASE_URL, ENDPOINTS };
