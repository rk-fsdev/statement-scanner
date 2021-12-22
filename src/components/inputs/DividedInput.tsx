import React from 'react';
import { InputProps, Input, Box, Flex, FormLabel } from '@chakra-ui/core';
import styled from '@emotion/styled';

import { grayInputProps } from './inputProps';
import theme from 'styles/theme';

interface Props extends InputProps {
  dividedSuffix: string;
  description: string;
  inputId: string;
}

const DividedInput: React.FC<Props> = ({
  dividedSuffix,
  description,
  inputId,
  ...restProps
}: Props) => {
  return (
    <DividedInputContainer
      borderRadius="3px"
      borderWidth="1px"
      borderColor="customGray.20"
      marginTop="10px"
    >
      <Flex justifyContent="flex-start" flex="1" alignItems="center" padding="0px 20px">
        <FormLabel
          fontSize="md"
          color="customGray.700"
          borderColor="customGray.20"
          borderRightWidth="1px"
          width="100%"
          padding="0px"
          htmlFor={inputId}
        >
          {description}
        </FormLabel>
      </Flex>
      <Input
        {...grayInputProps}
        border="none"
        focusBorderColor="none"
        width="100px"
        padding="10px 20px"
        textAlign="right"
        placeholder={dividedSuffix}
        id={inputId}
        pattern="[0-9]+([\.,][0-9]+)?"
        _placeholder={{
          color: 'black',
        }}
        {...restProps}
      />
    </DividedInputContainer>
  );
};

export default DividedInput;

const DividedInputContainer = styled(Box)`
  position: relative;
  display: flex;
  justify-content: space-between;
  &:focus-within {
    border-color: ${theme.colors.green[500]};
  }
`;
