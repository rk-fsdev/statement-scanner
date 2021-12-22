import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/core';

import { GoogleCircle } from 'components/icons';

interface Props extends ButtonProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const GoogleButton: React.FC<Props> = ({ children, ...restProps }: Props) => {
  return (
    <Button
      variant="outline"
      backgroundColor="gray.100"
      color="gray.600"
      width="100%"
      height="40px"
      justifyContent="flex-start"
      fontSize="sm"
      lineHeight="1"
      leftIcon={GoogleCircle}
      padding="0px 10px"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="5px"
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default GoogleButton;
