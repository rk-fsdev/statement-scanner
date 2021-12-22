import React, { ReactNode } from 'react';
import { BoxProps, Box } from '@chakra-ui/core';

import theme from 'styles/theme';

interface Props extends BoxProps {
  children?: ReactNode | ReactNode[];
}

const MainLayout: React.FC<Props> = ({ children, ...restProps }: Props) => {
  return (
    <Box height={theme.height.home.xs} padding="10px" overflow="auto" {...restProps}>
      {children}
    </Box>
  );
};

export default MainLayout;
