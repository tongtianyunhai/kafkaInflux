import instance from '../utils/request'
export function addEntity(entity) {
    return instance.post(`/puser/save`, entity);
}
export function addCustomerInfo(entity) {
    return instance.post(`/pcustomer/save`, entity);
}
export function searchUid(searchParams) {
    return instance.get(`/puser/selectUid`,{params:searchParams});
}
export function resetPassWord(searchParams) {
    return instance.get(`/puser/sendEmail`,{params:searchParams});
}