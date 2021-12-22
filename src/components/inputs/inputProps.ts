import { InputProps } from '@chakra-ui/core';

export const grayInputProps: InputProps = {
  borderRadius: '3px',
  padding: '10px',
  color: 'green.500',
  borderColor: 'gray.200',
  border: '1px solid',
  fontSize: 'md',
  lineHeight: '1',
  focusBorderColor: 'green.500',
  _placeholder: {
    color: 'customGray.700',
  },
};

export const customRadioProps = {
  checkedBgColor: 'green.500',
  unCheckedBgColor: 'transparent',
  checkedTextColor: 'white',
  unCheckedTextColor: 'customGray.700',
  padding: '10px 30px',
};
