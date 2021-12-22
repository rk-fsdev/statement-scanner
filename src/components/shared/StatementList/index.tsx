import React from 'react';
import { BoxProps, Box, Button } from '@chakra-ui/core';

import { Statement } from 'model/statement';
import { useHistory } from 'react-router-dom';
import { TableContainer } from './styles';
import { getTextFromState } from 'utils/statement';

interface Props extends BoxProps {
  data: Statement[];
  descIfNo?: string;
}

const StatementList: React.FC<Props> = ({
  data,
  descIfNo = 'No statements',
  ...restProps
}: Props) => {
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>, id: string) => {
    history.push(`/statements/${id}`);
  };

  if (data.length === 0) return <>{descIfNo}</>;

  return (
    <Box {...restProps}>
      <TableContainer>
        <thead>
          <tr>
            <th>Statement Month</th>
            <th>Uploaded Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data: Statement) => (
            <tr key={data.id}>
              <td>
                <Button fontSize="sm" onClick={(e) => handleClick(e, data.id)} padding="0px 0px">
                  {getTextFromState(data)}
                </Button>
              </td>
              <td>{new Date(data.createdAt).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </Box>
  );
};

export default StatementList;
