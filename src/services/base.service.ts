import { fetchClient } from './fetchClient';

const baseUrl = import.meta.env.VITE_API_URL;
export class BaseService<T = any> {
  baseUri = '';

  constructor(url: string) {
    this.baseUri = baseUrl + url;
  }

  async findAll(params?: any) {
    return await fetchClient.get<T[]>(this.baseUri, params);
  }

  find(id: number | string) {
    return fetchClient.get<T>(this.baseUri + '/' + id);
  }

  create(data: T) {
    return fetchClient.post<T>(this.baseUri, data);
  }

  update(id: number, data: Partial<T>) {
    return fetchClient.put<T>(this.baseUri + '/' + id, data);
  }

  delete(id: number) {
    return fetchClient.delete(this.baseUri + '/' + id);
  }
}
