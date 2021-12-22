import React, { useState } from 'react';
import { BoxProps, Box, Text, Input, Flex, Button } from '@chakra-ui/core';
import { BlockHeader, BlockBody, BlockContainer } from 'components/grid';
import { grayDescTextProps } from 'components/text/textProps';
import { grayInputProps } from 'components/inputs/inputProps';
import DividedInput from 'components/inputs/DividedInput';
import FeeRadioGroup from 'components/inputs/FeeRadioGroup';
import OccurSelect from 'components/inputs/OccurSelect';
import { CustomFeeType, CustomFeeApplicability, CustomFeeInput } from 'model/auth';
import { getStyledFee } from 'utils/shared';
import { initialCustomFeeInput } from 'services/config/constants';
import { submitButtonProps } from 'components/buttons/buttonProps';

interface Props extends BoxProps {
  title: string;
  children?: any;
  page: string;
  submit: (customFee: CustomFeeInput) => void;
}

const CustomFeesForm: React.FC<Props> = ({ title, page, submit, ...restProps }: Props) => {
  const [customFee, setCustomFee] = useState<CustomFeeInput>(initialCustomFeeInput);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    if (value) {
      if (name === 'amount') {
        let styledFee = getStyledFee(value);
        if (customFee.type === CustomFeeType.PERCENT) {
          if (styledFee > 100) {
            styledFee = parseFloat(customFee[name]);
          }
        }
        setCustomFee({
          ...customFee,
          amount: styledFee.toFixed(2),
        });
      } else {
        setCustomFee({
          ...customFee,
          [name]: value,
        });
      }
    }
  };

  const handleRadioChange = (value: string | number | undefined) => {
    setCustomFee({
      ...customFee,
      type: value === 'fixedFee' ? CustomFeeType.FIXED : CustomFeeType.PERCENT,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    const enumValue: CustomFeeApplicability = value as any;
    setCustomFee({
      ...customFee,
      applicability: enumValue,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(customFee);
  };

  return (
    <Box {...restProps}>
      <BlockContainer>
        <BlockHeader title={title} />
        <BlockBody>
          <form onSubmit={handleSubmit}>
            <Text {...grayDescTextProps}>Add your custom fees:</Text>
            <Input
              onChange={handleInputChange}
              placeholder="Enter fee name"
              {...grayInputProps}
              padding="10px 20px"
              name="name"
              isRequired
            />
            <Flex justifyContent="space-between" alignItems="center" marginTop="10px">
              <Text {...grayDescTextProps} fontSize="md">
                Fixed or Percentage
              </Text>
              <Box height="40px">
                <FeeRadioGroup onChange={handleRadioChange} />
              </Box>
            </Flex>
            <DividedInput
              onChange={handleInputChange}
              type="number"
              description="Fee amount"
              dividedSuffix={customFee.type === CustomFeeType.FIXED ? '$-' : '-%'}
              name="amount"
              inputId={`${page}_fee_amount`}
              value={customFee.amount}
              isRequired
            />
            <OccurSelect defaultValue={customFee.applicability} onChange={handleSelectChange} />
            <Button {...submitButtonProps}>Add Custom Fee</Button>
          </form>
        </BlockBody>
      </BlockContainer>
    </Box>
  );
};

export default CustomFeesForm;
