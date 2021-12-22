/* eslint-disable react/prop-types */
import React from 'react';
import { RadioProps, Button } from '@chakra-ui/core';

interface Props extends RadioProps {
  checkedTextColor?: string;
  unCheckedTextColor?: string;
  checkedBgColor?: string;
  unCheckedBgColor?: string;
}

const CustomRadio = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      isChecked,
      isDisabled,
      children,
      checkedTextColor = 'green.500',
      unCheckedTextColor = 'customGray.800',
      checkedBgColor = 'transparent',
      unCheckedBgColor = 'transparent',
      ...restProps
    },
    ref
  ) => (
    <Button
      ref={ref}
      aria-checked={isChecked}
      role="radio"
      variant="link"
      isDisabled={isDisabled}
      fontSize="sm"
      color={isChecked ? checkedTextColor : unCheckedTextColor}
      backgroundColor={isChecked ? checkedBgColor : unCheckedBgColor}
      flexDir="column"
      height="100%"
      _hover={{
        textDecor: 'none',
      }}
      _focus={{
        border: 'none',
      }}
      {...restProps}
    >
      {children}
    </Button>
  )
);

CustomRadio.displayName = 'CustomRadio';

export default CustomRadio;
