import { gql } from '@apollo/client';

export const CustomFeeFragment = gql`
  fragment CustomFee on CustomFee {
    amount
    applicability
    id
    name
    type
  }
`;

export const PaymentSetupFragment = gql`
  fragment PaymentSetup on PaymentSetup {
    id
    paymentMethodId
  }
`;

export const AccountFragment = gql`
  fragment Account on Account {
    customFees {
      ...CustomFee
    }
    paymentSetup {
      ...PaymentSetup
    }
    email
    fixedFee
    id
    name
    percentFee
  }
  ${CustomFeeFragment}
  ${PaymentSetupFragment}
`;
