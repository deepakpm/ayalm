const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Something went wrong');
  }

  return json.data;
}

export const templeApi = {
  getAll: (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest<any>(`/temples?${query}`);
  },
  getBySlug: (slug: string, lang: string = 'EN') => apiRequest<any>(`/temples/slug/${slug}?lang=${lang}`),
  getById: (id: string) => apiRequest<any>(`/temples/${id}`),
  getMostPopular: (lang: string) => apiRequest<any>(`/temples/most-popular?lang=${lang}`),
};

export const configApi = {
  getHome: (lang: string = 'EN') => apiRequest<any>(`/config/home?lang=${lang}`),
};
