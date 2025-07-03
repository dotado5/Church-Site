interface Activity {
  _id: string;
  name: string;
  date: string;
  description: string;
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

export type { 
  Activity, 
  Article, 
  Author,
  ArticleWithAuthor,
  ArticlesPagination,
  ArticlesWithAuthorsResponse,
  Coordinator, 
  Pastor, 
  PastorCorner 
};
