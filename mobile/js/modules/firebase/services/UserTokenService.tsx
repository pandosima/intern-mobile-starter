import BaseService from "../../../services/BaseService";

class UserTokenService extends BaseService {
    constructor() {
        super("user-tokens");
    }
}

export default new UserTokenService();