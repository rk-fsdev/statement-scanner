import { ButtonProps } from '@chakra-ui/core';

export const greenButtonProps: ButtonProps = {
  border: '2px solid',
  borderRadius: '5px',
  borderColor: 'green.500',
  marginTop: '20px',
  variantColor: 'green',
  variant: 'solid',
  children: undefined,
};

export const linkButtonProps: ButtonProps = {
  variant: 'link',
  border: 'none',
  textDecoration: 'underline',
  background: 'transparent',
  _focus: { border: 'none' },
  children: undefined,
};

export const submitButtonProps: ButtonProps = {
  type: 'submit',
  variant: 'solid',
  variantColor: 'green',
  fontSize: 'sm',
  width: '100%',
  marginTop: '10px',
  children: undefined,
};
