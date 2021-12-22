import React from 'react';
import { Box, Flex, Text, BoxProps } from '@chakra-ui/core';
import { FiEdit } from 'react-icons/fi';

import { BlockContainer, BlockHeader, BlockBody } from 'components/grid';

interface Props extends BoxProps {
  id: string;
  businessName: string;
  address: string;
}

const IdBlock: React.FC<Props> = ({ id, businessName, address, ...restProps }: Props) => {
  return (
    <BlockContainer {...restProps}>
      <BlockHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Text as="p" fontSize="sm" fontWeight="900" color="customGreen.500">
            {`MID: ${id}`}
          </Text>
          <Box color="customGray.100">
            <FiEdit size="20px" />
          </Box>
        </Flex>
      </BlockHeader>
      <BlockBody>
        {businessName && (
          <Text as="p" fontSize="sm" fontWeight="300" color="customGreen.500" marginBottom="10px">
            {businessName}
          </Text>
        )}
        <Text as="p" fontSize="sm" fontWeight="300" color="customGreen.500">
          {address}
        </Text>
      </BlockBody>
    </BlockContainer>
  );
};

export default IdBlock;
