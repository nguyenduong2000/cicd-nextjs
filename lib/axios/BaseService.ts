import middlewares from './middleware';
import createInstance from './axios.config';
import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { appConfig } from '@/utils/app-config';

interface ISearchParams {
  page_index: number;
  page_size: number;
  current_page: number;
}

abstract class BaseService {
  private _baseUrl = appConfig.baseUrl;

  private _primaryKey = '_id';

  private _baseEndpoint = '';

  private _apllyMiddleware = {
    ...middlewares
  };

  public request;

  constructor({ baseEndpoint }: { baseEndpoint: string }) {
    this.request = createInstance(this._baseUrl, this.middleware);
    this._baseEndpoint = baseEndpoint;
  }

  protected set searchParams(params: ISearchParams) {
    this.searchParams = params;
  }

  protected get searchParams() {
    return this.searchParams;
  }

  protected set primaryKey(primaryKey) {
    this._primaryKey = primaryKey;
  }
  protected get primaryKey() {
    return this._primaryKey;
  }

  private middleware = (requestConfig: InternalAxiosRequestConfig) => {
    const arr = Object.values(this._apllyMiddleware).map((m) => {
      if (typeof m === 'function') {
        return m(requestConfig);
      }
      return m;
    });
    return arr;
  };

  private getEndpoint(prefix = '', id?: string) {
    const hasId = id ? '/' + id : '';
    const endPoint = this._baseEndpoint + prefix + hasId;
    return endPoint;
  }

  // [GET]
  public get<T = any, R = T>(
    prefix?: string,
    config: AxiosRequestConfig = {}
  ): Promise<R> {
    const url = this.getEndpoint(prefix);
    return this.request.get<T, R>(url, config);
  }

  // [POST]
  public post<T = any, R = T>(
    data: any = {},
    prefix?: string,
    config: AxiosRequestConfig = {}
  ): Promise<R> {
    const url = this.getEndpoint(prefix);
    return this.request.post<T, R>(url, data, config);
  }

  // [DELETE]
  public delete<T = any, R = T>(
    id: string,
    prefix?: string,
    config: AxiosRequestConfig = {}
  ): Promise<R> {
    const url = this.getEndpoint(prefix, id);
    return this.request.delete<T, R>(url, config);
  }

  // [GET]
  public listWithParams<T = any, R = T>(
    query = {},
    prefix?: string,
    config: AxiosRequestConfig = {}
  ): Promise<R> {
    const url = this.getEndpoint(prefix);
    const params = { ...this.searchParams, ...query };
    const configs = { params, ...config };
    return this.request.get<T, R>(url, configs);
  }

  // [GET]
  public find<T = any, R = T>(
    id: string,
    prefix?: string,
    config: AxiosRequestConfig = {}
  ): Promise<R> {
    const url = this.getEndpoint(prefix, id);
    return this.request.get<T, R>(url, config);
  }

  // [PUT]
  public update<T = any, R = T>(
    data: any = {},
    prefix?: string,
    config: AxiosRequestConfig = {}
  ): Promise<R> {
    const url = this.getEndpoint(prefix, data[this._primaryKey]);
    return this.request.put(url, data, config);
  }

  // [POST] update or create
  public save<T = any, R = T>(
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<R> {
    const PRIMARY_KEY = this._primaryKey;
    if (data.hasOwnProperty(PRIMARY_KEY) && data[PRIMARY_KEY]) {
      return this.update(data, '', config);
    }
    return this.post(data, '', config);
  }
}

export default BaseService;
