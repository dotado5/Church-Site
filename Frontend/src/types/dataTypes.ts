interface Article {
  displayImage: string;
  title: string;
  authorId: string;
  text: string;
  date: Date;
  readTime: Date;
}

interface Activity {
  _id: string;
  name: string;
  date: string;
  description: string;
}

export type { Activity, Article };
