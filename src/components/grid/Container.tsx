import React, { ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/core';

interface Props extends BoxProps {
  children?: ReactNode[] | ReactNode;
}

const Container: React.FC<Props> = ({ children, ...restProps }: Props) => {
  return (
    <Box
      maxW="md"
      width="100%"
      height="100%"
      margin="0 auto"
      backgroundColor="gray.50"
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default Container;
