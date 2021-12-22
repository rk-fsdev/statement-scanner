import React from 'react';
import { Box, BoxProps, Text } from '@chakra-ui/core';

import { Statement, ParsedFee, StatementState } from 'model/statement';
import { getFormattedCurrency, getTextFromState } from 'utils/statement';
import { BlockContainer, BlockBody, BlockHeader } from 'components/grid';
import { TableContainer } from 'components/shared/StatementList/styles';

interface Props extends BoxProps {
  data: Statement;
  description: string;
}

const SuspiciousFeesBlock: React.FC<Props> = ({ data, description, ...restProps }: Props) => {
  const notValidIFeeLength = data.parsedInterchangeFees.filter((iFee) => !iFee.valid).length;

  const renderTable = (statement: Statement) => (
    <TableContainer>
      <thead>
        <tr>
          <th>Fee Name</th>
          <th>Total Charge</th>
        </tr>
      </thead>
      <tbody>
        {notValidIFeeLength > 0 &&
          statement.parsedInterchangeFees
            .filter((iFee) => !iFee.valid)
            .map((iFee: ParsedFee) => (
              <tr key={iFee.name}>
                <td>{iFee.name}</td>
                <td>{getFormattedCurrency(parseFloat(iFee.amount))}</td>
              </tr>
            ))}
        {/* {statement.parsedProcessingFees
          .filter((iFee) => !iFee.valid)
          .map((iFee: ParsedFee) => (
            <tr key={iFee.name}>
              <td>{iFee.name}</td>
              <td>{getFormattedCurrency(parseFloat(iFee.amount))}</td>
            </tr>
          ))} */}
      </tbody>
    </TableContainer>
  );

  return (
    <BlockContainer {...restProps}>
      <BlockHeader title="Suspicious Fees" />
      <BlockBody>
        <Text as="p" color="customGray.300" fontSize="sm" fontWeight="500">
          {description}
        </Text>
        <Box padding="10px 0px">
          {data.state === StatementState.SUCCESS ? (
            renderTable(data)
          ) : (
            <>{getTextFromState(data)}</>
          )}
          {notValidIFeeLength === 0 && data.state === StatementState.SUCCESS && (
            <>No interchange markup detected</>
          )}
        </Box>
      </BlockBody>
    </BlockContainer>
  );
};

export default SuspiciousFeesBlock;
