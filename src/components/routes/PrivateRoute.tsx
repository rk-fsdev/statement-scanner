import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AppContext } from 'services/context/appContext';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...restProps }: RouteProps) => {
  return (
    <AppContext.Consumer>
      {({ state: { isAuthenticated } }) => {
        if (isAuthenticated) {
          return <Route component={Component} {...restProps} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    </AppContext.Consumer>
  );
};

export default PrivateRoute;
