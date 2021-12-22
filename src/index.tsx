import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import customTheme from './styles/theme';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import client from 'services/graphql/client';

ReactDOM.render(
  <ThemeProvider theme={customTheme}>
    <CSSReset />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
