import { gql } from '@apollo/client';

export const MerchantFragment = gql`
  fragment Merchant on Merchant {
    address
    businessName
    id
    number
    ownerEmail
    ownerName
    ownerPhone
    merchantCategory {
      id
      code
      name
    }
  }
`;
