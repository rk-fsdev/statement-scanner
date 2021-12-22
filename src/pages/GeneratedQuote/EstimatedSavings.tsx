import React from 'react';
import { BoxProps, Flex, Text } from '@chakra-ui/core';
import { BlockContainer, BlockHeader, BlockBody } from 'components/grid';
import { childAnalysisTextProps } from 'components/text/textProps';
import { getFormattedCurrency } from 'utils/statement';

interface Props extends BoxProps {
  monthly: string;
}

const EstimatedSavings: React.FC<Props> = ({ monthly, ...restProps }: Props) => {
  return (
    <BlockContainer {...restProps}>
      <BlockHeader title="Estimated Savings" />
      <BlockBody>
        <Flex justifyContent="space-between">
          <Text {...childAnalysisTextProps}>Monthly Savings</Text>
          <Text {...childAnalysisTextProps} color="green.500">
            {getFormattedCurrency(parseFloat(monthly))}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text {...childAnalysisTextProps}>Annual Savings</Text>
          <Text {...childAnalysisTextProps} color="green.500">
            {getFormattedCurrency(parseFloat(monthly) * 12)}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text {...childAnalysisTextProps}>3 Year Savings</Text>
          <Text {...childAnalysisTextProps} color="green.500">
            {getFormattedCurrency(parseFloat(monthly) * 36)}
          </Text>
        </Flex>
      </BlockBody>
    </BlockContainer>
  );
};

export default EstimatedSavings;
