import { getConfigValue } from '../modules/firebase/remoteConfig';

export type HttpOptions = {
  baseURL?: string | null;
  headers?: any | null;
  successHandler?: (response?: any | null) => void;
  errorHandler?: (error?: any | null) => void;
};

export default class Http {
  baseURL: string;
  headers: any | null;
  successHandler?: (response?: any) => void;
  errorHandler?: (error?: any) => void;
  constructor(options?: HttpOptions) {
    const defaultBaseURL =  getConfigValue('api_base_url');

    let {baseURL, headers, successHandler, errorHandler} =
      options as HttpOptions;
    this.baseURL = baseURL
      ? baseURL
      : defaultBaseURL.asString();
    console.log(this.baseURL);

    this.headers = headers
      ? headers
      : {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
    this.successHandler = successHandler;
    this.errorHandler = errorHandler;
  }

  request(method: string, endPoint: string, data?: any): Promise<Response> {
    //validate url format
    let url = endPoint.startsWith('http')
      ? endPoint
      : `${this.baseURL}/${endPoint}`;
    const host = url.substring(url.indexOf('://') + 3).split('/')[0];

    //validate data
    const body =
      data && data instanceof FormData
        ? data
        : data
        ? JSON.stringify(data)
        : null;
    console.log(url);
    return fetch(url, {
      method: method,
      headers: {...this.headers, host},
      body,
    })
      .then(response => {
        const {status} = response;
        if (status === 401 && this.errorHandler) {
          this.errorHandler(response);
        }
        if (this.successHandler) {
          this.successHandler(response);
        }
        return response.json();
      })
      .then(json => {
        return json;
      })
      .catch(error => {
        if (error.message!.startsWith('JSON Parse error')) {
          return {message: 'success'};
        }
        if (this.errorHandler) {
          this.errorHandler(error);
        }
        throw error;
      });
  }

  get(endPoint: string, params?: any): Promise<Response> {
    let mergerEndPoint = endPoint;
    if (params) {
      mergerEndPoint += '?' + this.objToQueryString(params);
    }
    return this.request('GET', mergerEndPoint);
  }

  post(endPoint: string, data?: any): Promise<Response> {
    return this.request('POST', endPoint, data);
  }

  put(endPoint: string, data: any): Promise<Response> {
    return this.request('PUT', endPoint, data);
  }

  delete(endPoint: string, data?: any): Promise<Response> {
    return this.request('DELETE', endPoint, data);
  }

  objToQueryString(queries: any) {
    return Object.keys(queries)
      .reduce((result, key) => {
        return [
          ...result,
          `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`,
        ];
      }, [] as string[])
      .join('&');
  }
}