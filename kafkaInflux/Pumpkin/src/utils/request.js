import { Notification } from 'element-ui';
//1.导入axios
import axios from 'axios';
//2.创建axios实例  instance
function request(config) {
    //server manager pitts
    const instance1 = axios.create({
        baseURL:  'http://localhost:8080',
        timeout: 10000,
        headers: {'X-Custom-Header': 'foobar'}
    });
    //server manager la
    const instance2 = axios.create({
        baseURL:  'http://localhost:8070',
        timeout: 10000,
        headers: {'X-Custom-Header': 'foobar'}
    });
    //8050 pitt producer
    const instance3 = axios.create({
        baseURL:  'http://localhost:8050',
        timeout: 10000,
        headers: {'X-Custom-Header': 'foobar'}
    });
    //8040 pitt consumer
    const instance4 = axios.create({
        baseURL:  'http://localhost:8040',
        timeout: 10000,
        headers: {'X-Custom-Header': 'foobar'}
    });
//3.配置拦截器
// Add a request interceptor
    instance1.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    instance2.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    instance3.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    instance4.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
// Add a response interceptor
    instance1.interceptors.response.use(function (response) {
        let {status,message,data} = response.data;
        if (status == 20000){
            return data;
        } else {
            Notification.error(message);
            return Promise.reject(false);
        }
    }, function (error) {
        return Promise.reject(error);
    });
    instance2.interceptors.response.use(function (response) {
        let {status,message,data} = response.data;
        if (status == 20000){
            return data;
        } else {
            Notification.error(message);
            return Promise.reject(false);
        }
    }, function (error) {
        return Promise.reject(error);
    });
    instance3.interceptors.response.use(function (response) {
        let {status,message,data} = response.data;
        if (status == 20000){
            return data;
        } else {
            Notification.error(message);
            return Promise.reject(false);
        }
    }, function (error) {
        return Promise.reject(error);
    });
    instance4.interceptors.response.use(function (response) {
        let {status,message,data} = response.data;
        if (status == 20000){
            return data;
        } else {
            Notification.error(message);
            return Promise.reject(false);
        }
    }, function (error) {
        return Promise.reject(error);
    });
    return [instance1,instance2,instance3,instance4]
}

export default request();