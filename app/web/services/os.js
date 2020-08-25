import request from '@/utils/request';

/**
 * 获取后台操作系统信息
 * 
 * @param {JSON} params 参数
 * @param {JSON} options 请求设置
 */
export async function osInfo(params, options = {}) {
  return request('/api/sys/current/time', {
    ...options,
    method: 'GET',
  });
}
