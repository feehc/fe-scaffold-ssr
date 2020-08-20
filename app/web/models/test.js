export default {
  namespace: 'test',
  state: {
    time: null,
  },

  effects: {},

  reducers: {
    test(state, { payload }) {
      state.time = payload;
    },
  },
};
