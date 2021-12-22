import React from 'react';
import { Box, Heading } from '@chakra-ui/core';

import { AuthenticatedContainer } from '.';
import theme from 'styles/theme';

const Header: React.FC = () => {
  return (
    <AuthenticatedContainer>
      <Box
        boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.1)"
        height={theme.height.header.xs}
        bg="white"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h1" fontSize="2xl" color="green.500">
          Statement Scanner
        </Heading>
      </Box>
    </AuthenticatedContainer>
  );
};

export default Header;
