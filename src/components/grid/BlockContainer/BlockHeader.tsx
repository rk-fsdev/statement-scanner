import React, { ReactNode } from 'react';
import { BoxProps, Box, Divider, Text } from '@chakra-ui/core';
import theme from 'styles/theme';

interface Props extends BoxProps {
  children?: ReactNode | ReactNode[];
  title?: string;
}

const BlockHeader: React.FC<Props> = ({ children, title, ...restProps }: Props) => {
  return (
    <>
      <Box padding={theme.padding.block.xs} {...restProps}>
        {title && (
          <Text as="p" fontSize="md" fontWeight="900" color="customGreen.500">
            {title}
          </Text>
        )}
        {children}
      </Box>
      <Divider color="customGray.10" margin="0px 0px" />
    </>
  );
};

export default BlockHeader;
