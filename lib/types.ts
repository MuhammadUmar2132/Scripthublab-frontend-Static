export interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  featured: boolean;
  client?: string;
  duration?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  published: boolean;
  project?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export interface Stats {
  messages: number;
  subscribers: number;
  projects: number;
  blogs: number;
  articles: number;
  jobs: number;
  applications: number;
}

export interface Job {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  description: string;
  requirements: string[];
  salaryRange?: string;
  expiresAt: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  _id: string;
  job: string | { _id: string; title: string; slug: string };
  name: string;
  email: string;
  phone?: string;
  resumeUrl: string;
  coverLetter?: string;
  status: "new" | "reviewed" | "shortlisted" | "rejected";
  createdAt: string;
}
