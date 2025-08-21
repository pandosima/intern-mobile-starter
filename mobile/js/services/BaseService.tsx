import Http from './Http';
import {store} from '../store';
import {fetchUser, refreshToken} from '../modules/oauth/store/actions';

import {recordError} from '../modules/firebase/crashlytics';

export default class BaseService {
  entity?: string;
  constructor(entity: string) {
    this.entity = entity;

    if (!this.entity) {
      throw new Error('Child service class did not provide an entity');
    }
  }

  errorHandler(error: any) {
    if (error?.status === 401) {
      store.dispatch(refreshToken(true)).then(() => {
        //Fetch user information after login
        store.dispatch(fetchUser(true));
      });
    }
  }

  request(options: any = {}) {
    // Access token
    let tokenInfo =
      store && store.getState() && store.getState().oauth
        ? store.getState().oauth.tokenInfo
        : null;

    let access_token = tokenInfo!.access_token;
    if (!access_token) {
      throw new Error('Session timeout!');
    }

    // Unrem these line if you use Bearer token
    try {
      if (!access_token.startsWith('Bearer')) {
        access_token = 'Bearer ' + access_token;
      }
    } catch (error) {
      recordError(error as Error);
      console.error(error);
    }
    const headers = options.headers
      ? {
          Accept: 'application/json',
          ...options.headers, // multipart/form-data
          Authorization: access_token,
        }
      : {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: access_token,
        };

    const mergedOptions = {
      ...options,
      headers,
      errorHandler: this.errorHandler,
    };

    return new Http(mergedOptions);
  }

  get(id: string | number): Promise<Response> {
    return this.request().get(`${this.entity}/${id}`);
  }

  create(obj: any): Promise<Response> {
    const options =
    obj instanceof FormData
      ? {
          headers: {'Content-Type': 'multipart/form-data'},
        }
      : {};
    return this.request(options).post(`${this.entity}`, obj);
  }

  delete(id: string | number): Promise<Response> {
    return this.request().delete(`${this.entity}/${id}`);
  }

  multipleDelete(ids: string[]): Promise<Response> {
    return this.request().delete(`/${this.entity}`, {ids});
  }

  update(obj: any): Promise<Response> {
    const id =
      obj && obj instanceof FormData
        ? obj.getParts().find(part => part.fieldName === 'id').string
        : obj.id;

    const options =
      obj instanceof FormData
        ? {
            headers: {'Content-Type': 'multipart/form-data'},
          }
        : {};
    return this.request(options).put(`${this.entity}/${id}`, obj);
  }

  sync(array: any): Promise<Response> {
    return this.request().put(`${this.entity}`, array);
  }

  gets(params: any): Promise<Response> {
    if (params && Object.keys(params).length > 0) {
      return this.request().get(`${this.entity}`, params);
    }
    return this.request().get(`${this.entity}`);
  }

  tree(params: any): Promise<Response> {
    if (params) {
      return this.request().get(`${this.entity}/tree`, params);
    }
    return this.request().get(`${this.entity}/tree`);
  }

  import(data: any): Promise<Response> {
    return this.request().post(`${this.entity}/import`, data);
  }
}
