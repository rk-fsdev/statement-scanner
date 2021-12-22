import React from 'react';
import { BoxProps, Box, Text, Button } from '@chakra-ui/core';
import { useQuery } from '@apollo/client';

import { Statement } from 'model/statement';
import { STATEMENTS_ALL } from 'services/graphql/statement/queries';
import { BlockContainer, BlockHeader, BlockBody } from 'components/grid';
import LoadingSpinner from 'components/loading/LoadingSpinner';
import { grayDescTextProps } from 'components/text/textProps';
import { useHistory } from 'react-router-dom';
import { TableContainer } from 'components/shared/StatementList/styles';

interface Props extends BoxProps {
  children?: React.ReactNode | React.ReactNode[];
}

const QuoteList: React.FC<Props> = ({ ...restProps }: Props) => {
  const history = useHistory();
  const { data, error, loading } = useQuery<{ statements: Statement[] }>(STATEMENTS_ALL, {
    fetchPolicy: 'cache-and-network',
  });

  const handleClick = (event: React.MouseEvent<any, MouseEvent>, id: string) => {
    history.push(`/quoting/${id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error || !data) return <div>Something goes wrong</div>;

  const quoteStatements = data.statements.filter((stmt) => stmt.merchantQuote);

  return (
    <Box {...restProps}>
      <BlockContainer>
        <BlockHeader title="Recent Generated Quotes" />
        <BlockBody>
          <Text {...grayDescTextProps}>Here are your presented quotes:</Text>
          <TableContainer>
            <thead>
              <tr>
                <th>MID #</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {quoteStatements.map((statement: Statement) => (
                <tr key={statement.id}>
                  <td>
                    <Button
                      fontSize="sm"
                      onClick={(e) => handleClick(e, statement.id)}
                      padding="0px 0px"
                    >
                      {statement.parsedMerchantNumber}
                    </Button>
                  </td>
                  <td>{statement.parsedAddress}</td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
        </BlockBody>
      </BlockContainer>
    </Box>
  );
};

export default QuoteList;
