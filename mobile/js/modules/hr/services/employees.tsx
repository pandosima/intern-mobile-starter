import BaseService from '../../../services/BaseService';

class EmployeeService extends BaseService {
  constructor() {
    super('employees');
  }

  leaveRequestByEPloyeeId(id: any){
    return this.request().get(`${this.entity}/${id}/leave-request`);
  }

  sendInvitation(id: any){
    return this.request().post(`${this.entity}/${id}/invite`);
  }

  verify(data: any){
    return this.request().post(`${this.entity}/verify`, data);
  }
}

export default new EmployeeService();
