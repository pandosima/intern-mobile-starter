import BaseService from '@services/BaseService';

class DeviceService extends BaseService {
  constructor() {
    super('devices');
  }

  verify(formData: any) {
    return this.request().post(`${this.entity}/verify`, formData);
  }

  invite(formData: any) {
    const options =
    formData instanceof FormData
      ? {
          headers: {'Content-Type': 'multipart/form-data'},
        }
      : {};
    return this.request(options).post(`${this.entity}/invite`, formData);
  }
}

export default new DeviceService();
