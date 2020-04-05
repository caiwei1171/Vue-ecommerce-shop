import axios from 'axios'
// import {Message,MessageBox,Loading} from 'element-ui'
// import store from '@/store'
// import {getToken} from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/', // api的base_url
  timeout: 15000 // request timeout
})

// const loadingOpts = {
//   fullscreen:true,
//   text:'耐心哦...马上就好了...'
// }

// let loadding;

// 引入要使用的nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// axios请求拦截,前端发起请求之前拦截
service.interceptors.request.use(config => {
    // 在request拦截器中显示进度条NProgress.start(); 
    NProgress.start();
    if(sessionStorage.getItem("token")){
        config.headers['Authorization'] = sessionStorage.getItem("token");
    }
//   loadding = Loading.service(loadingOpts);

//   // Do something before request is sent
//   if (store.getters.token) {
//     config.headers['Authorization'] = getToken();
//     //config.params = {'sysToken': getToken()}; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//   }

//   // config.data = JSON.stringify(config.data);
//   //config.headers = {'Content-Type': 'application/x-www-form-urlencoded'};

//   if (config.headers.post['Content-Type'] ==  'application/x-www-form-urlencoded') {
//       config.transformRequest = [function (data) {
//       let ret = '';
//       for (let it in data) {
//         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//       }
//       return ret;
//     }]
//   }

  return config
}, error => {
//   loadding.close();
//   console.log(error) // for debug
  Promise.reject(error)
})

// axios响应拦截,后端返回响应后拦截
service.interceptors.response.use(response => {
    // 在response拦截器中隐藏进度条 NProgress.done();
    NProgress.done();
    // loadding.close();
    // const res = response.data;
    // if (res.code == 40000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   });
    //   return Promise.reject(res.message);
    // }
    const res = response.data 
    return res;
  },
  error => {
    // loadding.close();
    // const res = error.response;
    // if(res.status === 403) {
    //   MessageBox.alert({
    //     title:'警告',
    //     type: 'warning',
    //     message: '权限不足'
    //   });
    // }
    // if(res.status === 401) {
    //   MessageBox.alert('登录超时,请重新登录', {
    //       title: '警告',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload();// 为了重新实例化vue-router对象 避免bug
    //       });
    //     })
    // }
    /*console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })*/
    return Promise.reject(error)
  })

/**
 * get
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: params
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * post请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: 'POST',
      url: url,
      data: data
    }).then(response => {
      resolve(response);
    })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * patch请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, error => {
        reject(error);
      });
  });
}

/**
 * put请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.put(url, data)
      .then(response => {
        resolve(response.data);
      }, error => {
        reject(error);
      });
  });
}

export default service
