import { gql } from '@apollo/client';
import { StatementFragment } from './fragment';

export const STATEMENT_UPDATE = gql`
  subscription StatementUpdate($id: ID!) {
    statementUpdated(id: $id) {
      ...Statement
    }
  }
  ${StatementFragment}
`;
