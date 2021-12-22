import React from 'react';
import { Divider, Box, Text, BoxProps } from '@chakra-ui/core';

interface Props extends BoxProps {
  text?: string;
}

const NamedDivider: React.FC<Props> = ({ text, ...restProps }: Props) => {
  return (
    <Box height="15px" width="100%" d="flex" alignItems="center" position="relative" {...restProps}>
      <Divider color="gray.700" orientation="horizontal" width="100%" margin="0px" />
      <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        margin="0px"
        fontSize="md"
        lineHeight="1"
        backgroundColor="inherit"
        padding="0px 10px"
        color="gray.600"
      >
        {text}
      </Text>
    </Box>
  );
};

export default NamedDivider;
