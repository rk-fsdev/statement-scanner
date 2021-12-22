import React from 'react';
import { FormControl, Input, Button, InputProps } from '@chakra-ui/core';
import { MdSearch } from 'react-icons/md';

import theme from 'styles/theme';

interface Props extends InputProps {
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<Props> = ({ handleSubmit, ...restProps }: Props) => {
  return (
    <FormControl
      height={theme.height.searchInput.xs}
      width="100%"
      position="relative"
      boxShadow="0 6px 8px 0 rgba(164, 164, 164, 0.21)"
    >
      <form style={{ height: '100%' }} onSubmit={handleSubmit}>
        <Input
          width="100%"
          height="100%"
          placeholder="Search existing accounts"
          color="green.500"
          focusBorderColor="green.500"
          paddingRight="50px"
          fontSize="md"
          _placeholder={{ color: 'customGray.400' }}
          {...restProps}
        />
        <Button
          position="absolute"
          variant="solid"
          variantColor="green"
          width="40px"
          height="40px"
          right="5px"
          top="5px"
          padding="0px"
          zIndex={9}
          type="submit"
        >
          <MdSearch size="20px" />
        </Button>
      </form>
    </FormControl>
  );
};

export default SearchBar;
