import React from 'react';
import {routerRedux, Switch, Route } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import HomePage from './routes/Pages/HomePage';
import styles from './index.less';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const DashboardLayout = routerData['/'].component;

  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <AuthorizedRoute
            exact path="/"
            render={props => <HomePage {...props} />}
            authority="guest"
            redirectPath="/dashboard"
          />
          <AuthorizedRoute
            path="/user"
            render={props => <UserLayout {...props} />}
            authority="guest"
            redirectPath="/"
          />
          <AuthorizedRoute
            path="/"
            render={props => <DashboardLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
