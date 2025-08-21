import Http, {HttpOptions} from '../../../services/Http';

class OauthService {
  get entity() {
    return 'employees';
  }

  get httpOptions(): HttpOptions {
    return {
      headers: {
        Accept: 'application/json'
      }
    } as HttpOptions;
  }

  get multipartHTTPOptions(): HttpOptions {
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    } as HttpOptions;
  }

  login(username: string, password: string): Promise<Response> {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('username', username);
    return new Http(this.multipartHTTPOptions).post(
      `${this.entity}/login`,
      formData,
    );
  }

  logout(access_token: string, refresh_token: string): Promise<any> {
    const formData = new FormData();
    formData.append('access_token', access_token);
    formData.append('refresh_token', refresh_token);
    return new Http(this.multipartHTTPOptions).post(
      `${this.entity}/logout`,
      formData,
    );
  }

  async refressToken(refresh_token: string): Promise<any> {
    const formData = new FormData();
    formData.append('refresh_token', refresh_token);
    return new Http(this.multipartHTTPOptions).post(
      `${this.entity}/refresh-token`,
      formData,
    );
  }
  register(
    firstname: string,
    lastname: string,
    email: string,
    plan: 'starter' | 'premium' | 'standard'
  ): Promise<Response> {
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('plan', plan);
    return new Http(this.multipartHTTPOptions).post(`${this.entity}/register`, formData);
  }

  userinfo(): Promise<Response> {
    return new Http(this.multipartHTTPOptions).get(`${this.entity}/userinfo`)
  }

  getScopes(): Promise<Response> {
    return new Http(this.httpOptions).get(`${this.entity}/scopes`)
  }
}

export default new OauthService();
