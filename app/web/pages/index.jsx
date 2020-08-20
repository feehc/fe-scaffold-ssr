import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';

const Home = ({ time, dispatch }) => {
  const refreshTime = () => {
    dispatch({
      type: 'test/test',
      payload: `这是在客户端渲染的时间：${(new Date()).getTime()}`,
    });
  };

  return (
    <div>
      <div>{time}</div>
      <Button type="primary" onClick={refreshTime}>Refresh Time</Button>
    </div>
  );
};

Home.getInitialProps = async ctx => {
  const { store, isServer } = ctx;
  if (!isServer) { return; }
  await store.dispatch({
    type: 'test/test',
    payload: `这是在服务端渲染的时间：${(new Date()).getTime()}`,
  });
  const { test } = store.getState();
  return { test };
};

export default connect(({ test }) => ({ time: test.time }))(Home);