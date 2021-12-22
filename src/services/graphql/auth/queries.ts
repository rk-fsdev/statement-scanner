import { gql } from '@apollo/client';
import { AccountFragment } from './fragments';

export const GET_ME = gql`
  query getMe {
    me {
      ...Account
    }
  }
  ${AccountFragment}
`;
