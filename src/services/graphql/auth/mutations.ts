import { gql } from '@apollo/client';
import { AccountFragment, CustomFeeFragment } from './fragments';

export const LOGIN_SUBMIT = gql`
  mutation LoginSubmit($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      token
      account {
        ...Account
      }
    }
  }
  ${AccountFragment}
`;

export const ACCOUNT_CREATE = gql`
  mutation AccountCreate($input: AccountCreateInput!) {
    accountCreate(input: $input) {
      token
      account {
        ...Account
      }
    }
  }
  ${AccountFragment}
`;

export const ACCOUNT_CUSTOM_FEE_CREATE = gql`
  mutation AccountCustomFeeCreate($input: CustomFeeInput!) {
    accountCustomFeeCreate(input: $input) {
      ...CustomFee
    }
  }
  ${CustomFeeFragment}
`;

export const ACCOUNT_CUSTOM_FEE_DELETE = gql`
  mutation AccountCustomFeeDelete($id: ID!) {
    accountCustomFeeDelete(id: $id) {
      ...CustomFee
    }
  }
  ${CustomFeeFragment}
`;

export const ACCOUNT_EXTRA_SETTINGS_UPDATE = gql`
  mutation AccountExtraSettingsUpdate($input: AccountExtraSettingsInput!) {
    accountExtraSettingsUpdate(input: $input) {
      ...Account
    }
  }
  ${AccountFragment}
`;

export const ACCOUNT_EMAIL_UPDATE = gql`
  mutation AccountEmailUpdate($input: AccountEmailInput!) {
    accountEmailUpdate(input: $input) {
      ...Account
    }
  }
  ${AccountFragment}
`;
