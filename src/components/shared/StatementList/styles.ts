import styled from '@emotion/styled';
import theme from 'styles/theme';

export const TableContainer = styled.table`
  width: 100%;
  tr {
    border-bottom: 1px solid ${theme.colors.customGray[10]};
    th {
      padding: 20px 0px 5px 0px;
      font-size: ${theme.fontSizes.sm};
      font-weight: 900;
      color: #000000;
      width: 50%;
      text-align: left;
    }
    td {
      padding: 5px 0px;
      font-size: ${theme.fontSizes.sm};
      font-weight: 500;
      width: 50%;
    }
    td:first-of-type {
      color: ${theme.colors.green[500]};
    }
    td:last-child {
      color: ${theme.colors.customGray[850]};
    }
  }

  tr:last-child {
    border: none;
  }
`;
