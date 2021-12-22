import { gql } from '@apollo/client';
import { StatementFragment } from './fragment';

export const STATEMENT_BY_ID = gql`
  query StatementById($id: ID!) {
    statement(id: $id) {
      ...Statement
    }
  }
  ${StatementFragment}
`;

export const STATEMENTS_ALL = gql`
  query AllStatements {
    statements {
      ...Statement
    }
  }
  ${StatementFragment}
`;
