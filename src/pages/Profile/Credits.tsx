import React from 'react';
import { BoxProps, Text } from '@chakra-ui/core';

import BlockContainer from 'components/grid/BlockContainer';
import BlockBody from 'components/grid/BlockContainer/BlockBody';

interface Props extends BoxProps {
  count: number;
}

const Credits: React.FC<Props> = ({ count, ...restProps }: Props) => {
  return (
    <BlockContainer {...restProps}>
      <BlockBody display="flex" justifyContent="space-between">
        <Text as="p" fontSize="md" fontWeight="900" color="customGreen.500">
          Credits
        </Text>
        <Text
          as="p"
          fontSize="md"
          fontWeight="400"
          color="customGreen.300"
          borderLeft="1px solid"
          borderColor="customGray.20"
          paddingLeft="15px"
        >
          {count}
        </Text>
      </BlockBody>
    </BlockContainer>
  );
};

export default Credits;
