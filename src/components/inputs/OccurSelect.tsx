import React from 'react';
import { SelectProps, Select, Text } from '@chakra-ui/core';
import { grayInputProps } from './inputProps';
import { CustomFeeApplicability } from 'model/auth';
import { grayDescTextProps } from 'components/text/textProps';

const OccurSelect: React.FC<SelectProps> = ({ ...restProps }: SelectProps) => {
  return (
    <>
      <Text {...grayDescTextProps} marginTop="20px">
        When does this occur?
      </Text>
      <Select
        defaultValue={CustomFeeApplicability.MONTHLY}
        marginTop="10px"
        {...grayInputProps}
        color="customGray.700"
        padding="10px 20px"
        {...restProps}
      >
        <option value={CustomFeeApplicability.PER_TRANSACTION}>Per transaction</option>
        <option value={CustomFeeApplicability.PER_NEW_ACCOUNT}>Per new account</option>
        <option value={CustomFeeApplicability.MONTHLY}>Monthly</option>
        <option value={CustomFeeApplicability.QUARTERLY}>Quarterly</option>
        <option value={CustomFeeApplicability.ANNUALY}>Annually</option>
      </Select>
    </>
  );
};

export default OccurSelect;
