import React from 'react';
import { Flex, Button, Text, BoxProps, Divider } from '@chakra-ui/core';
import { IoMdClose } from 'react-icons/io';

import { BlockContainer, BlockBody, BlockHeader } from 'components/grid';
import { CustomFee } from 'model/auth';
import { grayDescTextProps, blackDescTextProps } from 'components/text/textProps';

interface Props extends BoxProps {
  data: CustomFee;
  onClose: (id: string) => void;
}

const CustomFeeBlock: React.FC<Props> = ({ data, onClose, ...restProps }: Props) => {
  return (
    <BlockContainer {...restProps}>
      <BlockHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Text as="p" fontSize="md" fontWeight="900" color="customGreen.500">
            Custom Fee
          </Text>
          <Button
            variantColor="green"
            variant="link"
            fontSize="sm"
            padding="5px 5px"
            onClick={() => onClose(data.id)}
          >
            <IoMdClose fontSize="20px" />
          </Button>
        </Flex>
      </BlockHeader>
      <BlockBody>
        {['name', 'type', 'amount', 'applicability'].map((key) => (
          <React.Fragment key={key}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text {...grayDescTextProps} textTransform="capitalize">
                {key}:
              </Text>
              <Text {...blackDescTextProps}>{data[key]}</Text>
            </Flex>
            <Divider color="gray.100" orientation="horizontal" width="100%" margin="0px" />
          </React.Fragment>
        ))}
      </BlockBody>
    </BlockContainer>
  );
};

export default CustomFeeBlock;
