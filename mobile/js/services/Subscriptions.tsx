import BaseService from './BaseService';

class SubscriptionService extends BaseService {
  constructor(business_id: string) {
    const path = `businesses/${business_id}/subscriptions`;
    super(path);
  }

  getPlans() {
    return this.request().get(`${this.entity}/plans`);
  }

  getServices() {
    return this.request().get(`${this.entity}/services`);
  }
}

export default SubscriptionService;