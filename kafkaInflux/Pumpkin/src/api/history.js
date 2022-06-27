import request from '../utils/request'
export function searchHistoryByQuery(entity) {
    return request[3].post(`/kafkaConsumer_api/checkAllCsvStreamingByQuery`,entity);
}
export function searchAllScheduleTaskByQuery(entity) {
    return request[2].post(`/kafkaProducer_api/checkAllScheduleTaskByQuery`,entity);
}
export function searchAllStreamingFailure(entity) {
    return request[3].post(`/kafkaConsumer_api/checkStreamingFailureByEid`,entity);
}