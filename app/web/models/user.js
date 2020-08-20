const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent(_, { put }) {
      const res = yield new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 1,
            data: {
              userId: 1,
              userName: 'ALL MONEY MONEY GO MY HOME',
            },
          });
        }, 1000);
      });
      if (res && res.code === 1) {
        yield put({
          type: 'saveCurrentUser',
          payload: res.data || {},
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
  },
};
export default UserModel;
