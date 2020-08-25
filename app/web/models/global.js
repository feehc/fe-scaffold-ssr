import * as agencyApi from '@/services/agency';
import * as osApi from '@/services/os';

export default {
  namespace: 'global',
  state: {
    os: {},
    agency: {
      topMenu: [],
      bottomMenu: [],
    },
  },

  effects: {
    *os({ protocol, host, domain }, { call, put }) {
      const res = yield call(osApi.osInfo, {}, { protocol, host, domain });
      yield put({
        type: 'save',
        payload: {
          os: res && res.data || {},
        }
      });
    },
    *agency({ protocol, host, domain }, { call, put }) {
      const agencyRes = yield call(agencyApi.agencyInfo, {}, { protocol, host, domain });
      const topMenuRes = yield call(agencyApi.menuInfo, { layout: 'layout_top' }, { protocol, host, domain });
      const bottomMenuRes = yield call(agencyApi.menuInfo, { layout: 'layout_bottom' }, { protocol, host, domain });
      yield put({
        type: 'save',
        payload: {
          agency: {
            ...agencyRes && agencyRes.data || {},
            topMenu: topMenuRes && topMenuRes.data || {},
            bottomMenu: bottomMenuRes && bottomMenuRes.data || {},
          },
        }
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
