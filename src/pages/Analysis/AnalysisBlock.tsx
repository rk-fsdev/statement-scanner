import React from 'react';
import { BoxProps, Flex, Text, Button } from '@chakra-ui/core';
import { FiArrowLeft } from 'react-icons/fi';

import { Statement, StatementState } from 'model/statement';
import { getTextFromState, calcParsedIFeeSum, calcParsedPFeeSum } from 'utils/statement';
import AnalysisValues from './AnalysisValues';
import { BlockContainer, BlockBody, BlockHeader } from 'components/grid';
import { useHistory } from 'react-router-dom';

interface Props extends BoxProps {
  goBack: () => void;
  data: Statement;
}

const AnalysisBlock: React.FC<Props> = ({ goBack, data, ...restProps }: Props) => {
  const history = useHistory();

  const handleQuoteClick = () => {
    history.push(`/quoting/${data.id}/generate`);
  };

  const renderAnalysis = (statement: Statement) => {
    const {
      parsedInterchangeFees,
      parsedProcessingFees,
      parsedTotal,
      parsedTotalFees,
      transactions,
    } = statement;
    let totalInterchangeFee = 0;
    let totalProcessingFee = 0;

    totalInterchangeFee += calcParsedIFeeSum(parsedInterchangeFees);
    totalProcessingFee += calcParsedPFeeSum(parsedProcessingFees);
    console.log(totalInterchangeFee, totalProcessingFee);
    const effectiveRate = (parseFloat(parsedTotalFees) / parseFloat(parsedTotal)) * 100;
    const avgTicket = parseFloat(parsedTotal) / transactions;

    return (
      <AnalysisValues
        totalFees={parseFloat(parsedTotalFees)}
        totalVolume={parseFloat(parsedTotal)}
        effectiveRate={effectiveRate}
        interchangeFees={totalInterchangeFee}
        processingFees={totalProcessingFee}
        avgTicket={avgTicket}
      />
    );
  };

  return (
    <BlockContainer {...restProps}>
      <BlockHeader>
        <Flex justifyContent="space-between" alignItems="center" margin="0px -10px">
          <Button
            variant="solid"
            variantColor="gray"
            backgroundColor="customGray.10"
            borderRadius="50%"
            padding="0px 0px"
            minW="30px"
            height="30px"
            marginRight="10px"
            onClick={goBack}
          >
            <FiArrowLeft size="10px" />
          </Button>
          <Flex flex="1" flexDir="row" justifyContent="space-between" alignItems="center">
            <Text as="p" fontSize="md" fontWeight="900" color="customGreen.500">
              Statement Analysis
            </Text>
            {/* <ButtonGroup spacing="1"> */}
            {/* <Button
                variantColor="gray"
                variant="outline"
                fontSize="sm"
                borderColor="customGray.600"
                color="customGray.600"
                padding="5px 5px"
              >
                View Doc
              </Button> */}
            <Button
              variantColor="green"
              variant="solid"
              fontSize="sm"
              padding="5px 5px"
              onClick={handleQuoteClick}
              isDisabled={data.state !== StatementState.SUCCESS}
            >
              Generate Quote
            </Button>
            {/* </ButtonGroup> */}
          </Flex>
        </Flex>
      </BlockHeader>
      <BlockBody>
        {data.state === StatementState.SUCCESS ? (
          <>{renderAnalysis(data)}</>
        ) : (
          <>{getTextFromState(data)}</>
        )}
      </BlockBody>
    </BlockContainer>
  );
};

export default AnalysisBlock;
