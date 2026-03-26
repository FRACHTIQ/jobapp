import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000";
const TOKEN_KEY = "getinjob_token";

export type AuthResult = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type Job = {
  id: string;
  company: string;
  role: string;
  location: string;
  employment: string;
  experience: string;
  salaryPerMonth: number;
  colorHex: string;
  description: string;
  requirements: string[];
  isSaved: boolean;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function storeToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function clearToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function register(email: string, password: string, name: string) {
  return request<AuthResult>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name })
  });
}

export async function login(email: string, password: string) {
  return request<AuthResult>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}

export async function fetchJobs() {
  return request<Job[]>("/jobs");
}

export async function fetchJob(id: string) {
  return request<Job>(`/jobs/${id}`);
}

export async function saveJob(id: string) {
  return request<{ ok: true }>(`/jobs/${id}/save`, { method: "POST" });
}

export async function unsaveJob(id: string) {
  return request<{ ok: true }>(`/jobs/${id}/save`, { method: "DELETE" });
}

export async function applyToJob(id: string) {
  return request<{ ok: true }>(`/jobs/${id}/apply`, { method: "POST" });
}
