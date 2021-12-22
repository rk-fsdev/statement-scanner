import React from 'react';
import { BoxProps, Box, Flex, Text, Button, Divider } from '@chakra-ui/core';

import { blockContainerProps } from 'components/grid/boxProps';
import { grayDescTextProps } from 'components/text/textProps';
import { StatementList } from 'components/shared';
import { Statement } from 'model/statement';
import theme from 'styles/theme';

interface Props extends BoxProps {
  uploadStatement?: () => void;
  data: Statement[];
}

const StatementBlock: React.FC<Props> = ({ data, ...restProps }: Props) => {
  return (
    <Box {...blockContainerProps} {...restProps}>
      <Flex justifyContent="space-between" alignItems="center" padding={theme.padding.block.xs}>
        <Text as="p" fontSize="md" fontWeight="900" color="customGreen.500">
          Statements
        </Text>
        <Button
          padding={theme.padding.block.xs}
          borderRadius="3px"
          fontSize="sm"
          color="white"
          variant="solid"
          variantColor="gray"
          backgroundColor="customGray.50"
        >
          Upload Statement
        </Button>
      </Flex>
      <Divider color="customGray.10" margin="0px 0px" />
      <Box padding={theme.padding.block.xs}>
        <Text {...grayDescTextProps}>Here are you past statements:</Text>
        <StatementList
          data={[...data].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )}
        />
      </Box>
    </Box>
  );
};

export default StatementBlock;
