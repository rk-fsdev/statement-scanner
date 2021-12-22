import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { BoxProps, Box, Flex, Text, Button } from '@chakra-ui/core';

import EstimatedSavings from './EstimatedSavings';
import QuotePricing from './QuotePricing';
import { childAnalysisTextProps } from 'components/text/textProps';
import SuspiciousFeesBlock from 'pages/Analysis/SuspiciousFeesBlock';
import { Statement } from 'model/statement';
import { STATEMENT_BY_ID } from 'services/graphql/statement/queries';
import LoadingSpinner from 'components/loading/LoadingSpinner';
import { calcParsedIFeeSum } from 'utils/statement';
import { GET_ME } from 'services/graphql/auth/queries';
import { Account } from 'model/auth';
import { FiArrowLeft } from 'react-icons/fi';
import { computeCustomFeeProRated } from 'utils/quote';

const GeneratedQuote: React.FC<BoxProps> = ({ ...restProps }: BoxProps) => {
  const { id } = useParams();
  const history = useHistory();

  const { data, loading, error } = useQuery<{ statement: Statement }, { id: string }>(
    STATEMENT_BY_ID,
    {
      variables: { id },
    }
  );
  const { data: userData } = useQuery<{ me: Account }, null>(GET_ME, {
    variables: null,
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Something went wrong</div>;
  if (!data) return <div>Statement does not exist.</div>;
  if (data && !data.statement.merchantQuote) return <div>Presented quote does not exist.</div>;

  const {
    merchantQuote: { effectiveRate: estEffectiveRate, estSavings, estProfit },
    parsedAddress,
    createdAt,
    parsedInterchangeFees,
    parsedTotalFees,
    transactions,
    parsedTotal,
  } = data.statement;
  let fixedFee = 0,
    percentFee = 0;
  const effectiveRate = (parseFloat(parsedTotalFees) / parseFloat(parsedTotal)) * 100;

  if (userData && userData.me) {
    fixedFee = parseFloat(userData.me.fixedFee);
    percentFee = parseFloat(userData.me.percentFee);
  }

  const parsedInterchangeFeeSum = calcParsedIFeeSum(parsedInterchangeFees);

  const profileCustomFeeNAmount = computeCustomFeeProRated(
    data.statement.customFees,
    parseFloat(parsedTotal),
    transactions
  );
  const monthlyFees = parseFloat(parsedTotalFees) - parsedInterchangeFeeSum;
  const estMonthlyFees =
    parseFloat(estProfit) +
    (parseFloat(parsedTotal) * percentFee) / 100 +
    transactions * fixedFee +
    profileCustomFeeNAmount;

  const goBack = () => {
    history.push(`/quoting/${id}/generate`);
  };

  return (
    <Box {...restProps}>
      <Flex justifyContent="flex-start" alignItems="center" margin="10px 0px">
        <Button
          variant="solid"
          variantColor="gray"
          backgroundColor="customGray.10"
          borderRadius="50%"
          padding="0px 0px"
          minW="30px"
          height="30px"
          marginRight="5px"
          onClick={goBack}
        >
          <FiArrowLeft size="10px" />
        </Button>
        <Flex justifyContent="space-between" alignItems="center" flex="1">
          <Text {...childAnalysisTextProps} marginBottom="0px">{`For: ${parsedAddress}`}</Text>
          <Text {...childAnalysisTextProps} marginBottom="0px">
            Date: {new Date(createdAt).toDateString()}
          </Text>
        </Flex>
      </Flex>
      <EstimatedSavings monthly={estSavings} />
      <QuotePricing
        monthlyFees={monthlyFees}
        processorDiscount={
          (parseFloat(parsedTotalFees) - parsedInterchangeFeeSum) / parseFloat(parsedTotal)
        }
        effectiveRate={effectiveRate}
        titles={['Current Pricing', 'Monthly Fees:', 'Effective Rate:', 'Processor Discount:']}
        marginTop="10px"
      />
      <QuotePricing
        monthlyFees={estMonthlyFees}
        processorDiscount={parseFloat(estProfit) / parseFloat(parsedTotal)}
        effectiveRate={parseFloat(estEffectiveRate)}
        titles={[
          'Proposed Pricing',
          'Est.Monthly Fees:',
          'Est.Effective Rate:',
          'Processor Discount:',
        ]}
        marginTop="10px"
      />
      {data && data.statement && (
        <SuspiciousFeesBlock
          data={data.statement}
          description="All the hidden fees in your current statement:"
          marginTop="10px"
        />
      )}
    </Box>
  );
};

export default GeneratedQuote;
