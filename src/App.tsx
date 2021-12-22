import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Login, SignUp, Mids, StatementPage } from './pages';
import PrivateRoute from 'components/routes/PrivateRoute';
import {
  AppContext,
  appReducer,
  appInitialState,
  AppActionTypes,
} from 'services/context/appContext';
import { useQuery } from '@apollo/client';

import { Header, Container, Navbar, MainLayout } from 'components/grid';
import { CustomModal } from 'components/modal';
import { GET_ME } from 'services/graphql/auth/queries';
import LoadingSpinner from 'components/loading/LoadingSpinner';
import AnalysisPage from 'pages/Analysis';
import QuoteList from 'pages/QuoteList';
import Profile from 'pages/Profile';
import Quoting from 'pages/Quoting';
import GeneratedQuote from 'pages/GeneratedQuote';
import './App.css';

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(appReducer, appInitialState);
  const { isModalOpen, modalContent: ModalContent, modalTitle } = state;
  const { loading: userLoading, data: userData, error } = useQuery<{ me: Account }, null>(GET_ME, {
    variables: null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const onClose = () => {
    dispatch({
      type: AppActionTypes.SET_MODAL_OPEN,
      payload: {
        isModalOpen: false,
      },
    });
  };

  React.useEffect(() => {
    if (userData) {
      if (userData.me) {
        dispatch({ type: AppActionTypes.SET_AUTHENTICATED, payload: { isAuthenticated: true } });
      } else {
        setLoading(false);
      }
    }
  }, [userData, dispatch]);

  React.useEffect(() => {
    if (state.isAuthenticated) {
      setLoading(false);
    }
  }, [state.isAuthenticated]);

  if (error) return <div>Something went wrong, due to api</div>;
  if (userLoading || loading) return <LoadingSpinner />;

  return (
    <div className="App">
      <AppContext.Provider value={{ state, dispatch }}>
        <Container>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/sign-up" component={SignUp} />
              <MainLayout>
                <PrivateRoute exact path="/mids" component={Mids} />
                <PrivateRoute exact path="/statements" component={StatementPage} />
                <PrivateRoute exact path="/statements/:id" component={AnalysisPage} />
                <PrivateRoute exact path="/quoting" component={QuoteList} />
                <PrivateRoute exact path="/quoting/:id" component={GeneratedQuote} />
                <PrivateRoute exact path="/quoting/:id/generate" component={Quoting} />
                <PrivateRoute exact path="/profile" component={Profile} />
              </MainLayout>
              <Redirect to="/login" />
            </Switch>
            <Navbar />
            <CustomModal
              isOpen={isModalOpen}
              onClose={onClose}
              title={modalTitle}
              component={ModalContent}
            />
          </Router>
        </Container>
      </AppContext.Provider>
    </div>
  );
};
export default App;
