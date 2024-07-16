export interface Author {
  id: string;
  email: string;
  name: string;
  password: string;
  role: string;
  imageUrl: String;
}

export interface Category {
  id: string;
  createdAt: string;
  title: string;
  author: string;
  authorId: string;
  imageUrl: string;
}

export interface Comment {
  id: string;
  authorId: string;
  categoryId: string;
  createdAt: string;
  imageUrl: string | null;
  isLiked: boolean;
  like: number;
  parentId: string | null;
  text: string;
  title: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  author: Author;
  authorId: string;
  category: Category;
  categoryId: string;
  comments: Comment[];
  createdAt: string;
  imageUrl: string | null;
  isLiked: boolean;
  like: number;
  parentId: string | null;
  text: string;
  title: string;
  updatedAt: string;
}

export type PostOrCategory = Post[] | Category[];