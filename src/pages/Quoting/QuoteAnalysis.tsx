import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, BoxProps, Text, Flex, Button, Divider } from '@chakra-ui/core';

import { Statement } from 'model/statement';
import { BlockContainer, BlockHeader, BlockBody } from 'components/grid';
import { parentAnalysisTextProps } from 'components/text/textProps';
import { getFormattedCurrency, calcParsedIFeeSum } from 'utils/statement';
import { QuoteMethodType, QuotingInputValue, MerchantQuote } from 'model/shared';
import { calcQuote, computeCustomFeeProRated } from 'utils/quote';
import { useMutation } from '@apollo/client';
import { QUOTE_CREATE } from 'services/graphql/statement/mutation';
import { Account } from 'model/auth';

interface Props extends BoxProps {
  data: Statement;
  quotingMethod: QuoteMethodType;
  inputValues: QuotingInputValue;
  account: Account;
}

const QuoteAnalysis: React.FC<Props> = ({
  data,
  quotingMethod,
  inputValues,
  account,
  ...restProps
}: Props) => {
  const history = useHistory();
  const { id } = useParams();
  const [presentQuote] = useMutation<
    { quoteCreate: Statement },
    { id: string; input: MerchantQuote }
  >(QUOTE_CREATE);

  const parsedTotalFees = parseFloat(data.parsedTotalFees) || 0;
  const originalEffectiveRate =
    (parseFloat(data.parsedTotalFees) / parseFloat(data.parsedTotal)) * 100;
  const monthlySavingsTarget = parseFloat(inputValues[quotingMethod].monthlySavingsTarget) || 0;
  const monthlyProfitTarget = parseFloat(inputValues[quotingMethod].monthlyProfitTarget) || 0;
  const percentFeePerTransaction =
    parseFloat(inputValues[quotingMethod].percentFeePerTransaction) || 0;
  const fixedFeePerTransaction = parseFloat(inputValues[quotingMethod].fixedFeePerTransaction) || 0;
  const profilePercentFee = parseFloat(account.percentFee) || 0;
  const profileFixedFee = parseFloat(account.fixedFee) || 0;
  const transactions = data.transactions || 0;
  const parsedTotal = parseFloat(data.parsedTotal) || 0;
  const parsedInterchangeFeeSum = calcParsedIFeeSum(data.parsedInterchangeFees);
  const customFeeNAmount = computeCustomFeeProRated(
    data.customFees,
    parsedTotal,
    data.transactions
  );
  const profileCustomFeeNAmount = computeCustomFeeProRated(
    account.customFees,
    parsedTotal,
    data.transactions
  );

  const calcResult = calcQuote(
    quotingMethod,
    parsedTotalFees,
    percentFeePerTransaction,
    fixedFeePerTransaction,
    profilePercentFee,
    profileFixedFee,
    transactions,
    parsedTotal,
    customFeeNAmount,
    profileCustomFeeNAmount,
    monthlySavingsTarget,
    monthlyProfitTarget,
    parsedInterchangeFeeSum
  );
  const {
    estSavings,
    estProfit,
    effectiveRate: estEffectiveRate,
    totalFees: estTotalFees,
    avgTicket,
  } = calcResult;

  const handlePresentQuoteClick = async () => {
    try {
      await presentQuote({
        variables: {
          id: data.id,
          input: calcResult,
        },
      });
      history.push(`/quoting/${id}`);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Box {...restProps}>
      <BlockContainer>
        <BlockHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Text as="p" fontSize="md" fontWeight="900" color="customGreen.500" isTruncated>
              Quote Calculator
            </Text>
            <Button
              variantColor="green"
              variant="solid"
              fontSize="sm"
              padding="5px 5px"
              onClick={handlePresentQuoteClick}
            >
              Present Quote
            </Button>
          </Flex>
        </BlockHeader>
        <BlockBody backgroundColor="customGray.5">
          <Text {...parentAnalysisTextProps} textAlign="center">
            Current Pricing
          </Text>
          <Flex justifyContent="space-between">
            <Text {...parentAnalysisTextProps}>Total Fees</Text>
            <Text {...parentAnalysisTextProps}>{getFormattedCurrency(parsedTotalFees)}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text {...parentAnalysisTextProps}>Effective Rate</Text>
            <Text {...parentAnalysisTextProps}>{`${originalEffectiveRate.toFixed(2)}%`}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text {...parentAnalysisTextProps}>Avg.Ticket</Text>
            <Text {...parentAnalysisTextProps}>{getFormattedCurrency(parseFloat(avgTicket))}</Text>
          </Flex>
        </BlockBody>
        <BlockBody>
          <Text {...parentAnalysisTextProps} textAlign="center">
            Proposed Pricing
          </Text>
          <Flex justifyContent="space-between">
            <Text {...parentAnalysisTextProps}>Est.Total Fees</Text>
            <Text {...parentAnalysisTextProps}>
              {getFormattedCurrency(parseFloat(estTotalFees))}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text {...parentAnalysisTextProps}>
              {quotingMethod === QuoteMethodType.CashDiscount
                ? 'Est.Discount Rate'
                : 'Est.Effective Rate'}
            </Text>
            <Text {...parentAnalysisTextProps}>{estEffectiveRate}%</Text>
          </Flex>
          <Divider width="100%" margin="0px 0px 5px 0px" />
          <Flex justifyContent="space-between">
            <Text {...parentAnalysisTextProps}>Est. Profit</Text>
            <Text {...parentAnalysisTextProps}>{`${getFormattedCurrency(
              parseFloat(estProfit)
            )}`}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text {...parentAnalysisTextProps}>Est. Savings</Text>
            <Text {...parentAnalysisTextProps}>{`${getFormattedCurrency(
              parseFloat(estSavings)
            )}`}</Text>
          </Flex>
        </BlockBody>
      </BlockContainer>
    </Box>
  );
};

export default QuoteAnalysis;
