import { gql } from '@apollo/client';
import { MerchantFragment } from '../merchant/fragment';
import { CustomFeeFragment } from '../auth/fragments';

export const ParsedFeeFragment = gql`
  fragment ParsedFee on ParsedFee {
    amount
    ccType
    fixedFee
    name
    percentFee
    transactions
    valid
  }
`;

export const MerchantQuoteFragment = gql`
  fragment MerchantQuote on MerchantQuote {
    avgTicket
    discountRate
    effectiveRate
    estProfit
    estSavings
    totalFees
  }
`;

export const StatementFragment = gql`
  fragment Statement on Statement {
    createdAt
    documentUrls
    id
    parsedAddress
    parsedEndPeriod
    parsedMerchantName
    parsedMerchantNumber
    parsedStartPeriod
    parsedTotal
    parsedTotalFees
    state
    suggestedMerchantCategory {
      code
      id
      name
    }
    merchant {
      ...Merchant
    }
    parsedInterchangeFees {
      ...ParsedFee
    }
    parsedProcessingFees {
      ...ParsedFee
    }
    merchantQuote {
      ...MerchantQuote
    }
    customFees {
      ...CustomFee
    }
    transactions
  }
  ${MerchantFragment}
  ${ParsedFeeFragment}
  ${MerchantQuoteFragment}
  ${CustomFeeFragment}
`;
