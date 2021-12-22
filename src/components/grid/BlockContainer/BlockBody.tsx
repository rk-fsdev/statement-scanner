import React, { ReactNode } from 'react';
import { BoxProps, Box } from '@chakra-ui/core';
import theme from 'styles/theme';

interface Props extends BoxProps {
  children?: ReactNode | ReactNode[];
}

const BlockBody: React.FC<Props> = ({ children, ...restProps }: Props) => {
  return (
    <Box padding={theme.padding.block.xs} {...restProps}>
      {children}
    </Box>
  );
};

export default BlockBody;
