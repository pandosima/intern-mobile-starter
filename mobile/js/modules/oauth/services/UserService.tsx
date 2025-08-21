import BaseService from '../../../services/BaseService';

class UserService extends BaseService {
  constructor() {
    super(`employees`);
  }

  userinfo(): Promise<Response> {
    return this.request().get(`${this.entity}/userinfo`);
  }

  getScopes(): Promise<Response> {
    return this.request().get(`${this.entity}/scopes`);
  }
}

export default new UserService();
