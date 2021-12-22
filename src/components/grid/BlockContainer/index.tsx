import React, { ReactNode } from 'react';
import { BoxProps, Box } from '@chakra-ui/core';
import { blockContainerProps } from '../boxProps';

interface Props extends BoxProps {
  children?: ReactNode | ReactNode[];
}

const BlockContainer: React.FC<Props> = ({ children, ...restProps }: Props) => {
  return (
    <Box {...blockContainerProps} {...restProps}>
      {children}
    </Box>
  );
};

export default BlockContainer;
