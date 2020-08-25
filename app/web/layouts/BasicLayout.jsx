import React, { useEffect } from 'react';
import { connect } from 'umi';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import ViewportProvider from '@/components/ViewportProvider';

const BasicLayout = ({ currentUser, dispatch, children }) => {

  useEffect(() => {
    dispatch({
      type: 'user/fetchCurrent',
    });
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <ViewportProvider>
        <div style={{ textAlign: 'center' }}>
          {currentUser && currentUser.userId
            ? `当前登陆人：${currentUser.userName}`
            : '未登陆，登陆中...'
          }
          {children}
        </div>
      </ViewportProvider>
    </ConfigProvider>
  );
};

BasicLayout.getInitialProps = async (ctx) => {
  const { store: { dispatch, getState }, protocol, host, domain } = ctx;
  console.log('BasicLayout.getInitialProps')
  await dispatch({
    type: 'global/os',
    protocol,
    host,
    domain,
  });
  await dispatch({
    type: 'global/agency',
    protocol,
    host,
    domain,
  });
  // 开启forceInitial模式下，无需返回state
  const { global } = getState();
  return { global };
};

export default connect(({ user = {} }) => ({ currentUser: user.currentUser }))(BasicLayout);
