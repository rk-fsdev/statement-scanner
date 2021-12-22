import { gql } from '@apollo/client';

export const PAYMENT_SETUP_INTENT_CREATE = gql`
  mutation PaymentSetupIntentCreate {
    paymentSetupIntentCreate {
      clientSecret
      id
    }
  }
`;

export const PAYMENT_METHOD_CREATE = gql`
  mutation PaymentMethodCreate($input: PaymentMethodCreateInput!) {
    paymentMethodCreate(input: $input)
  }
`;
