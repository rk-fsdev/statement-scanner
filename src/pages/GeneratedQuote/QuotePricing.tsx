import React from 'react';
import { BoxProps, Flex, Text } from '@chakra-ui/core';
import { BlockContainer, BlockHeader, BlockBody } from 'components/grid';
import { childAnalysisTextProps } from 'components/text/textProps';
import { getFormattedCurrency } from 'utils/statement';

interface Props extends BoxProps {
  titles: string[];
  monthlyFees: number;
  effectiveRate: number;
  processorDiscount: number;
}

const QuotePricing: React.FC<Props> = ({
  titles,
  monthlyFees,
  effectiveRate,
  processorDiscount,
  ...restProps
}: Props) => {
  return (
    <BlockContainer {...restProps}>
      <BlockHeader title={titles[0]} />
      <BlockBody>
        <Flex justifyContent="space-between">
          <Text {...childAnalysisTextProps}>{titles[1]}</Text>
          <Text {...childAnalysisTextProps}>{getFormattedCurrency(monthlyFees)}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text {...childAnalysisTextProps}>{titles[2]}</Text>
          <Text {...childAnalysisTextProps}>{effectiveRate.toFixed(2)}%</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text {...childAnalysisTextProps}>{titles[3]}</Text>
          <Text {...childAnalysisTextProps}>{processorDiscount.toFixed(2)}%</Text>
        </Flex>
      </BlockBody>
    </BlockContainer>
  );
};

export default QuotePricing;
