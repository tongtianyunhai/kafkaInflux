import instance from '../utils/request'
export function searchCustomer(sid) {
    return instance.get(`/puser/searchCustomerById/${sid}`);
}