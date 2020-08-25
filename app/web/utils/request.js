/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { isBrowser } from 'umi';
import { notification } from 'antd';
import { ROOT } from '@/utils/constants';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if (isBrowser()) {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    } else {
      console.error(errorText);
    }
  } else if (!response) {
    if (isBrowser()) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    } else {
      console.error('您的网络发生异常，无法连接服务器');
    }
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  const { protocol = 'http', host = '', domain = '' } = options;
  delete options.protocol;
  delete options.host;
  delete options.domain;
  if (process.env.NODE_ENV === 'development') {
    url = isBrowser() ? `${ROOT}${url}` : `${process.env.SOCKET_SERVER}${ROOT}${url}`;
  } else {
    url = isBrowser() ? `${ROOT}${url}` : `${protocol}://${host}${ROOT}${url}`;
  }
  return {
    url,
    options: {
      ...options,
      headers: {
        ...options.headers,
        'Domain-Name': isBrowser() ? document.domain : domain,
        token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySnNvbiI6IntcImFnZW5jeUlkXCI6MSxcImFnZW5jeU5hbWVcIjpcIui-ieeoi-aVmeiCslwiLFwiaGVhZEltZ1wiOlwiXCIsXCJsb2dpblRpbWVcIjoxNTk3MTM5MjgzNjU1LFwibmFtZVwiOlwi5ZSQ57uF5aOrXCIsXCJzdXBlckFkbWluXCI6ZmFsc2UsXCJ1c2VySWRcIjoxLFwidXNlck5hbWVcIjpcInRhbmdsaVwiLFwidXNlclR5cGVcIjozfSJ9.rL1lO0ch8ycNUGUUCrRZbaqr2y_Zc1Cop_pKFMfP3Q0',
      },
    },
  };
});

export const download = async (url, options = {}) => {
  const { response } = await request(url, {
    ...options,
    getResponse: true,
  });
  const contentType = decodeURIComponent(response.headers.get('content-type'));
  const contentDisposition = response.headers.get('content-disposition');
  const filename = contentDisposition.match(/filename=([^;]*)/)[1];
  const a = document.createElement('a'); // eslint-disable-line
  response.blob().then(blob => {
    const $url = window.URL.createObjectURL(blob); // eslint-disable-line
    a.href = $url;
    a.download = filename || `${new Date().getTime()}`;
    a.click();
    window.URL.revokeObjectURL($url); // eslint-disable-line
  });
};

export default request;