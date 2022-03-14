async function http<K = any>(method: string, url: string, body?: any) {
  let data: K;
  let error: any;
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + import.meta.env.VITE_API_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  data = await response.json();
  if (response.status != 200) {
    console.error("ha ocurrido un error", data);
    error = data;
    alert(error.message);
  }
  return {
    data: data,
    error: error,
  };
}

export class HttpClient {
  async get<T = any>(url: string, params?: any) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return await http<T>("GET", url + query);
  }

  post<T = any>(url: string, body?: T) {
    return http<T>("POST", url, body);
  }

  put<T = any>(url: string, body?: Partial<T>) {
    return http<T>("PUT", url, body);
  }

  delete(url: string) {
    return http("DELETE", url);
  }
}

export const fetchClient = new HttpClient();
