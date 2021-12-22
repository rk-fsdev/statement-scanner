import React from 'react';
import { AppContext } from 'services/context/appContext';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const AuthenticatedContainer: React.FC<Props> = ({ children }: Props) => {
  return (
    <AppContext.Consumer>
      {({ state: { isAuthenticated } }) => {
        if (isAuthenticated) {
          return <>{children}</>;
        }
      }}
    </AppContext.Consumer>
  );
};

export default AuthenticatedContainer;
