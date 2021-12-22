import React from 'react';
import { RadioButtonGroupProps, RadioButtonGroup } from '@chakra-ui/core';
import { CustomRadio } from 'components/buttons';
import { customRadioProps } from './inputProps';

const FeeRadioGroup: React.FC<RadioButtonGroupProps> = ({
  ...restProps
}: RadioButtonGroupProps) => {
  return (
    <RadioButtonGroup
      isInline
      defaultValue="fixedFee"
      width="100%"
      height="100%"
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      background="white"
      {...restProps}
    >
      <CustomRadio value="fixedFee" {...customRadioProps}>
        $
      </CustomRadio>
      <CustomRadio value="percentFee" {...customRadioProps}>
        %
      </CustomRadio>
    </RadioButtonGroup>
  );
};

export default FeeRadioGroup;
