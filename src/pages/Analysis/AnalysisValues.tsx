import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { getFormattedCurrency } from 'utils/statement';
import { parentAnalysisTextProps } from 'components/text/textProps';

interface Props {
  totalFees: number;
  interchangeFees: number;
  processingFees: number;
  effectiveRate: number;
  totalVolume: number;
  avgTicket: number;
}

const AnalysisValues: React.FC<Props> = ({
  totalFees,
  totalVolume,
  // interchangeFees,
  // processingFees,
  effectiveRate,
  avgTicket,
}: Props) => {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text {...parentAnalysisTextProps}>Current Fees</Text>
        <Text {...parentAnalysisTextProps}>{getFormattedCurrency(totalFees)}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text {...parentAnalysisTextProps}>Avg. Ticket</Text>
        <Text {...parentAnalysisTextProps}>
          {getFormattedCurrency(parseFloat(avgTicket.toFixed(2)))}
        </Text>
      </Flex>
      {/* <Flex justifyContent="space-between">
        <Text {...childTextProps}>Interchange fees</Text>
        <Text {...childTextProps}>{getFormattedCurrency(interchangeFees)}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text {...childTextProps}>Processing fees</Text>
        <Text {...childTextProps}>{getFormattedCurrency(processingFees)}</Text>
      </Flex> */}
      <Flex justifyContent="space-between">
        <Text {...parentAnalysisTextProps}>Effective rate</Text>
        <Text {...parentAnalysisTextProps}>{effectiveRate.toFixed(2)}%</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text {...parentAnalysisTextProps}>Total volume</Text>
        <Text {...parentAnalysisTextProps}>{getFormattedCurrency(totalVolume)}</Text>
      </Flex>
    </Box>
  );
};

export default AnalysisValues;
