import request from '../utils/request'
export function getPittCsvToInfluxDBProducerStatus() {
    return request[2].get(`/kafkaProducer_api/status`);
}
//
export function startPittCsvToInfluxDBProducerProgress(entity) {
    return request[2].post(`/kafkaProducer_api/importCSV`,entity);
}

export function startPittCsvToInfluxDBProducer() {
    return request[0].get(`/puser/startProducer`);
}
export function stopPittCsvToInfluxDBProducer() {
    return request[0].get(`/puser/stopProducer`);
}
export function startPittCsvToInfluxDBConsumer() {
    return request[0].get(`/puser/startCvsToInfluxDBConsumer`);
}
export function stopPittCsvToInfluxDBConsumer() {
    return request[0].get(`/puser/stopCvsToInfluxDBConsumer`);
}
export function startLaCsvToInfluxDBProducer() {
    return request[1].get(`/puser/startProducer`);
}
export function stopLaCsvToInfluxDBProducer() {
    return request[1].get(`/puser/stopProducer`);
}
//post 要改成get
export function getPittCsvToInfluxDBConsumerStatus() {
    return request[3].post(`/kafkaConsumer_api/searchConsumerConfig`);
}
export function getPittCsvToInfluxDBConsumerProgress() {
    return request[3].get(`/kafkaConsumer_api/checkProcess`);
}
export function setPittCsvToInfluxDBConsumer(entity) {
    return request[3].post(`/kafkaConsumer_api/ConsumerConfig`,entity);
}