import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { Socket as PhoenixSocket } from 'phoenix';

const WS_URL = process.env.REACT_APP_WS_URL;

export default createAbsintheSocketLink(
  AbsintheSocket.create(
    new PhoenixSocket(WS_URL, {
      params: () => {
        const token = localStorage.getItem('token');
        return {
          token: `${token}` || '',
        };
      },
    })
  )
);
