import { gql } from '@apollo/client';
import { StatementFragment } from './fragment';
import { CustomFeeFragment } from '../auth/fragments';

export const STATEMENT_CREATE = gql`
  mutation StatementCreate($input: StatementInput!) {
    statementCreate(input: $input) {
      ...Statement
    }
  }
  ${StatementFragment}
`;

export const QUOTE_CREATE = gql`
  mutation QuoteCreate($id: ID!, $input: MerchantQuoteInput!) {
    quoteCreate(id: $id, input: $input) {
      ...Statement
    }
  }
  ${StatementFragment}
`;

export const STATEMENT_CUSTOM_FEE_CREATE = gql`
  mutation StatementCustomFeeCreate($input: CustomFeeInput!, $statementId: ID!) {
    statementCustomFeeCreate(input: $input, statementId: $statementId) {
      ...CustomFee
    }
  }
  ${CustomFeeFragment}
`;

export const STATEMENT_CUSTOM_FEE_DELETE = gql`
  mutation StatementCustomFeeDelete($id: ID!) {
    statementCustomFeeDelete(id: $id) {
      ...CustomFee
    }
  }
  ${CustomFeeFragment}
`;
