interface Article {
  displayImage: string;
  title: string;
  authorId: string;
  text: string;
  date: string;
  readTime: Date;
}

interface Activity {
  _id: string;
  name: string;
  date: string;
  description: string;
}

interface Coordinator {
  name: string;
  occupation: string;
  phone_number: string;
  image_url: any;
  about: string;
}

export type { Activity, Article, Coordinator };
