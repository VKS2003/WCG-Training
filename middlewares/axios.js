import { default as axios } from 'axios';
import { winLogger } from '../winston.js';

axios.defaults.baseURL='https://testapi.demoserver.biz/api/settings'

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    winLogger('request').info({url:config.url,method:config.method})
    return config;
  }, function (error) {
    // Do something with request error
    winLogger('request').error({status:error.request.status,message:error.request.statusText})
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    winLogger('response').info({status:response.status,data:response.data})
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    winLogger('response').error({status:error.response.status,message:error.response.statusText})
    return Promise.reject(error);
});
  
export const getAddressData = async ( url, data ) => {
    try {
        return await axios({
            method: 'post',
            url,
            data
        });
    } catch (error) {
        next(error)
    }
}