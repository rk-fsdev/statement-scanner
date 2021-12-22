import React from 'react';
import { Box, BoxProps, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core';

import { BlockContainer, BlockBody } from 'components/grid';
import { grayDescTextProps } from 'components/text/textProps';
import EditQuote from './EditQuote';
import { QuoteMethodType, QuotingInputValue } from 'model/shared';

interface Props extends BoxProps {
  quotingMethod: QuoteMethodType;
  inputValues: QuotingInputValue;
  setQuotingMethod: React.Dispatch<React.SetStateAction<QuoteMethodType>>;
  setInputValues: React.Dispatch<React.SetStateAction<QuotingInputValue>>;
}

const QuotingMethod: React.FC<Props> = ({
  quotingMethod,
  inputValues,
  setInputValues,
  setQuotingMethod,
  ...restProps
}: Props) => {
  const handleTabChange = (index: number) => {
    switch (index) {
      case 0:
        setQuotingMethod(QuoteMethodType.Interchange);
        break;
      case 1:
        setQuotingMethod(QuoteMethodType.FlatRate);
        break;
      case 2:
        setQuotingMethod(QuoteMethodType.CashDiscount);
        break;
    }
  };

  return (
    <Box {...restProps}>
      <BlockContainer>
        <BlockBody>
          <Text {...grayDescTextProps}>Choose a quoting method:</Text>
          <Tabs
            variant="line"
            defaultValue={quotingMethod}
            onChange={handleTabChange}
            variantColor="green"
            marginTop="10px"
          >
            <TabList justifyContent="space-between">
              <Tab fontSize="sm" flex="1">
                Interchange+
              </Tab>
              <Tab fontSize="sm" flex="1">
                Flat Rate
              </Tab>
              <Tab fontSize="sm" flex="1">
                Cash Discount
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <EditQuote
                  type={QuoteMethodType.Interchange}
                  values={inputValues}
                  setValues={setInputValues}
                />
              </TabPanel>
              <TabPanel>
                <EditQuote
                  type={QuoteMethodType.FlatRate}
                  values={inputValues}
                  setValues={setInputValues}
                />
              </TabPanel>
              <TabPanel>
                <EditQuote
                  type={QuoteMethodType.CashDiscount}
                  values={inputValues}
                  setValues={setInputValues}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </BlockBody>
      </BlockContainer>
    </Box>
  );
};

export default QuotingMethod;
