import type { ContactMessage, Subscriber, Project, Blog, Article, Stats, Job, JobApplication } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "shl_admin_token";

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || "Request failed. Please try again.");
  }

  return data;
}

function postJson(path: string, body: unknown) {
  return request(path, { method: "POST", body: JSON.stringify(body) });
}

export async function uploadImage(file: File): Promise<string> {
  const token = getToken();
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE_URL}/upload/image`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || "Image upload failed. Please try again.");
  }

  return data.data.url as string;
}

export interface ApplicationPayload {
  jobId: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl: string;
  coverLetter?: string;
}

export function sendContactMessage(payload: ContactPayload) {
  return postJson("/contact", payload);
}

export async function uploadResume(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await fetch(`${API_BASE_URL}/upload/resume`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || "Resume upload failed. Please try again.");
  }

  return data.data.url as string;
}

export function applyToJob(payload: ApplicationPayload) {
  return postJson("/applications", payload);
}

export function subscribeNewsletter(email: string) {
  return postJson("/newsletter", { email });
}

export async function adminLogin(username: string, password: string) {
  const data = await postJson("/auth/login", { username, password });
  setToken(data.token);
  return data.admin;
}

export async function fetchStats(): Promise<Stats> {
  const data = await request("/stats");
  return data.data;
}

export async function fetchMessages(): Promise<ContactMessage[]> {
  const data = await request("/contact");
  return data.data;
}

export async function fetchSubscribers(): Promise<Subscriber[]> {
  const data = await request("/newsletter");
  return data.data;
}

export async function fetchAdminProjects(): Promise<Project[]> {
  const data = await request("/projects");
  return data.data;
}

export async function createProject(payload: Partial<Project>) {
  const data = await postJson("/projects", payload);
  return data.data as Project;
}

export async function updateProject(id: string, payload: Partial<Project>) {
  const data = await request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return data.data as Project;
}

export async function deleteProject(id: string) {
  return request(`/projects/${id}`, { method: "DELETE" });
}

export async function fetchAdminBlogs(): Promise<Blog[]> {
  const data = await request("/blogs?all=true");
  return data.data;
}

export async function createBlog(payload: Partial<Blog>) {
  const data = await postJson("/blogs", payload);
  return data.data as Blog;
}

export async function updateBlog(id: string, payload: Partial<Blog>) {
  const data = await request(`/blogs/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return data.data as Blog;
}

export async function deleteBlog(id: string) {
  return request(`/blogs/${id}`, { method: "DELETE" });
}

export async function fetchAdminArticles(): Promise<Article[]> {
  const data = await request("/articles?all=true");
  return data.data;
}

export async function createArticle(payload: Partial<Article>) {
  const data = await postJson("/articles", payload);
  return data.data as Article;
}

export async function updateArticle(id: string, payload: Partial<Article>) {
  const data = await request(`/articles/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return data.data as Article;
}

export async function deleteArticle(id: string) {
  return request(`/articles/${id}`, { method: "DELETE" });
}

export async function fetchAdminJobs(): Promise<Job[]> {
  const data = await request("/jobs?all=true");
  return data.data;
}

export async function createJob(payload: Partial<Job>) {
  const data = await postJson("/jobs", payload);
  return data.data as Job;
}

export async function updateJob(id: string, payload: Partial<Job>) {
  const data = await request(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return data.data as Job;
}

export async function deleteJob(id: string) {
  return request(`/jobs/${id}`, { method: "DELETE" });
}

export async function fetchApplications(jobId?: string): Promise<JobApplication[]> {
  const query = jobId ? `?job=${jobId}` : "";
  const data = await request(`/applications${query}`);
  return data.data;
}

export async function updateApplicationStatus(id: string, status: JobApplication["status"]) {
  const data = await request(`/applications/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
  return data.data as JobApplication;
}
