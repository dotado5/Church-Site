interface Activity {
  _id: string;
  name: string;
  date: string;
  description: string;
}

interface ActivityWithMemories extends Activity {
  memoryCount: number;
  previewMemories: Memory[];
  memories?: Memory[];
}

interface MemoryPagination {
  currentPage: number;
  totalPages: number;
  totalMemories: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ActivityMemoriesResponse {
  activity: Activity;
  memories: Memory[];
  pagination: MemoryPagination;
}

interface Article {
  displayImage: string;
  title: string;
  authorId: string;
  text: string;
  date: string;
  readTime: Date;
}

interface Author {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profileImage: string;
}

interface ArticleWithAuthor {
  _id: string;
  displayImage: string;
  title: string;
  authorId: string;
  author: Author | null;
  text: string;
  excerpt: string;
  date: string;
  formattedDate: string;
  timeAgo: string;
  readTime: Date;
  estimatedReadTime: string;
}

interface ArticlesPagination {
  currentPage: number;
  totalPages: number;
  totalArticles: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ArticlesWithAuthorsResponse {
  status: string;
  message: string;
  data: ArticleWithAuthor[];
  pagination: ArticlesPagination;
}

interface Coordinator {
  _id?: string;
  name: string;
  occupation: string;
  phone_number: string;
  image_url: any;
  about: string;
  isFeatured: boolean;
}

interface Pastor {
  _id: string;
  name: string;
  title: string;
  welcomeMessage: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PastorCorner {
  _id: string;
  title: string;
  content: string;
  pastorId: Pastor;
  datePublished: string;
  isPublished: boolean;
  excerpt?: string;
  createdAt: string;
  updatedAt: string;
}

interface Memory {
  _id: string;
  imageUrl: string;
  height: number;
  width: number;
  imgType: string;
  activityId: string;
}

export type { 
  Activity, 
  ActivityWithMemories,
  MemoryPagination,
  ActivityMemoriesResponse,
  Article, 
  Author,
  ArticleWithAuthor,
  ArticlesPagination,
  ArticlesWithAuthorsResponse,
  Coordinator, 
  Pastor, 
  PastorCorner,
  Memory
};
