export interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  likes: string[];
  comments?: any[];
  createdAt: string;
}

export interface Comment {
  _id: string;
  text: string;
  user: {
    _id: string;
    name: string;
  };
  post: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}