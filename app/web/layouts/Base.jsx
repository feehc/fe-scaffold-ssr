import React, { useEffect } from 'react';
import { connect } from 'umi';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import ViewportProvider from '@/components/ViewportProvider';

const Layout = ({ currentUser, dispatch, children }) => {

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

export default connect(({ user = {} }) => ({ currentUser: user.currentUser }))(Layout);
