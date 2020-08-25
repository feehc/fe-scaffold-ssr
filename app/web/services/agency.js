import { stringify } from 'querystring';
import request from '@/utils/request';

/**
 *  获取机构信息
 * 
 * @param {JSON} params 参数
 * @param {JSON} options 请求设置
 */
export async function agencyInfo(params, options = {}) {
  return request('/api/agency/core/web/info', {
    ...options,
    method: 'GET',
  });
}

/**
 *  获取菜单信息
 * 
 * @param {JSON} params 参数
 * @param {JSON} options 请求设置
 */
export async function menuInfo(params, options = {}) {
  return request(`/api/agency/core/nav/list?${stringify(params)}`, {
    ...options,
    method: 'GET',
  });
}
